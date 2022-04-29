import { useEffect, useRef } from 'react';
import { Box, Center, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import NavigationMenu from './NavMenu';

import { useSmoothScroll } from '../../context/SmoothScrollContextProvider';

const App = () => {
  const { init: initScroll } = useSmoothScroll()
  const scrollRef = useRef()

  useEffect(() => {
    return initScroll(scrollRef.current, {
      damping: 0.08
    })
  }, [])

  return (
    <HStack bg="gray.200" w="100vw" h="100vh" align="stretch" px={20} spacing={3}>
      <Box py="30px">
        <NavigationMenu />
      </Box>
      <Box ref={scrollRef} w="full">
        <Center boxSize="full" alignItems="stretch">
          <Outlet />
        </Center>
      </Box>
    </HStack>
  );
}

export default App