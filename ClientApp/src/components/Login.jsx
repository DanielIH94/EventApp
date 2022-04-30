import React from 'react'
import { Button, Box, Icon, VStack, Center, Text, background } from '@chakra-ui/react'
import { MdVpnKey } from 'react-icons/md'
import icon from '../configs/icons'
import { useAzureAuth } from '../context/AzureAuthContextProvider'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

const Login = () => {

  const { user, signIn, signOut } = useAzureAuth()

  const hoverButtonStyle = {
    background: 'purple.500',
    color: 'white'
  }

  console.log(user);

  return (
    <Center w='100vw' h='100vh' bg='gray.200'>
      <VStack px='150px' py='100px' borderRadius='10px' shadow='md' bg='white'>
        <Icon fontSize={100} color='purple.600' as={icon.app_logo.outline}></Icon>
        <Text fontSize={30}>EventNet</Text>

        <AuthenticatedTemplate>
          <Button _hover={hoverButtonStyle}
            leftIcon={<Icon as={MdVpnKey} />}
            onClick={() => signOut()}>Sign out</Button>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <Button _hover={hoverButtonStyle}
            leftIcon={<Icon as={MdVpnKey} />}
            onClick={() => signIn()}>Sign in</Button>
        </UnauthenticatedTemplate>

      </VStack>
    </Center>
  )
}

export default Login