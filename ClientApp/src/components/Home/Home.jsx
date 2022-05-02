import { Box, Flex, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useSmoothScroll } from '../../context/SmoothScrollContextProvider'
import EventCreator from './EventCreator'

const Home = () => {
  const Scroll = useSmoothScroll()
  const scrollRef = useRef()

  useEffect(() => {
    const scrollable = Scroll.init(scrollRef.current, {
      damping: 0.15,
      plugins: {
        overscroll: {
          enable: true,
          effect: "bounce",
          damping: 0.15
        }
      }
    })

    return () => {
      scrollable.destroy()
    }
  }, [])

  return (
    <Box mt="10px" ref={scrollRef} w="80%" px="15px" css={{
      "& .scrollbar-track .scrollbar-thumb": {
        // background: "purple",
        opacity: 0.2
      }
    }}>
      <VStack w="100%" spacing={0}>
        <EventCreator/>
        <Box w="full" h="1000px" bg="white" />
      </VStack>
    </Box>
  )
}

export default Home