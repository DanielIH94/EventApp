import {
  EventType, PublicClientApplication
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { ChakraProvider } from "@chakra-ui/react";
import { css, Global } from '@emotion/react';
import 'bootstrap/dist/css/bootstrap.css';
import "focus-visible/dist/focus-visible";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import App from './components/App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { Global, css } from '@emotion/react'
import { ChakraProvider } from "@chakra-ui/react"
import Login from './components/Login';
import Home from './components/Home/Home';
import Events from './components/Events/Events';

import "focus-visible/dist/focus-visible"

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
=======

import App from './App';
import Home from './components/Home/Home';
import Login from './components/Login';
import msalConfig from './configs/msalConfig';
import AzureAuthContextProvider from './context/AzureAuthContextProvider';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
>>>>>>> 7f4fda7aee230e42648e44270964c50891dd53ef

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

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

ReactDOM.render(
<<<<<<< HEAD
  <ChakraProvider>
    <Global styles={GlobalStyles} />
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='events' element={<Events/>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<div>error 404 :c</div>}/>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>,
=======
  <MsalProvider instance={msalInstance}>
    <AzureAuthContextProvider>
      <ChakraProvider>
        <Global styles={GlobalStyles} />
        <BrowserRouter basename={baseUrl}>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Home />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<div>error 404 :c</div>} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AzureAuthContextProvider>
  </MsalProvider>,
>>>>>>> 7f4fda7aee230e42648e44270964c50891dd53ef
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
