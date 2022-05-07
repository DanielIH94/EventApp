import LoggedUserAvatar from './LoggedUserAvatar'
import UserCard from './UserCard'

const LoggedUserCard = ({ size, firstOnly }) => {
  // const { user, name } = useLoggedUserInfo()
  
  const user = "user"
  const name = {
    first: "Usuario",
    last: "Usuariez"
  }

  return (
    <UserCard size={size} name={name} user={user} firstOnly={firstOnly}
      avatar={<LoggedUserAvatar />}
    />
  )
}

export default LoggedUserCard