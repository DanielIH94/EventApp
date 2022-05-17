import { HStack, Text, VStack } from "@chakra-ui/react"
import { cloneElement, isValidElement } from "react"
import UserAvatar from "./UserAvatar"

const UserCard = ({ size = 45, user, name, avatar, firstOnly }) => {
  if (avatar === null || !isValidElement(avatar))
    throw "Invalid element"

  return (
    <HStack>
      {cloneElement(avatar, { size })}
      <VStack align="start" spacing={0}>
        <Text fontSize={`${size * 0.3}px`} fontWeight="normal" color="gray.400">
          #{user}
        </Text>
        <Text fontSize={`${size * 0.33}px`} fontWeight="semibold" color="gray.600">
          {name.first} {!firstOnly && name.last}
        </Text>
      </VStack>
    </HStack>
  )
}

export default UserCard