import React from "react"
import { useQuery } from "@apollo/client"
import { USER } from "../../graphql/queries/user"
import { UserData } from "../../types"
import { PseudoBox, Image } from "@chakra-ui/core"
import loginIcon from "../../assets/navIcons/login.png"
import UserAvatar from "../common/UserAvatar"
import { Link } from "@reach/router"

const UserItem: React.FC = () => {
  const { data } = useQuery<UserData>(USER)

  if (!data) return null
  if (data.user)
    return (
      <Link to={`/u/${data.user.custom_url ?? data.user.discord_id}`}>
        <UserAvatar
          my="1rem"
          src={data.user.avatar}
          name={data.user.username}
        />
      </Link>
    )

  return (
    <a href="/auth/discord">
      <PseudoBox
        w="48px"
        h="48px"
        cursor="pointer"
        transition="0.3s transform"
        pt="1rem"
        _hover={{ transform: "scale(1.15)" }}
      >
        <Image ignoreFallback src={loginIcon} />
      </PseudoBox>
    </a>
  )
}

export default UserItem
