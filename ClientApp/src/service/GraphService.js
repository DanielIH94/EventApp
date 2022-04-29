import { Client } from '@microsoft/microsoft-graph-client';

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