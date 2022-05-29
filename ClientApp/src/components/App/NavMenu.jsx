import React, { useEffect } from 'react'
import {
  Button, Center, HStack, Icon, IconButton, Popover, PopoverArrow, PopoverBody,
  PopoverContent, PopoverTrigger, Spacer, Text, VStack,
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import icon from '../../configs/icons'
import LoggedUserCard from '../common/LoggedUserCard'
import { useAzureAuth } from '../../context/AzureAuthContextProvider'
import { useApolloClient } from '@apollo/client'

const Logo = () => {
  return (
    <Center p="10px">
      <HStack py="10px">
        <Icon as={icon.app_logo.fill} color="purple.500" fontSize="34px" />
        <Spacer />
        <Text fontWeight="light" fontSize="lg" color="blue.700">
          EventNet
        </Text>
      </HStack>
    </Center>
  )
}

const MenuButton = ({ isSelected, children, value, icon }) => {
  const navigate = useNavigate()

  return (
    <Button
      pointerEvents={isSelected ? "none" : "initial"}
      color={isSelected ? "white" : "gray.600"}
      bg={isSelected ? "blue.400" : "gray.100"}
      leftIcon={<Icon as={icon} />}
      // fontFamily="Montserrat"
      fontSize="md"
      // fontWeight="normal"
      onClick={navigate.bind(null, value)}
    >
      {children}
    </Button>
  )
}

const MenuButtonControl = ({ children, value }) => {
  return (
    <VStack spacing={3} px="20px" align="stretch">
      {
        children?.map((child, i) => {
          if (React.isValidElement(child)) {
            const isSelected = child.props.value == value
            
            return React.cloneElement(child, { isSelected, key: i });
          }

          return child
        })
      }
    </VStack>
  )
}

const Menu = () => {
  const location = useLocation()

  return (
    <MenuButtonControl value={location.pathname}>
      <MenuButton value="/" icon={icon.home}>
        Inicio
      </MenuButton>
      <MenuButton value="/events" icon={icon.events}>
        Mis eventos
      </MenuButton>
      <MenuButton value="/profile" icon={icon.profile}>
        Pérfil
      </MenuButton>
    </MenuButtonControl>
  )
}

const Settings = () => {
  const { signOut } = useAzureAuth()
  // const apolloClient = useApolloClient()

  const handleLogout = () => {
    // apolloClient.resetStore()
    signOut()
  }

  return (
    <HStack py="15px" px="25px" align="center">
      <LoggedUserCard firstOnly size={50}/>
      <Spacer />
      <Popover placement='right'>
        <PopoverTrigger>
          <IconButton variant="ghost" size="xs" icon={
            <Icon as={icon.more_info} fontSize="22px" color="gray.600" />
          } />
        </PopoverTrigger>
        <PopoverContent w="fit-content">
          <PopoverArrow />
          <PopoverBody p="5px" color="gray.700">
            <Button onClick={handleLogout}>
              <HStack color="blue.800">
                <Icon as={icon.logout} fontSize="26px" />
                <Text>Cerrar sesión</Text>
              </HStack>
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}

const NavigationMenu = () => {
  return (
    <VStack
      bg="white"
      w="260px"
      h="full"
      spacing={5}
      borderRadius="10px"
      align="stretch"
      shadow="lg"
      // border="1px solid"
      // borderColor="blue.200"
    >
      <Logo />
      <Menu />
      <Spacer />
      <Settings />
    </VStack>
  )
}

export default NavigationMenu