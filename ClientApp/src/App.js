import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Box>
      <Outlet/>
    </Box>
  );
}

export default App