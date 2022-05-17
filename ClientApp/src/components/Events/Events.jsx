import React, {
  useMemo, cloneElement, Children, useState, isValidElement, useEffect
} from 'react'
import PropTypes from 'prop-types'
import { Box, Button, ButtonGroup, Heading, HStack, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text, VStack } from '@chakra-ui/react'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
  Navigate
} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import * as dates from '../../configs/dates'
import './style.css'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { MdToday } from 'react-icons/md'
import { BsClock } from 'react-icons/bs'
import { useAzureAuth } from '../../context/AzureAuthContextProvider'
import { getTimezone, getUser, getUserMonthCalendar } from '../../service/GraphService'
import { findIana } from 'windows-iana'
import { useGraph } from '../../context/GraphContextProvider'
import useGetEvents from '../../service/useGetEvents'

const mlocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) => {
  return (
    cloneElement(Children.only(children), {
      style: {
        backgroundColor: '#f7f5fa'
      }
    })
  )
}

const ViewButton = ({ isSelected, children, value, ...props }) => {
  const selectedStyle = {
    leave: {
      backgroundColor: '#ED254E',
      color: 'white'
    },
    hover: {
      backgroundColor: '#ba1839 !important',
      color: 'white'
    }
  }

  return (
    <Button {...props}
      style={isSelected ? selectedStyle.leave : undefined}
      _hover={isSelected ? selectedStyle.hover : undefined}>
      {children}
    </Button>
  )
}

const ViewControl = ({ children, value }) => {
  return (
    <ButtonGroup isAttached>
      {
        children?.map((child, i) => {
          if (isValidElement(child)) {
            const isSelected = child.props.value == value

            return cloneElement(child, { isSelected, key: i })
          }

          return child
        })
      }
    </ButtonGroup>
  )
}

const Toolbar = (props) => {
  const { onNavigate, onView, label, view, localizer: { messages } } = props

  return (
    <HStack w='full' justify='space-between' pb={2}>
      <ButtonGroup isAttached>
        <Button
          leftIcon={<Icon as={MdToday} />}
          bg='purple.500'
          color='white'
          _hover={{ backgroundColor: 'purple.700' }}
          onClick={() => onNavigate(Navigate.TODAY)}>{messages.today}
        </Button>
        <IconButton
          bg='purple.500'
          color='white'
          icon={<Icon as={AiOutlineLeft} />}
          _hover={{ backgroundColor: 'purple.700' }}
          onClick={() => onNavigate(Navigate.PREVIOUS)} />
        <IconButton
          bg='purple.500'
          color='white'
          icon={<Icon as={AiOutlineRight} />}
          _hover={{ backgroundColor: 'purple.700' }}
          onClick={() => onNavigate(Navigate.NEXT)} />
      </ButtonGroup>

      <Text fontWeight='bold'>{label}</Text>

      <ViewControl value={view}>
        <ViewButton value={Views.MONTH} onClick={() => onView(Views.MONTH)}>{messages.month}</ViewButton>
        <ViewButton value={Views.WEEK} onClick={() => onView(Views.WEEK)}>{messages.week}</ViewButton>
        <ViewButton value={Views.DAY} onClick={() => onView(Views.DAY)}>{messages.day}</ViewButton>
        <ViewButton value={Views.AGENDA} onClick={() => onView(Views.AGENDA)}>{messages.agenda}</ViewButton>
      </ViewControl>
    </HStack>
  )
}

const Event = (event) => {
  return (
    <Popover placement='auto'>
      <PopoverTrigger>
        <Box>{event.title}</Box>
      </PopoverTrigger>
      <PopoverContent w='fit-content'>
        <PopoverArrow />
        <PopoverBody shadow='md'>
          <VStack color='black' align='start'>
            <Heading color='purple.700' pl='20px'>{event.title}</Heading>
            <HStack justifyItems='center'>
              <Icon as={BsClock} />
              <Text>
                {`${moment(event.slotStart).format('DD/MM/YYYY')} a ${moment(event.slotEnd).format('DD/MM/YYYY')}`}
              </Text>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const Events = ({ localizer = mlocalizer, showDemoLink = true, ...props }) => {

  const { authProvider } = useAzureAuth()
  const { components, defaultDate, max, views } = useMemo(() => ({
    components: {
      event: Event,
      timeSlotWrapper: ColoredDateCellWrapper,
      toolbar: Toolbar
    },
    defaultDate: new Date(),
    max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')
  }), [])

  const { loading, error, events } = useGetEvents(authProvider, 'UTC')
  return (
    <Center boxSize="full" py="20px">
      <Box boxSize="full" shadow="md" bg="white" borderRadius="10px" p={2}>
      {
          loading ?
            <Text>cargando eventos...</Text> :
            <Calendar
              culture='es'
              components={components}
              defaultDate={defaultDate}
              events={events}
              localizer={localizer}
              max={max}
              showMultiDayTimes
              step={60}
              views={views}
              messages={{
                month: 'mes',
                week: 'semana',
                day: 'dia',
                agenda: 'agenda',
                today: 'hoy'
              }}
            />
        }
      </Box>
    </Center>
  )
}

Events.prototype = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}

export default Events