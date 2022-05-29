import React from 'react';

import {
  EventType, PublicClientApplication
} from '@azure/msal-browser';

import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import App from './components/App/App';
import Login from './components/Login';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Profile from './components/Profile/Profile';

import { css, Global } from '@emotion/react';
import { ChakraProvider } from "@chakra-ui/react";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import AzureAuthContextProvider from './context/AzureAuthContextProvider';
import ApolloConnection from './context/ApolloConnection';

import msalConfig from './configs/msalConfig';

import "focus-visible/dist/focus-visible"
import "./index.css"

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

const msalInstance = new PublicClientApplication(msalConfig)

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


ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <AzureAuthContextProvider>
      <ApolloConnection>
        <ChakraProvider>
          <Global styles={GlobalStyles} />
          <BrowserRouter basename={baseUrl}>
            <Routes>
              <Route path='*' element={<div>error 404 :c</div>} />

              <Route path='/' element={
                <>
                  <UnauthenticatedTemplate>
                    <Navigate to="/login" />
                  </UnauthenticatedTemplate>
                  <AuthenticatedTemplate>
                    <App />
                  </AuthenticatedTemplate>
                </>
              }>
                <Route index element={<Home />} />
                <Route path='events' element={<Events />} />
                <Route path='profile' element={<Profile />} />
              </Route>

              <Route path='login' element={
                <>
                  <UnauthenticatedTemplate>
                    <Login />
                  </UnauthenticatedTemplate>
                  <AuthenticatedTemplate>
                    <Navigate to="/" />
                  </AuthenticatedTemplate>
                </>
              } />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ApolloConnection>
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
