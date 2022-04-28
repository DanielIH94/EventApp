import { Circle, Icon } from "@chakra-ui/react"
import icon from "../../configs/icons"

const Avatar = () => {
  return (
    <Circle size="50px" overflow="hidden" bg="gray.100" border="1px solid" borderColor="gray.200" shadow="sm">
      <Icon as={icon.empty_avatar} fontSize="30px" color="purple.500" />
    </Circle>
  )
}

export default Avatar