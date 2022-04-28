import React from 'react'
import { Button, Box, Icon } from '@chakra-ui/react'
import { MdVpnKey } from 'react-icons/md'

const Login = () => {
  return (
    <Box>
      <Icon as=''></Icon>
      <Button leftIcon={<Icon as={MdVpnKey} />}>Sign in</Button>
    </Box>
  )
}

export default Login