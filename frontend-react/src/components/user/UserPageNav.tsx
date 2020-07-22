import React from "react"
import { FiEdit2, FiPlus } from "react-icons/fi"
import NavLink from "../nav/NavLink"

interface UserPageNavProps {
  editProfile: () => void
  newBuild: () => void
  canEdit: boolean
}

const UserPageNav: React.FC<UserPageNavProps> = ({
  editProfile,
  newBuild,
  canEdit,
}) => {
  return (
    <>
      {canEdit && (
        <NavLink linkText="Edit profile" icon={FiEdit2} onClick={editProfile} />
      )}
      {canEdit && (
        <NavLink linkText="New build" icon={FiPlus} onClick={newBuild} />
      )}
    </>
  )
}

export default UserPageNav
