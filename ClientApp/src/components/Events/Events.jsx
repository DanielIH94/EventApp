import React, {
  useMemo, cloneElement, Children, useState, isValidElement
} from 'react'
import PropTypes from 'prop-types'
import { Box, Button, ButtonGroup, HStack, Icon, IconButton, Text } from '@chakra-ui/react'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
  Navigate
} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from '../../configs/events'
import * as dates from '../../configs/dates'
import './style.css'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const mlocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) => {
  return (
    cloneElement(Children.only(children), {
      style: {
        backgroundColor: 'lightblue'
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
        <Button
          bg='purple.500'
          color='white'
          _hover={{ backgroundColor: 'purple.700' }}
          onClick={() => onNavigate(Navigate.TODAY)}>{messages.today}
        </Button>
      </ButtonGroup>

      <Text className="rbc-toolbar-label">{label}</Text>

      <ViewControl value={view}>
        <ViewButton value={Views.MONTH} onClick={() => onView(Views.MONTH)}>{messages.month}</ViewButton>
        <ViewButton value={Views.WEEK} onClick={() => onView(Views.WEEK)}>{messages.week}</ViewButton>
        <ViewButton value={Views.DAY} onClick={() => onView(Views.DAY)}>{messages.day}</ViewButton>
        <ViewButton value={Views.AGENDA} onClick={() => onView(Views.AGENDA)}>{messages.agenda}</ViewButton>
      </ViewControl>
    </HStack>
  )
}

const Events = ({ localizer = mlocalizer, showDemoLink = true, ...props }) => {

  const { components, defaultDate, max, views } = useMemo(() => ({
    components: {
      timeSlotWrapper: ColoredDateCellWrapper,
      toolbar: Toolbar
    },
    defaultDate: new Date(),
    max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')
  }), [])

  return (
    <Box py="20px" w="90%">
      <Box boxSize="full" shadow="2xl" bg="white" borderRadius="10px" p={2}>
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
        />
      </Box>
    </Box>
  )
}

Events.prototype = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}

export default Events