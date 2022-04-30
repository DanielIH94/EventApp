import { Circle, Icon } from "@chakra-ui/react"
import icon from "../../configs/icons"

const UserAvatar = ({ size = "50px"}) => {
  return (
    <Circle size={size} overflow="hidden" bg="gray.50" border="1px solid" borderColor="gray.200" shadow="base">
      <Icon as={icon.empty_avatar} fontSize={size} transform="scale(0.6)" color="purple.500" />
    </Circle>
  )
}

export default UserAvatar