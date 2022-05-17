import { useEffect, useState } from "react"
import { useGraph } from "../context/GraphContextProvider"

const useGetEvents = (authProvider, timeZone) => {
    const { getUserMonthCalendar } = useGraph()
    const [eventsState, setEventsState] = useState({
        loading: true,
        error: undefined,
        events: undefined
    })

    useEffect(() => {
        (async () => {
            try {
                const graphEvents = await getUserMonthCalendar(authProvider, timeZone)
                const events = graphEvents.map(event => {
                    const currentStart = new Date(event.start.dateTime + "Z")
                    const start = new Date(currentStart.getTime() + currentStart.getTimezoneOffset() * 60000)

                    const currentEnd = new Date(event.end.dateTime + "Z")
                    const end = new Date(currentEnd.getTime() + currentEnd.getTimezoneOffset() * 60000)

                    const dataEvent = {
                        id: event.id,
                        title: event.subject,
                        start,
                        end
                    }

                    return dataEvent
                })
                setEventsState({ loading: false, events })
            } catch (error) {
                setEventsState({ loading: false, error })
            }
        })()
    }, [getUserMonthCalendar])

    return eventsState
}

export default useGetEvents