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

const Menu = () => {
  return (
    <VStack px="15px" align="stretch">
      <Button leftIcon={<Icon as={icon.home} />}>
        Inicio
      </Button>
      <Button leftIcon={<Icon as={icon.events} />}>
        Mis eventos
      </Button>
      <Button leftIcon={<Icon as={icon.profile} />}>
        Perfil
      </Button>
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