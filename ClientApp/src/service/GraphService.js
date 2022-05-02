import { Client } from '@microsoft/microsoft-graph-client';
import { startOfWeek, endOfWeek } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

let graphClient = undefined

const ensureClient = (authProvider) => {
    if (!graphClient) {
        graphClient = Client.initWithMiddleware({
            authProvider
        })
    }

    return graphClient
}

export const getUser = async (authProvider) => {
    ensureClient(authProvider)

    const user = await graphClient
        .api('/me')
        .select('displayName,mail,mailboxSettings,userPrincipalName')
        .get()

    return user
}

export const getUSerWeekCalendar = async (authProvider, timeZone) => {
    ensureClient(authProvider)

    const now = new Date()
    const startDateTime = zonedTimeToUtc(startOfWeek(now), timeZone).toISOString()
    const endDateTime = zonedTimeToUtc(endOfWeek(now), timeZone).toISOString()

    var response = await graphClient
        .api('me/calendarview')
        .header('Prefer', `outlook.timezone="${timeZone}"`)
        .query({ startDateTime, endDateTime })
        .select('subject,organizer,start,end')
        .orderby('start/dateTime')
        .top(25)
        .get()

    if(response["@odata.nextLink"]){
        var events = []

        var options = {
            headers: {'Prefer':`outlook.timezone="${timeZone}"`}
        }
    }
}