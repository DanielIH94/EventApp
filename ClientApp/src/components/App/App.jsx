import { Box, Center, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import NavigationMenu from './NavMenu';

const App = () => {
  return (
    <Center w="100vw" h="100vh" bg="gray.200" overflow="hidden">
      <HStack w="80%" h="full" align="stretch" spacing={10}>
        <Box py="20px">
          <NavigationMenu />
        </Box>
        <Outlet />
      </HStack>
    </Center>
  );
}

export default App