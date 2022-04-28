import React from 'react'
import { Button, Box, Icon, VStack, Center, Text, background } from '@chakra-ui/react'
import { MdVpnKey } from 'react-icons/md'
import icon from '../configs/icons'

const Login = () => {

  const hoverButtonStyle = {
    background: 'purple.500',
    color: 'white'
  }

  return (
    <Center w='100vw' h='100vh' bg='gray.200'>
      <VStack px='150px' py='100px' borderRadius='10px' shadow='md' bg='white'>
        <Icon fontSize={100} color='purple.600' as={icon.app_logo.outline}></Icon>
        <Text fontSize={30}>EventNet</Text>
        <Button _hover={hoverButtonStyle}
          leftIcon={<Icon as={MdVpnKey} />}>Sign in</Button>
      </VStack>
    </Center>
  )
}

export default Login