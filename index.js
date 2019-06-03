require('dotenv').config()
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const cors = require('cors')
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const Placement = require('./models/placement')
const Player = require('./models/player')
const Maplist = require('./models/maplist')
const Link = require('./models/link')
const User = require('./models/user')
const Build = require('./models/build')
const path = require('path')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/discord/callback',
  scope: ['identify', 'connections']
},
function(accessToken, refreshToken, profile, cb) {
  const userToSave = {
    username: profile.username,
    discriminator: profile.discriminator,
    avatar: profile.avatar,
    discord_id: profile.id
  }
  for (var i = 0; i < profile.connections.length; i++) {
    const connection = profile.connections[i]
    if (connection.visibility === 1 && connection.verified) {
      if (connection.type === 'twitch') {
        userToSave.twitch_name = connection.name
      } else if (connection.type === 'twitter') {
        userToSave.twitter_name = connection.name
      }
    }
  }

  User.updateOne({discord_id: userToSave.discord_id}, userToSave, {upsert: true}, function(err, user) {
      return cb(err, userToSave)
  })
}))

passport.serializeUser(function(user, done) {
  done(null, user.discord_id)
})

passport.deserializeUser(function(discord_id, done) {
  User.findOne({discord_id}, function(err, user) {
    done(err, user)
  })
})

let rotationData = {timestamp: 0}

console.log('connecting to MongoDB')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, dbName: "production" })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    unique_id: String!
    alias: String
    twitter: String
    weapons: [String!]!
    weaponsCount: Int!
    topTotal: [Placement!]!
    topTotalScore: Float
    topShooter: [Placement]
    topShooterScore: Float
    topBlaster: [Placement]
    topBlasterScore: Float
    topRoller: [Placement]
    topRollerScore: Float
    topCharger: [Placement]
    topChargerScore: Float
    topSlosher: [Placement]
    topSlosherScore: Float
    topSplatling: [Placement]
    topSplatlingScore: Float
    topDualies: [Placement]
    topDualiesScore: Float
    topBrella: [Placement]
    topBrellaScore: Float
  }

  type Placement {
    id: ID!
    name: String!
    weapon: String!
    rank: Int!
    mode: Int!
    x_power: Float!
    unique_id: String!
    month: Int!
    year: Int!
  }

  type topPlayer {
    placements: [Placement!]!
    modeCount: [Int!]!
  }

  type PlayerWithPlacements {
    player: Player!
    placements: [Placement!]!
  }

  type Maplist {
    name: String!
    sz: [String!]!
    tc: [String!]!
    rm: [String!]!
    cb: [String!]!
  }

  enum LinkType {
    DISCORD
    GUIDE
    MISC
  }

  type Link {
    title: String!
    url: String!
    description: String!
    type: LinkType!
  }

  type User {
    username: String!
    discriminator: String!
    avatar: String
    discord_id: String!
    twitch_name: String!
    twitter_name: String!
    custom_url: String
  }

  type Token {
    value: String!
  }

  enum Ability {
    CB
    LDE
    OG
    T
    H
    NS
    RP
    TI
    DR
    OS
    SJ
    BDU
    REC
    RES
    ISM
    ISS
    MPU
    QR
    QSJ
    RSU
    SSU
    SCU
    SPU
    SS
    BRU
  }

  enum Weapon {
    Sploosh-o-matic
    Neo Sploosh-o-matic
    Sploosh-o-matic 7
    Splattershot Jr.
    Custom Splattershot Jr.
    Kensa Splattershot Jr.
    Splash-o-matic
    Neo Splash-o-matic
    Aerospray MG
    Aerospray RG
    Aerospray PG
    Splattershot
    Tentatek Splattershot
    Kensa Splattershot
    .52 Gal
    .52 Gal Deco
    Kensa .52 Gal
    N-ZAP '85
    N-ZAP '89
    N-ZAP '83
    Splattershot Pro
    Forge Splattershot Pro
    Kensa Splattershot Pro
    .96 Gal
    .96 Gal Deco
    Jet Squelcher
    Custom Jet Squelcher
    L-3 Nozzlenose
    L-3 Nozzlenose D
    Kensa L-3 Nozzlenose
    H-3 Nozzlenose
    H-3 Nozzlenose D
    Cherry H-3 Nozzlenose
    Squeezer
    Foil Squeezer
    Luna Blaster
    Luna Blaster Neo
    Kensa Luna Blaster
    Blaster
    Custom Blaster
    Range Blaster
    Custom Range Blaster
    Grim Range Blaster
    Rapid Blaster
    Rapid Blaster Deco
    Kensa Rapid Blaster
    Rapid Blaster Pro
    Rapid Blaster Pro Deco
    Clash Blaster
    Clash Blaster Neo
    Carbon Roller
    Carbon Roller Deco
    Splat Roller
    Krak-On Splat Roller
    Kensa Splat Roller
    Dynamo Roller
    Gold Dynamo Roller
    Kensa Dynamo Roller
    Flingza Roller
    Foil Flingza Roller
    Inkbrush
    Inkbrush Nouveau
    Permanent Inkbrush
    Octobrush
    Octobrush Nouveau
    Kensa Octobrush
    Classic Squiffer
    New Squiffer
    Fresh Squiffer
    Splat Charger
    Firefin Splat Charger
    Kensa Charger
    Splatterscope
    Firefin Splatterscope
    Kensa Splatterscope
    E-liter 4K
    Custom E-liter 4K
    E-liter 4K Scope
    Custom E-liter 4K Scope
    Bamboozler 14 Mk I
    Bamboozler 14 Mk II
    Bamboozler 14 Mk III
    Goo Tuber
    Custom Goo Tuber
    Slosher
    Slosher Deco
    Soda Slosher
    Tri-Slosher
    Tri-Slosher Nouveau
    Sloshing Machine
    Sloshing Machine Neo
    Kensa Sloshing Machine
    Bloblobber
    Bloblobber Deco
    Explosher
    Custom Explosher
    Mini Splatling
    Zink Mini Splatling
    Kensa Mini Splatling
    Heavy Splatling
    Heavy Splatling Deco
    Heavy Splatling Remix
    Hydra Splatling
    Custom Hydra Splatling
    Ballpoint Splatling
    Ballpoint Splatling Nouveau
    Nautilus 47
    Nautilus 79
    Dapple Dualies
    Dapple Dualies Nouveau
    Clear Dapple Dualies
    Splat Dualies
    Enperry Splat Dualies
    Kensa Splat Dualies
    Glooga Dualies
    Glooga Dualies Deco
    Kensa Glooga Dualies
    Dualie Squelchers
    Custom Dualie Squelchers
    Dark Tetra Dualies
    Light Tetra Dualies
    Splat Brella
    Sorella Brella
    Tenta Brella
    Tenta Sorella Brella
    Tenta Camo Brella
    Undercover Brella
    Undercover Sorella Brella
    Kensa Undercover Brella
  }

  type Build {
    discord_id: String!
    weapon: Weapon!
    title: String
    headgear: [Ability!]!
    clothing: [Ability!]!
    shoes: [Ability!]!
    createdAt: String!
  }

  type Query {
    playerCount: Int!
    topTotalPlayers (amount: Int): [Player!]!
    topShooterPlayers (amount: Int): [Player!]!
    topBlasterPlayers (amount: Int): [Player!]!
    topRollerPlayers (amount: Int): [Player!]!
    topChargerPlayers (amount: Int): [Player!]!
    topSlosherPlayers (amount: Int): [Player!]!
    topSplatlingPlayers (amount: Int): [Player!]!
    topDualiesPlayers (amount: Int): [Player!]!
    topBrellaPlayers (amount: Int): [Player!]!
    topPlayers (weapon: String!): topPlayer!
    topFlex: [Player!]!
    weaponPlacementStats(weapon: String!): [Int!]!
    playerInfo(uid: String twitter: String): PlayerWithPlacements!
    searchForPlayers(name: String! exact: Boolean): [Placement]!
    maplists: [Maplist!]!
    rotationData: String
    links: [Link!]!
    user: User
    searchForUser (discord_id: String!): User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBuild(
      weapon: Weapon!
      title: String
      headgear: [Ability!]!
      clothing: [Ability!]!
      shoes: [Ability!]!
    ): Build
  }    
`

const resolvers = {
  Query: {
    playerCount: () => Player.collection.countDocuments(),
    topTotalPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }
      
      return Player
        .find({ topTotalScore: { $ne: null} })
        .sort({ "topTotalScore": "desc" })
        .limit(args.amount)
        .populate("topTotal", {"unique_id": 0})
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    topShooterPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topShooterScore: { $ne: null} })
        .sort({ "topShooterScore": "desc" })
        .limit(args.amount)
        .populate("topShooter", {"unique_id": 0})
    },
    topBlasterPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topBlasterScore: { $ne: null} })
        .sort({ "topBlasterScore": "desc" })
        .limit(args.amount)
        .populate("topBlaster", {"unique_id": 0})
    },
    topRollerPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topRollerScore: { $ne: null} })
        .sort({ "topRollerScore": "desc" })
        .limit(args.amount)
        .populate("topRoller", {"unique_id": 0})
    },
    topChargerPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topChargerScore: { $ne: null} })
        .sort({ "topChargerScore": "desc" })
        .limit(args.amount)
        .populate("topCharger", {"unique_id": 0})
    },
    topSlosherPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topSlosherScore: { $ne: null} })
        .sort({ "topSlosherScore": "desc" })
        .limit(args.amount)
        .populate("topSlosher", {"unique_id": 0})
    },
    topSplatlingPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topSplatlingScore: { $ne: null} })
        .sort({ "topSplatlingScore": "desc" })
        .limit(args.amount)
        .populate("topSplatling", {"unique_id": 0})
    },
    topDualiesPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topDualiesScore: { $ne: null} })
        .sort({ "topDualiesScore": "desc" })
        .limit(args.amount)
        .populate("topDualies", {"unique_id": 0})
    },
    topBrellaPlayers: (root, args) => {
      if (!args.amount) {
        args.amount = 50
      }

      if (args.amount < 1 || args.amount > 50) {
        throw new UserInputError('amount requested has to be between 1 and 50', {
          invalidArgs: args,
        })
      }

      return Player
        .find({ topBrellaScore: { $ne: null} })
        .sort({ "topBrellaScore": "desc" })
        .limit(args.amount)
        .populate("topBrella", {"unique_id": 0})
    },
    topPlayers: async (root, args) => {
      const placements =  await Placement
        .find({ weapon: args.weapon })
        .sort({ "x_power": "desc" })
        .select({ weapon: 0})
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
      
      const m = placements.reduce((acc, cur) => {
        if (cur.mode === 1) {
          acc.sz++
        } else if (cur.mode === 2) {
          acc.tc++
        } else if (cur.mode === 3) {
          acc.rm++
        } else {
          acc.cb++
        }

        return acc
      }, {sz: 0, tc: 0, rm: 0, cb: 0})

      return {placements: placements.slice(0, 101), modeCount: [m.sz+m.tc+m.rm+m.cb, m.sz, m.tc, m.rm, m.cb]}
    },
    topFlex: async (root, args) => {
      return Player
        .find({})
        .sort({ "weaponsCount": "desc", "topTotalScore": "desc" })
        .limit(50)
    },
    playerInfo: async (root, args) => {
      let searchCriteria = {}
      if (args.uid) searchCriteria = { "unique_id": args.uid }
      if (args.twitter) searchCriteria = { "twitter": args.twitter.toLowerCase()}
      const player = await Player
        .findOne(searchCriteria)
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })

      if (!player) {
        throw new UserInputError('player not found', {
          invalidArgs: args,
        })
      }
      const placements = await Placement
        .find({ unique_id: player.unique_id })
        .sort({ "year": "asc", "month": "asc" })
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })

      return { player, placements }
    },
    searchForPlayers: async (root, args) => {
      let placements = []
      if (args.exact) {
        placements = await Placement
          .find({ name: args.name })
          .sort({ "x_power": "desc" })
          .limit(100)
          .select({ name: 1, weapon: 1, x_power: 1, unique_id: 1})
          .catch(e => {
            throw new UserInputError(e.message, {
              invalidArgs: args,
            })
          })
      } else {
        placements = await Placement
          .find({ name: { "$regex": args.name, "$options": "i" }})
          .sort({ "x_power": "desc" })
          .limit(100)
          .select({ name: 1, weapon: 1, x_power: 1, unique_id: 1})
          .catch(e => {
            throw new UserInputError(e.message, {
              invalidArgs: args,
            })
          })
        }

      let uids = []

      return placements.filter(p => {
        if (uids.length === 21) {
          return false
        }
        const bool = uids.includes(p.unique_id)
        if (bool) {
          return false
        }
        uids.push(p.unique_id)
        return true
      })
    },
    maplists: (root, args) => {
      return Maplist
      .find({})
      .sort({ order: "asc" })
      .catch(e => {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      })
    },
    rotationData: async (root, args) => {
      if (Math.floor(Date.now() / 1000) - rotationData.timestamp > 7200) {  //only refetching data if two hours have passed
        const result = await axios.get('https://splatoon2.ink/data/schedules.json', { headers: { 'User-Agent': 'sendou.ink - owner: @Sendouc on Twitter'}})
        rotationData = result.data
        rotationData.timestamp = Math.floor(Date.now() / 1000)
        return JSON.stringify(rotationData)
      } else {
        return JSON.stringify(rotationData)
      }
    },
    links: (root, args) => {
      return Link
        .find({})
        .sort({ "title": "asc" })
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    user: (root, args, ctx) => {
      return ctx.user
    },
    searchForUser: (root, args) => {
      return User
        .findOne({discord_id: args.discord_id})
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    }
  },
  Mutation: {
    addBuild: async (root, args, ctx) => {
      if (!ctx.user) throw new AuthenticationError('User not logged in.')
      if (ctx.title.length > 100) throw new UserInputError('Title too long.', {
        invalidArgs: args,
      }) //100 good limit or more?
      // need to validate that haunt not a sub etc.
      const existingBuilds = await Build
        .find({ discord_id: ctx.user.discord_id})
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
      if (existingBuilds.length >= 20) throw new UserInputError('Can\'t have more than 20 builds per user.', {
        invalidArgs: args,
      })
      const build = new Build({ ...args, discord_id: ctx.user.discord_id })
      return await Build.create(build) //?
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { user: req.user }
  }
})

const app = express()

app.use(cors())
app.use(express.static('build'))

app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
 }))

app.use(passport.initialize())
app.use(passport.session())

server.applyMiddleware({ app })

app.get('/auth/discord', passport.authenticate('discord'))

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/404'
}), function(req, res) {
    res.redirect('/u/' + req.user.discord_id) // Successful auth
})

app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})



const PORT = process.env.PORT || 3001
app.listen({ port: PORT }, () => {
  console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`)
})