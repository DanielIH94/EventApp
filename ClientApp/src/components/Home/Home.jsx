import { Box, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    // <Box w="75%">
    //   <Box boxSize="full" bg="white" shadow="lg">

    //   </Box>
    // </Box>
    <VStack w="80%" spacing={6} overflowY="scroll">
      <Box w="70%" h="200px" bg="white" pos="sticky"/>
      <Box w="100%" h="1000px" bg="white"/>
    </VStack>
  )
}

export default Home