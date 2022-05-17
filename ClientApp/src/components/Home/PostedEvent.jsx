import { Box, Button, Center, Flex, HStack, Icon, Input, InputGroup, InputRightAddon, Spinner, StackDivider, Text, Textarea, useBoolean, VStack } from '@chakra-ui/react'
import LoggedUserCard from '../common/LoggedUserCard'
import DateVisualizer from './DateVisualizer'

import icon from '../../configs/icons'
import { useState } from 'react'
import UserCard from '../common/UserCard'
import UserAvatar from '../common/UserAvatar'
import LoggedUserAvatar from '../common/LoggedUserAvatar'
import { motion } from 'framer-motion'

const comments = [
  {
    owner: {
      user: "cih2",
      name: {
        first: "Carlos",
        last: "Ibarra"
      }
    },
    text: `Este es un comentario de prueba XP.`
  },
  {
    owner: {
      user: "user",
      name: {
        first: "Usuario",
        last: "Usuariez"
      }
    },
    text: `Este es otro comentario de prueba 😎👌`
  },
  {
    owner: {
      user: "user",
      name: {
        first: "Usuario",
        last: "Usuariez"
      }
    },
    text: `Este es otro comentario de prueba 😎👌`
  },
  {
    owner: {
      user: "user",
      name: {
        first: "Usuario",
        last: "Usuariez"
      }
    },
    text: `Este es otro comentario de prueba 😎👌`
  }
]

const Comment = ({ owner, text }) => {
  return (
    <VStack bg="white" borderRadius="5px" p="10px" pb="20px" align="start">
      <UserCard size={36} user={owner.user} name={owner.name}
        avatar={
          <UserAvatar />
        }
      />
      <Text color="purple.900">{text}</Text>
    </VStack>
  )
}

const MakeComment = ({ onFinish }) => {
  // const { status, uploadComment } = useMakeComment()
  
  const [loading, setLoading] = useBoolean(false)
  const [text, setText] = useState("")
  const handleAccept = () => {
    setLoading.on()
    setTimeout(() => {
      setLoading.off()
      setText("")
    }, 1000)
  }
  const handleChange = ({ target: { value } }) => setText(value)

  return (
    <HStack pos="relative">
      <LoggedUserAvatar />
      <InputGroup borderRadius="full" overflow="hidden">
        <Input
          borderRadius="full" bg="white" placeholder='Escribe un comentario...'
          value={text} onChange={handleChange}
        />
        <InputRightAddon bg="purple.500" borderColor="purple.500">
          <Button
            size="sm" colorScheme="purple"
            onClick={handleAccept} isDisabled={!text.length}
          >
            comentar
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Center
        as={motion.div} animate={{ opacity: loading ? 1 : 0 }} pointerEvents={loading ? 'initial' : 'none'}
        borderRadius="full" boxSize="full" pos="absolute" m="0 !important" bg="whiteAlpha.700"
      >
        <Spinner color="blue.300" />
      </Center>
    </HStack>
  )
}

const EventComments = ({ comments }) => {
  const [expanded, setExpanded] = useBoolean(false)

  return (
    <VStack w="full" align="stretch" spacing={0} transform="translateY(-6px)">
      <Box maxH={expanded ? "300px" : 0} overflowY="auto" bg="gray.200" transition="all 200ms">
        <VStack w="full" align="stretch" p="10px" pt="16px" spacing={4}>
          <MakeComment />
          <VStack align="stretch">
            {
              comments?.map((comment, i) => (
                <Comment key={i} {...comment} />
              ))
            }
          </VStack>
        </VStack>
      </Box>
      <Button pos="relative" pt={expanded ? 0 : "6px"} h="40px" colorScheme="blue"
        fontWeight="normal" borderRadius="0 0 20px 20px" zIndex={1} onClick={setExpanded.toggle}
      >
        {!expanded ? (
          <HStack spacing={3}>
            <Icon fontSize="lg" as={icon.comments} />
            <Text fontSize="sm">{comments.length}</Text>
          </HStack>
        ) : (
          <HStack spacing={1}>
            <Icon fontSize="lg" as={icon.hide} />
            <Text>ocultar</Text>
          </HStack>
        )
        }
      </Button>
    </VStack>
  )
}

const PostedEvent = ({ owner, title, description, date }) => {
  return (
    <VStack spacing={0}>
      <HStack
        pos="relative" minH="220px" bg="white" borderRadius="10px" border="solid 1px"
        borderColor="gray.300" shadow="md" p="20px" spacing={9} zIndex={2}
      >
        <VStack flex={1} align="start" spacing={5}>
          <UserCard user={owner.user} name={owner.name} avatar={
            <UserAvatar />
          } />
          <VStack align="start" spacing={2}>
            <HStack>
              <Icon as={icon.right_arrow} color="blue.200" />
              <Text fontWeight="semibold" fontSize="sm">{title}</Text>
            </HStack>
            <Text fontSize="md" textAlign="justify" color="gray.600">{description}</Text>
          </VStack>
        </VStack>
        <DateVisualizer date={date} />
      </HStack>
      <EventComments comments={comments} />
    </VStack >
  )
}

export default PostedEvent