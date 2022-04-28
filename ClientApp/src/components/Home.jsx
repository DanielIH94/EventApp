import React from 'react'
import { Box, Center, Circle, Flex, HStack, Icon, IconButton, Spacer, VStack } from '@chakra-ui/react'
import { BiDotsVerticalRounded } from "react-icons/bi"

const Home = () => {
  return (
    <HStack w="100vw" h="100vh" align="stretch" p="7px" px={20} spacing={3} bg="gray.100">
      <VStack bg="white" w="250px" borderRadius="10px" align="stretch" shadow="lg">
        <Spacer />
        <HStack p="7px" align="stretch">
          <Circle size="60px" bg="red" />
          <Spacer />
          <Box w="25px">
            <Center boxSize="full">
              <Box as="button" p="3px" color="gray.600">
                <BiDotsVerticalRounded fontSize="26px"/>
              </Box>
            </Center>
          </Box>
        </HStack>
      </VStack>
      <Center flex={1} alignItems="stretch">
        <Box bg="white" w="75%" shadow="lg" borderRadius="10px">

        </Box>
      </Center>
    </HStack>
  )
}

export default Home