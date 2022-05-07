import React from 'react'
import { Box, Center, Text, VStack } from '@chakra-ui/react'
import LoggedUserAvatar from '../common/LoggedUserAvatar'

const Profile = () => {
  return (
    <Center w="full">
      <VStack w="86%" align="stretch" spacing={5}>
        <VStack h="250px" bg="white" shadow="md" borderRadius="2xl" p="20px" spacing={4}>
          <LoggedUserAvatar size={100} />
          <VStack spacing={0}>
            <Text fontSize="2xl" color="gray.500">#user</Text>
            <Text fontSize="3xl" color="blue.700">Usuario Usuariez</Text>
          </VStack>
        </VStack>

        <Box h="350px" bg="white" shadow="md" borderRadius="2xl"></Box>
      </VStack>
    </Center>
  )
}

export default Profile