import React, { useMemo, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
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

const mlocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) =>
  cloneElement(Children.only(children), {
    style: {
      backgroundColor: 'lightblue'
    }
  })

const Events = ({ localizer = mlocalizer, showDemoLink = true, ...props }) => {


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
      <Box boxSize="full" shadow="2xl" bg="white" borderRadius="10px" p={2}>
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

Events.prototype = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}

export default Events