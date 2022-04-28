import {
  Button, Center, HStack, Icon, IconButton, Popover, PopoverArrow, PopoverBody,
  PopoverContent, PopoverTrigger, Spacer, Text, VStack,
} from '@chakra-ui/react'
import icon from '../../configs/icons'
import Avatar from '../common/Avatar'

const Logo = () => {
  return (
    <Center p="10px">
      <HStack py="10px">
        <Icon as={icon.app_logo.fill} color="purple.500" fontSize="34px" />
        <Spacer />
        <Text fontWeight="light" fontSize="lg">
          EventNet
        </Text>
      </HStack>
    </Center>
  )
}

const MenuButton = ({ icon, text, onClick }) => {
  return (
    <Button
      color="gray.600"
      leftIcon={<Icon as={icon} />}
      onClick={onClick}
      _active={{
        background: "orange",
        color: "white"
      }}
    >
      {text}
    </Button>
  )
}

const Menu = () => {
  return (
    <VStack spacing={3} px="20px" align="stretch">
      <MenuButton icon={icon.home} text="Inicio" />
      <MenuButton icon={icon.events} text="Mis Eventos" />
      <MenuButton icon={icon.profile} text="Perfil" />
    </VStack>
  )
}

const Settings = () => {
  return (
    <HStack py="15px" px="25px" align="center">
      <Avatar />
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
            <Button>
              <HStack>
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

const LateralPanel = () => {
  return (
    <VStack
      bg="white"
      w="260px"
      h="full"
      spacing={5}
      borderRadius="10px"
      align="stretch"
      shadow="lg"
    >
      <Logo />
      <Menu />
      <Spacer />
      <Settings />
    </VStack>
  )
}

export default LateralPanel