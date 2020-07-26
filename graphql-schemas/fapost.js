const {
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server-express")
const FAPost = require("../mongoose-models/fapost")
const FALike = require("../mongoose-models/falike")
const sendFAPostToDiscord = require("../utils/webhook")

const canVCValues = ["YES", "USUALLY", "SOMETIMES", "NO"]
const playstyleValues = ["FRONTLINE", "MIDLINE", "BACKLINE"]

const typeDef = gql`
  extend type Query {
    freeAgentPosts: [FAPost!]!
    freeAgentMatches: FAMatches!
  }

  extend type Mutation {
    addFreeAgentPost(
      can_vc: CanVC!
      playstyles: [Playstyle!]!
      activity: String
      looking_for: String
      past_experience: String
      description: String
    ): Boolean!
    hideFreeAgentPost: Boolean!
    updateFreeAgentPost(
      can_vc: CanVC!
      playstyles: [Playstyle!]!
      activity: String
      looking_for: String
      past_experience: String
      description: String
    ): Boolean!
    addLike(discord_id: String!): Boolean!
    deleteLike(discord_id: String!): Boolean!
  }

  enum CanVC {
    YES
    USUALLY
    SOMETIMES
    NO
  }

  enum Playstyle {
    FRONTLINE
    MIDLINE
    BACKLINE
  }

  type FAMatches {
    matched_discord_users: [User!]!
    number_of_likes_received: Int!
    liked_discord_ids: [String!]!
  }

  "Represents a free agent post of a player looking for a team"
  type FAPost {
    id: ID!
    discord_id: String!
    can_vc: CanVC!
    playstyles: [Playstyle!]
    "How active is the free agent"
    activity: String
    "What kind of team they are looking for"
    looking_for: String
    "Teams or other past experience in competitive"
    past_experience: String
    "Free word about anything else"
    description: String
    discord_user: User!
    createdAt: String!
    updatedAt: String!
  }
`

const validateFAPost = (args) => {
  if (canVCValues.indexOf(args.can_vc) === -1) {
    throw new UserInputError("Invalid 'can vc' value provided.")
  }

  const playstyles = args.playstyles ? [...new Set(args.playstyles)] : []
  if (
    playstyles.some((playstyle) => playstyleValues.indexOf(playstyle) === -1)
  ) {
    throw new UserInputError("Invalid 'playstyles' value provided.")
  }

  if (args.activity && args.activity.length > 100) {
    throw new UserInputError("'activity' value too long.")
  }

  if (args.looking_for && args.looking_for.length > 100) {
    throw new UserInputError("'looking_for' value too long.")
  }

  if (args.past_experience && args.past_experience.length > 100) {
    throw new UserInputError("'past_experience' value too long.")
  }

  if (args.past_experience && args.past_experience.length > 100) {
    throw new UserInputError("'past_experience' value too long.")
  }

  if (args.description && args.description.length > 1000) {
    throw new UserInputError("'description' value too long.")
  }
}

const resolvers = {
  Query: {
    freeAgentPosts: (root, args, ctx) => {
      const monthAgo = new Date().setMonth(new Date().getMonth() - 1)
      return FAPost.find({
        $or: [
          {
            updatedAt: { $gte: monthAgo },
            hidden: { $ne: true },
          },
          { discord_id: ctx.user.discord_id, hidden: { $ne: true } },
        ],
      })
        .populate("discord_user")
        .sort({ createdAt: "desc" })
        .catch((e) => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    freeAgentMatches: async (root, args, ctx) => {
      const defaultReturnable = {
        matched_discord_users: [],
        number_of_likes_received: 0,
        liked_discord_ids: [],
      }
      if (!ctx.user) return defaultReturnable

      const monthAgo = new Date().setMonth(new Date().getMonth() - 1)
      const [posts, likesGiven, likesReceived] = await Promise.all([
        FAPost.find({
          updatedAt: { $gte: monthAgo },
          hidden: { $ne: true },
        }),
        FALike.find({
          liker_discord_id: ctx.user.discord_id,
        }).populate("liked_discord_user"),
        FALike.find({
          liked_discord_id: ctx.user.discord_id,
        }),
      ])

      const allDiscordIds = posts.map((post) => post.discord_id)

      if (!allDiscordIds.includes(ctx.user.discord_id)) {
        return defaultReturnable
      }

      const likerDiscordIds = likesReceived
        .filter((FALike) => allDiscordIds.includes(FALike.liker_discord_id))
        .map((FALike) => FALike.liker_discord_id)

      const matched_discord_users = likesGiven.reduce((acc, cur) => {
        if (!allDiscordIds.includes(cur.liked_discord_user.discord_id)) {
          return acc
        }

        if (!likerDiscordIds.includes(cur.liked_discord_user.discord_id))
          return acc

        return [...acc, cur.liked_discord_user]
      }, [])

      return {
        matched_discord_users,
        number_of_likes_received: likesReceived.length,
        liked_discord_ids: likesGiven.map((like) => like.liked_discord_id),
      }
    },
  },
  Mutation: {
    addFreeAgentPost: async (root, args, ctx) => {
      if (!ctx.user) throw new AuthenticationError("Not logged in.")

      validateFAPost(args)

      const existingFAPost = await FAPost.findOne({
        discord_id: ctx.user.discord_id,
        hidden: { $ne: true },
      }).catch((e) => {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      })

      if (existingFAPost) {
        throw new UserInputError("Free agent post already exists")
      }

      const faPost = new FAPost({ ...args, discord_id: ctx.user.discord_id })
      args.user = ctx.user
      await Promise.race([faPost.save(), sendFAPostToDiscord(args)]).catch(
        (e) => {
          throw (
            (new UserInputError(),
            {
              invalidArgs: args,
            })
          )
        }
      )
      return true
    },
    updateFreeAgentPost: async (root, args, ctx) => {
      if (!ctx.user) throw new AuthenticationError("Not logged in.")

      validateFAPost(args)

      await FAPost.findOneAndUpdate(
        { discord_id: ctx.user.discord_id, hidden: { $ne: true } },
        { ...args }
      ).catch((e) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })

      return true
    },
    hideFreeAgentPost: async (root, args, ctx) => {
      if (!ctx.user) throw new AuthenticationError("Not logged in.")

      await Promise.all([
        FAPost.deleteMany({ discord_id: ctx.user.discord_id }).catch((e) => {
          throw (
            (new UserInputError(),
            {
              invalidArgs: args,
            })
          )
        }),
        FALike.deleteMany({
          $or: [
            { liker_discord_id: ctx.user.discord_id },
            { liked_discord_id: ctx.user.discord_id },
          ],
        }),
      ])

      return true
    },
    addLike: async (root, args, ctx) => {
      if (!ctx.user) throw new AuthenticationError("Not logged in.")

      if (ctx.user.discord_id === args.discord_id) {
        throw new UserInputError("Can't like your own free agent post")
      }

      const [ownPost, likedPost] = await Promise.all([
        FAPost.findOne({ discord_id: ctx.user.discord_id }),
        FAPost.findOne({ discord_id: args.discord_id }),
      ])

      if (!ownPost) {
        throw new UserInputError("Not a free agent")
      }

      if (!likedPost) {
        throw new UserInputError("Liked user not a free agent")
      }

      await FALike.create({
        liker_discord_id: ctx.user.discord_id,
        liked_discord_id: args.discord_id,
      })

      return true
    },
    deleteLike: async (root, args, ctx) => {
      if (!ctx.user) throw new AuthenticationError("Not logged in.")

      await FALike.deleteMany({
        liker_discord_id: ctx.user.discord_id,
        liked_discord_id: args.discord_id,
      })

      return true
    },
  },
}

module.exports = {
  FAPost: typeDef,
  faPostResolvers: resolvers,
}
