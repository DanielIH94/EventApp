import { Box, Center, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import NavigationMenu from './NavMenu';

const App = () => {
  return (
    <HStack bg="gray.200" w="100vw" h="100vh" align="stretch" px={20} spacing={3}>
      <Box py="30px">
        <NavigationMenu />
      </Box>
      <Center flex={1} alignItems="stretch" bg="red">
        <Outlet />
      </Center>
    </HStack>
  );
}

export default App