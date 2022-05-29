import { HStack, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import LoggedUserAvatar from './LoggedUserAvatar'
import UserCard from './UserCard'
import { useAzureAuth } from '../../context/AzureAuthContextProvider'

const LoggedUserCard = ({ size, firstOnly }) => {
  const { user, loading } = useAzureAuth()

  const userName = "user"
  const name = {
    first: "Usuario",
    last: "Usuariez"
  }

  if (loading)
    return (
      <HStack>
        <SkeletonCircle size={`${size}px`}/>
        <VStack align="start" spacing="10px">
          <Skeleton w="50px" h="10px" borderRadius="full"/>
          <Skeleton w="100px" h="15px" borderRadius="full"/>
        </VStack>
      </HStack>
    )

  return (
    <UserCard size={size} name={name} user={userName} firstOnly={firstOnly}
      avatar={<LoggedUserAvatar />}
    />
  )
}

export default LoggedUserCard