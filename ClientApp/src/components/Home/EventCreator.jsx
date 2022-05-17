import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Box, Button, Center, HStack, Icon, IconButton, Input, InputGroup, InputRightAddon, Popover,
  PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger,
  Portal, Spacer, Text, Textarea, Tooltip, useBoolean, VStack
} from '@chakra-ui/react'
import Calendar from 'react-calendar'
import EmojiInput from 'amazing-react-emojipicker'

import 'react-calendar/dist/Calendar.css'
import './EventCreator.css'

import icon from '../../configs/icons'
import LoggedUserCard from '../common/LoggedUserCard'

import { month_table } from '../../configs/dates'

const decomposeDate = date => ({
  day: date.getDate(),
  month: month_table[date.getMonth()],
  year: date.getFullYear()
})

const DatePickerButton = ({ value }) => {
  return (
    <Tooltip label="selecciona una fecha" bg="gray.600" borderRadius={5}
      fontWeight="normal" hasArrow
    >
      <VStack as="button" boxSize="61px" align="stretch" spacing={0}
        transition="all 110ms" borderRadius="10px" overflow="hidden" _hover={{
          transform: "scale(1.03)",
          shadow: "lg"
        }}
      >
        <Box bg="red.500">
          <Center color="white" fontWeight="light" fontSize="sm">
            {value.month.toLowerCase()}
          </Center>
        </Box>
        <Box bg="white" flex={1} borderRadius="0 0 10px 10px" border="solid 1px"
          borderColor="gray.300" borderTop="none"
        >
          <Center h="90%">
            <Text fontSize="2xl">
              {value.day}
            </Text>
          </Center>
        </Box>
      </VStack>
    </Tooltip>
  )
}

const DatePicker = ({ date, onDateChange }) => {
  const dateInfo = decomposeDate(date)

  return (
    <Popover placement='bottom'>
      <PopoverTrigger>
        <Box>
          <DatePickerButton value={dateInfo} />
        </Box>
      </PopoverTrigger>
      <PopoverContent shadow="md">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Fecha del evento</PopoverHeader>
        <PopoverBody fontFamily="initial">
          <Calendar value={date} onChange={onDateChange} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const EmojiPicker = ({ onClick }) => {
  const input = useRef()

  const handleClick = () => {
    onClick(input.current.value)
    input.current.value = ''
  }

  return (
    <Popover placement='bottom-end' >
      {({ isOpen, onClose }) => {
        return (
          <>
            <PopoverTrigger>
              <IconButton variant="ghost" size="xs" borderRadius="full" title='emoji picker'
                icon={<Icon as={icon.smiley} color="gray.400" fontSize="lg" />}
              />
            </PopoverTrigger>
            <PopoverContent width="fit-content" shadow="md">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontSize="sm">Inserta un emoji</PopoverHeader>
              <PopoverBody fontFamily="initial" pos="relative">
                <Box onClick={handleClick}>
                  <Input ref={input} hidden />
                  <EmojiInput ref={input} visibility={isOpen} />
                </Box>
              </PopoverBody>
            </PopoverContent>
          </>
        )
      }}
    </Popover>
  )
}

const TitleInput = ({ maxLength, value, onChange }) => {
  const handleChange = ({ target: { value } }) => {
    onChange(value)
  }

  return (
    <InputGroup >
      <Input bg="gray.50" placeholder='nombre del evento' borderRadius="15px"
        value={value} onChange={handleChange}
      />
      <InputRightAddon color={value.length > maxLength ? "red.400" : "gray.400"}
        fontSize="xs" bg="white" borderRadius="0 15px 15px 0"
      >
        {value.length} / {maxLength}
      </InputRightAddon>
    </InputGroup>
  )
}

const DescriptionInput = ({ maxLength, value, onChange }) => {
  const handleEmojiSelect = emoji => {
    const newDescription = `${value}${emoji}`
    onChange(newDescription)
  }

  const handleDescChange = ({ target: { value } }) => {
    onChange(value)
  }

  return (
    <VStack w="full" align="stretch" spacing={0}>
      <Textarea value={value} bg="gray.50"
        placeholder='descripción del evento' h="110px" borderRadius="15px 15px 0 0"
        resize="none" onChange={handleDescChange}
      />
      <HStack borderRadius="0 0 15px 15px" border="solid 1px"
        borderColor="gray.200" borderTop="none" p="3px"
      >
        <Spacer />
        <HStack>
          <Text fontSize="xs" color={value.length > maxLength ? "red.400" : "gray.400"}>
            {value.length} / {maxLength}
          </Text>
          <EmojiPicker onClick={handleEmojiSelect} />
        </HStack>
      </HStack>
    </VStack>
  )
}

const InputControl = ({ toggle }) => {
  const titleMaxLength = 45
  const descMaxLength = 150

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const isInvalid = useMemo(() => (
    title.length > titleMaxLength ||
    description.length > descMaxLength ||
    title.length === 0 ||
    description.length === 0
  ), [title, description])

  useEffect(() => {
    isInvalid ? toggle.off() : toggle.on()
  }, [isInvalid])

  return (
    <>
      <TitleInput value={title} onChange={setTitle} maxLength={titleMaxLength} />
      <DescriptionInput value={description} onChange={setDescription} maxLength={descMaxLength} />
    </>
  )
}

const EventCreator = () => { // #F7B32B
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isPublicable, setIsPublicable] = useBoolean(true)

  const fullDateString = selectedDate.toLocaleDateString("es-MX", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toLocaleUpperCase()

  return (
    <Center boxSize="full">
      <VStack w="100%" spacing={5} align="stretch" border="solid 1px" borderColor="gray.200"
        borderRadius="10px" py="20px" px="50px" bg="white"
      >
        <Center>
          <Text fontSize="md" fontWeight="semibold" color="blue.700">
            CREAR EVENTO
          </Text>
        </Center>
        <VStack>
          <HStack w="full" align="end" spacing={4}>
            <DatePicker
              date={selectedDate}
              onDateChange={setSelectedDate}
            />
            <VStack h="full" align="start" spacing={0}>
              <Text fontSize="sm" color="gray.500">fecha del evento:</Text>
              <Text color="blue.600" fontWeight="semibold" fontSize="md" py="4px">
                {fullDateString}
              </Text>
            </VStack>
          </HStack>
          <InputControl toggle={setIsPublicable} />
          <HStack w="full">
            <LoggedUserCard />
            <Spacer />
            <Button size="md" colorScheme="purple" borderRadius="15px" isDisabled={!isPublicable}>
              publicar
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  )
}

export default EventCreator