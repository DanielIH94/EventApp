import React, { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer
} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from '../../configs/events'
import * as dates from '../../configs/dates'

const ColoredDateCellWrapper = ({ children }) => {
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue'
    }
  })
}

const Events = () => {

  const localizer = momentLocalizer(moment)

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }), [])

  return (
    <Box py="20px" w="90%">
      <Box boxSize="full" shadow="2xl" bg="white" borderRadius="10px">
        <Calendar
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

export default Events