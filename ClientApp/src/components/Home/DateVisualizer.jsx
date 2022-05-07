import React from 'react'
import { Box, Center, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { month_table } from '../../configs/dates'

const DateVisualizer = ({ date }) => {
  const dateObj = new Date(date)
  const fullDateString = dateObj.toLocaleDateString("es-MX", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Tooltip label={fullDateString} placement="left"
      borderRadius="5px" bg="gray.600" hasArrow
    >
      <VStack pos="relative" boxSize="200px" align="stretch" shadow="md"
        spacing={0} fontFamily="Montserrat" borderRadius="15px" bg="white"
      >
        <HStack pos="absolute" w="full" transform="translateY(-60%)" justify="space-evenly">
          {
            React.Children.toArray(Array(3).fill(
              <Box bg="gray.600" w="13px" h="25px" borderRadius="5px" />
            ))
          }
        </HStack>
        <Center h="45px" bg="red.500" borderRadius="15px 15px 0 0">
          <Text color="white" fontSize="xl">
            {dateObj.getFullYear()}
          </Text>
        </Center>
        <Center flex={1}>
          <VStack spacing={0}>
            <Center h="90px" overflow="hidden">
              <Text fontSize="95px" color="purple.900">
                {dateObj.getDate()}
              </Text>
            </Center>

            <Text fontSize="md" fontWeight="semibold" color="purple.900">
              {month_table[dateObj.getMonth()]}
            </Text>
          </VStack>
        </Center>
      </VStack>
    </Tooltip>
  )
}

export default DateVisualizer