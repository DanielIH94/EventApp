import React, {
    useContext,
    createContext,
    useState,
    MouseEventHandler,
    useEffect
} from 'react'

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

import msalConfig from '../configs/msalConfig';

const AzureAuthContext = createContext({
    user: undefined,
    error: undefined,
    signIn: undefined,
    signOut: undefined,
    displayError: undefined,
    clearError: undefined,
    authProvider: undefined
})

const useProvideAzureAuthContext = () => {

    const msal = useMsal()

    const [user, setUser] = useState(undefined)
    const [error, setError] = useState(undefined)

    const displayError = (message, debug = '') => setError({ message, debug })
    const clearError = () => setError(undefined)

    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msal.instance, {
        account: msal.instance.getActiveAccount(),
        scopes: msalConfig.scopes,
        interactionType: InteractionType.Popup
    })

    const signIn = async () => {
        const result = await msal.instance.loginPopup({
            scopes: msalConfig.scopes,
            prompt: 'select_account'
        })

        displayError('Access token retrieved', result.accessToken)
    }

    const signOut = () => {

    }

    return {
        user,
        error,
        signIn,
        signOut,
        displayError,
        clearError,
        authProvider
    }
}


const AzureAuthContextProvider = ({ children }) => {
    const azureAuth = useProvideAzureAuthContext()
    return (
        <AzureAuthContext.Provider value={azureAuth}>
            {children}
        </AzureAuthContext.Provider>
    )
}

export const useAzureAuth = () => useContext(AzureAuthContext)
export default AzureAuthContextProvider