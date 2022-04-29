import { Box, Flex, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    // <Box w="75%">
    //   <Box boxSize="full" bg="white" shadow="lg">

    //   </Box>
    // </Box>
    <Box w="80%">
      <VStack w="100%" spacing={6}>
        <Box w="70%" h="200px" bg="white" />
        <Box w="full" h="1000px" bg="white" />
      </VStack>
    </Box>
  )
}

export default Home