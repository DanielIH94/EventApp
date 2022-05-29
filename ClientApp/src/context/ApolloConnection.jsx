import { useEffect } from "react"

import { useMsal } from "@azure/msal-react"
import { InteractionRequiredAuthError } from "@azure/msal-browser"

import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { tokenRequest } from "../configs/msalConfig"

//import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
//import { createClient } from "graphql-ws"

const ApolloConnection = ({ children }) => {
  const { isLoggedIn, instance, inProgress, accounts } = useMsal()

  const getAccessToken = async () => {
    const account = accounts[0] ?? null
    const accessTokenRequest = {
      account,
      ...tokenRequest
    }

    if (account && inProgress === "none") {
      try {
        const { accessToken } = await instance.acquireTokenSilent(accessTokenRequest)

        return accessToken
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          return instance.acquireTokenPopup(tokenRequest)
        }
      }
    } else if (!account && inProgress === "none") {
      return instance.acquireTokenPopup(tokenRequest)
    }

    return null;
  }

  const httpLink = new HttpLink({
    uri: 'https://localhost:7255/graphql/'
  })

  // const wsLink = new GraphQLWsLink(createClient({
  //   url: 'wss://localhost:7255/graphql/'
  // }))

  const wsLink = new WebSocketLink(
    new SubscriptionClient('wss://localhost:7255/graphql/')
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  )

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken()

    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : null
      }
    }
  })

  const client = new ApolloClient({
    link: from([authLink, splitLink]),
    cache: new InMemoryCache()
  })

  useEffect(() => {
    if (!isLoggedIn) {
      (async () => {
        await client.resetStore()
      })()
    }
  }, [isLoggedIn])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloConnection