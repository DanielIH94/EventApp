import { Box, Center, VStack } from '@chakra-ui/react'
import EventCreator from './EventCreator'
import PostedEvent from './PostedEvent'

const posts = [
  {
    owner: {
      user: "cih2",
      name: {
        first: "Carlos",
        last: "Ibarra"
      }
    },
    title: "Este es un post de prueba :)",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    date: 100
  },
  {
    owner: {
      user: "cih2",
      name: {
        first: "Carlos",
        last: "Ibarra"
      }
    },
    title: "Este es un post de prueba :3 ❤",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 😎`,
    date: 1038439392112
  }
]

const Home = () => {
  return (
    <Center>
      <VStack mt="10px" w="93%" spacing={0}>
        <Box w="100%" bg="gray.50" p="20px" borderRadius="10px 10px 0 0"
          borderBottom="solid 1px" borderColor="gray.300"
        >
          <EventCreator />
        </Box>
        <Box w="full" p="20px" bg="gray.100">
          <VStack w="full" align="stretch" spacing={5}>
            {posts.map(post => (
              <PostedEvent {...post} />
            ))}
          </VStack>
        </Box>
      </VStack>
    </Center>
  )
}

export default Home