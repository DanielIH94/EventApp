import { Circle, Icon, Image } from "@chakra-ui/react"
import icon from "../../configs/icons"

const UserAvatar = ({ size = 50, src }) => {
  return (
    <Circle size={`${size}px`} overflow="hidden" bg="gray.50"
      border="1px solid" borderColor="gray.200" shadow="base"
    >
      <Image boxSize="full" src={src} fallback={
        <Icon as={icon.empty_avatar} fontSize={`${size * 0.6}px`} color="purple.500" />
      } />
    </Circle>
  )
}

export default UserAvatar