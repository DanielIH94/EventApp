import { Box, Center, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD:ClientApp/src/components/App/App.jsx

import NavigationMenu from './NavMenu';
=======
import LateralPanel from './components/Home/LateralPanel';
>>>>>>> 7f4fda7aee230e42648e44270964c50891dd53ef:ClientApp/src/App.jsx


const App = () => {
  return (
    <HStack bg="gray.200" w="100vw" h="100vh" align="stretch" px={20} spacing={3}>
      <Box py="30px">
        <NavigationMenu />
      </Box>
<<<<<<< HEAD:ClientApp/src/components/App/App.jsx
      <Center flex={1} alignItems="stretch" bg="red">
=======
      <Center flex={1} alignItems="stretch">
>>>>>>> 7f4fda7aee230e42648e44270964c50891dd53ef:ClientApp/src/App.jsx
        <Outlet />
      </Center>
    </HStack>
  );
}

export default App