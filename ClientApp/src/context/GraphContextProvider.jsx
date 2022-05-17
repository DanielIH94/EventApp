import React, { useContext, useEffect, useState, createContext } from 'react'
import { Client, PageIterator } from '@microsoft/microsoft-graph-client';
import { startOfMonth, endOfMonth } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

const GraphContext = createContext({
    getUser: undefined,
    getUserMonthCalendar: undefined
})

let graphClient = undefined

const ensureClient = (authProvider) => {
    if (!graphClient) {
        graphClient = Client.initWithMiddleware({
            authProvider
        })
    }

    return graphClient
}

const GraphContextProvider = ({ children }) => {

    const getUser = async (authProvider) => {
        ensureClient(authProvider)

        const user = await graphClient
            .api('/me')
            .select('displayName,mail,mailboxSettings,userPrincipalName')
            .get()
        return user
    }

    const getUserMonthCalendar = async (authProvider, timeZone) => {
        ensureClient(authProvider)

        const now = new Date()
        const startDateTime = zonedTimeToUtc(startOfMonth(now), timeZone).toISOString()
        const endDateTime = zonedTimeToUtc(endOfMonth(now), timeZone).toISOString()

        var response = await graphClient
            .api('me/calendarview')
            .header('Prefer', `outlook.timezone="${timeZone}"`)
            .query({ startDateTime, endDateTime })
            .select('subject,organizer,start,end')
            .orderby('start/dateTime')
            .top(25)
            .get()

        if (response["@odata.nextLink"]) {
            var events = []

            var options = {
                headers: { 'Prefer': `outlook.timezone="${timeZone}"` }
            }

            var pageIterador = new PageIterator(graphClient, response, event => {
                events.push(event)
                return true
            }, options)

            await pageIterador.iterate()
        

            return events
        } else {
            return response.value
        }
    }

    const values = {
        getUser,
        getUserMonthCalendar
    }


    return (
        <GraphContext.Provider value={values}>
            {children}
        </GraphContext.Provider>
    )
}

export const useGraph = () => useContext(GraphContext)
export default GraphContextProvider