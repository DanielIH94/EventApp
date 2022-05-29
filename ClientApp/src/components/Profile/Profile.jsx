import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Center, HStack, Icon, Input, InputGroup, InputLeftAddon, InputLeftElement, Spacer, StackDivider, Switch, Text, useBoolean, usePanGesture, VStack } from '@chakra-ui/react'
import LoggedUserAvatar from '../common/LoggedUserAvatar'
import icon from '../../configs/icons'
import UserAvatar from '../common/UserAvatar'
import { AnimatePresence, AnimateSharedLayout, motion, Reorder } from 'framer-motion'
import update from 'immutability-helper'
import { gql, useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import { useMsal } from '@azure/msal-react'

const friends_dummy = [
  {
    id: 1,
    user: "uz3r0022",
    name: {
      first: "Juan",
      last: "Escarcha"
    }
  },
  {
    id: 2,
    user: "cih001",
    name: {
      first: "Carlos",
      last: "Ibarra"
    }
  },
  {
    id: 3,
    user: "xyz02222",
    name: {
      first: "John",
      last: "Lennon"
    }
  },
  {
    id: 4,
    user: "pooooop02222222",
    name: {
      first: "Pancho",
      last: "Villa"
    }
  }
]

const Friend = ({ user, name, onDelete }) => {
  const [loading, setLoading] = useBoolean(false)

  const handleClick = () => {
    setLoading.on()
    setTimeout(() => {
      setLoading.off()
      onDelete()
    }, 1000)
  }

  return (
    <HStack
      as={motion.div} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout
      pos="relative" p="10px" pl="0"
    >
      <HStack spacing={3}>
        <UserAvatar />
        <VStack spacing={0} align="start">
          <Text fontSize="sm" color="blue.500">#{user}</Text>
          <Text fontWeight="semibold" color="blue.800">{name.first} {name.last}</Text>
        </VStack>
      </HStack>
      <Spacer />
      <Button borderRadius="full" shadow="md" isLoading={loading} onClick={handleClick}>
        eliminar
      </Button>
    </HStack>
  )
}

const FriendList = ({ data }) => {
  const [friends, setFriends] = useState(data)

  const handleDeleteFriend = (index) => {
    setFriends(update(friends, {
      $splice: [[index, 1]]
    }))
  }

  return (
    <VStack w="full" align="stretch" overflow="hidden" divider={<StackDivider />}
    >
      <AnimatePresence>
        {friends.map((friend, index) => (
          <Friend
            key={friend.id}
            user={friend.user}
            name={friend.name}
            onDelete={handleDeleteFriend.bind(null, index)}
          />
        ))}
      </AnimatePresence>
    </VStack>
  )
}

const ProfileCard = () => {
  return (
    <VStack h="250px" bg="white" shadow="md" borderRadius="2xl" p="20px" spacing={4} >
      <LoggedUserAvatar size={100} />
      <VStack spacing={0}>
        <Text fontSize="2xl" color="gray.600">#user</Text>
        <Text fontSize="3xl" color="blue.700">Usuario Usuariez</Text>
      </VStack>
    </VStack>
  )
}

const Search = ({ value, onChange }) => {
  const [isSearching, setIsSearching] = useState(false)
  const handleChange = ({ target: { checked } }) => {
    console.log(checked)
    setIsSearching(checked)
  }

  const checkedColor = "blue.600"
  const uncheckedColor = "gray.400"

  return (
    <HStack bg="white" p="20px" borderRadius="15px" shadow="md">
      <InputGroup w="60%">
        <InputLeftElement pointerEvents="none">
          <Icon as={icon.search} color='gray.300' />
        </InputLeftElement>
        <Input type="search" placeholder='buscar...' borderRadius="full" />
        {/* {
          !isSearching && 
        } */}
      </InputGroup>
      <Spacer />
      <HStack>
        <Icon as={icon.add_user} color={!isSearching ? checkedColor : uncheckedColor} fontSize="2xl" />
        <Switch size="md" onChange={handleChange} />
        <Icon as={icon.search_user} color={isSearching ? checkedColor : uncheckedColor} fontSize="2xl" />
      </HStack>
    </HStack>
  )
}

const Friends = () => {
  return (
    <VStack
      bg="white" shadow="md" borderRadius="2xl" py="15px" px="30px"
      align="start" spacing={7} transition="all 200ms"
    >
      <HStack color="blue.800">
        <Icon as={icon.friends} fontSize="lg" />
        <Text>amigos</Text>
        <Text>•</Text>
        <Text fontWeight="semibold" color="blue.700">100</Text>
      </HStack>
      <FriendList data={friends_dummy} />
    </VStack>
  )
}



const Profile = () => {
  // const [test, setTest] = useBoolean(false)
  // const { data, error } = useSubscription(gql`
  // subscription {
  //   bookAdded {
  //     title
  //     author {
  //       name
  //     }
  //   }
  // }
  // `)

  const { inProgress } = useMsal()
  const [getMe, { data, error, loading }] = useLazyQuery(gql`
    query {
      me
    }
  `)

  console.log(error)

  if (!loading)
    console.log(data)

  useEffect(() => {
    if (inProgress === "none")
      getMe()
  }, [inProgress])

  return (
    <Center p="10px" w="full">
      <VStack w="86%" align="stretch" spacing={5}>
        <ProfileCard />
        <Search />
        <Friends />
      </VStack >
    </Center >
  )
}

export default Profile