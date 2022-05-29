import React from 'react'
import { Button, Box, Icon, VStack, Center, Text, background } from '@chakra-ui/react'
import { MdVpnKey } from 'react-icons/md'
import icon from '../configs/icons'
import { useAzureAuth } from '../context/AzureAuthContextProvider'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

const hoverButtonStyle = {
  background: 'purple.500',
  color: 'white'
}

const SignInButton = () => {
  const { signIn } = useAzureAuth()

  return (
    <Button _hover={hoverButtonStyle}
      leftIcon={<Icon as={MdVpnKey} />}
      onClick={() => signIn()}>Sign in</Button>
  )
}

const SignOutButton = () => {
  const { signOut } = useAzureAuth()

  return (
    <Button _hover={hoverButtonStyle}
      leftIcon={<Icon as={MdVpnKey} />}
      onClick={() => signOut()}>Sign out</Button>
  )
}

const Login = () => {
  return (
    <Center w='100vw' h='100vh' bg='gray.200'>
      <VStack px='150px' py='100px' borderRadius='10px' shadow='md' bg='white'>
        <Icon fontSize={100} color='purple.600' as={icon.app_logo.outline}></Icon>
        <Text fontSize={30}>EventNet</Text>

        <AuthenticatedTemplate>
          <SignOutButton />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <SignInButton />
        </UnauthenticatedTemplate>

      </VStack>
    </Center>
  )
}

export default Login