import { useEffect, useRef, useState } from 'react';
import {
  Box, Center, HStack, Icon, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Text, Textarea, VStack
} from '@chakra-ui/react'
import Calendar from 'react-calendar';
import Picker from "emoji-picker-react"

import UserAvatar from '../common/UserAvatar'

import 'react-calendar/dist/Calendar.css';
import './EventCreator.css';

import icon from '../../configs/icons';
import { HiChevronDoubleLeft } from 'react-icons/hi';

const month_table = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

const decomposeDate = date => ({
  day: date.getDate(),
  month: month_table[date.getMonth()],
  year: date.getFullYear()
})

const DatePickerButton = ({ value }) => {
  return (
    <VStack as="button" boxSize="70px" align="stretch" spacing={0}
      transition="all 110ms" borderRadius="10px" overflow="hidden" _hover={{
        transform: "scale(1.03)",
        shadow: "lg"
      }}
    >
      <Box bg="red.500">
        <Center color="white" fontWeight="light">
          {value.month.toLowerCase()}
        </Center>
      </Box>
      <Box bg="white" flex={1} borderRadius="0 0 10px 10px" border="solid 1px"
        borderColor="gray.300" borderTop="none"
      >
        <Center h="90%" fontSize="2xl">
          {value.day}
        </Center>
      </Box>
    </VStack>
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

const EmojiPicker = ({ onEmojiSelect }) => {
  const emojiPicker = useRef(
    <Picker onEmojiClick={onEmojiSelect} native pickerStyle={{
      width: "100%",
      fontSize: "10px"
    }} />
  )

  return (
    <Popover placement='left-end'>
      <PopoverTrigger>
        <IconButton variant="ghost" size="xs" borderRadius="full"
          icon={<Icon as={icon.smiley} color="gray.400" fontSize="lg" />}
        />
      </PopoverTrigger>
      <PopoverContent shadow="md">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Inserta un emoji</PopoverHeader>
        <PopoverBody fontFamily="initial">
          {emojiPicker.current}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const EventCreator = () => { // #F7B32B
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [descLength, setDescLength] = useState(0)
  const textAreaRef = useRef()

  const handleEmojiSelect = (event, { emoji }) => textAreaRef.current.value += emoji
  const handleDescChange = ({ target: { value } }) => setDescLength(descLength + value.length)

  useEffect(() => {
    console.log(":v")
  }, [])

  return (
    <Box w="100%" bg="gray.50" py="20px"
      borderRadius="10px 10px 0 0" borderBottom="solid 1px" borderColor="gray.300"
    >
      <Center boxSize="full">
        <VStack w="80%" spacing={2} align="stretch" border="solid 1px" borderColor="gray.200"
          borderRadius="10px" py="20px" px="50px" bg="white"
        >
          <Center>
            <Text fontSize="lg" fontWeight="semibold">
              Crear evento
            </Text>
          </Center>
          <VStack>
            <DatePicker
              date={selectedDate}
              onDateChange={setSelectedDate}
            />
            <Text color="gray.600" fontWeight="semibold" fontSize="md" py="8px">
              {selectedDate.toString()}
            </Text>
            <HStack>
              <Input bg="gray.50" placeholder='nombre del evento' borderRadius="15px" />
            </HStack>
            <VStack w="full" align="stretch" spacing={0}>
              <Textarea ref={textAreaRef} bg="gray.50" placeholder='descripción del evento'
                flex={1} borderRadius="15px 15px 0 0" resize="none" onChange={handleDescChange}
              />
              <HStack borderRadius="0 0 15px 15px" border="solid 1px"
                borderColor="gray.100" borderTop="none" p="3px"
              >
                <Spacer />
                <HStack>
                  <Text fontSize="xs" color="gray.400">
                    {descLength} / 200
                  </Text>
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                </HStack>
              </HStack>
            </VStack>

            <HStack w="full">
              <Spacer />
              <UserAvatar size="45px" />
            </HStack>
          </VStack>
        </VStack>
      </Center>
    </Box>
  )
}

export default EventCreator