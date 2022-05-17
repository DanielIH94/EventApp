import UserAvatar from "./UserAvatar"

const LoggedUserAvatar = ({ size }) => {
  // const { avatarSrc } = useLoggedUserInfo()

  return (
    <UserAvatar size={size} src={null} />
  )
}

export default LoggedUserAvatar