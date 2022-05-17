import React from 'react';

import {
  EventType, PublicClientApplication
} from '@azure/msal-browser';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import App from './components/App/App';
import Login from './components/Login';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Profile from './components/Profile/Profile';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split
} from "@apollo/client"
//import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { WebSocketLink } from '@apollo/client/link/ws'
//import { createClient } from "graphql-ws"
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { css, Global } from '@emotion/react';
import { ChakraProvider } from "@chakra-ui/react";
import { MsalProvider } from '@azure/msal-react';
import AzureAuthContextProvider from './context/AzureAuthContextProvider';

import msalConfig from './configs/msalConfig';

import "focus-visible/dist/focus-visible"
import GraphContextProvider from './context/GraphContextProvider';
import "./index.css"

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: msalConfig.appId,
    redirectUri: msalConfig.redirectUri
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true
  }
})

const accounts = msalInstance.getAllAccounts()
if (accounts && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const authResult = event.payload
    msalInstance.setActiveAccount(authResult.account)
  }
})

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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <AzureAuthContextProvider>
      <GraphContextProvider>
        <ChakraProvider>
          <SmoothScrollProvider>
            <Global styles={GlobalStyles} />
            <BrowserRouter basename={baseUrl}>
              <Routes>
                <Route path='/' element={<App />}>
                  <Route index element={<Home />} />
                  <Route path='events' element={<Events />} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='*' element={<div>error 404 :c</div>} />
              </Routes>
            </BrowserRouter>
          </SmoothScrollProvider>
        </ChakraProvider>
      </GraphContextProvider>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Global styles={GlobalStyles} />
          <BrowserRouter basename={baseUrl}>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<Home />} />
                <Route path='events' element={<Events />} />
                <Route path='profile' element={<Profile />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='*' element={<div>error 404 :c</div>} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ApolloProvider>
    </AzureAuthContextProvider>
  </MsalProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
