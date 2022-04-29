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

import { getUser } from '../service/GraphService';

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

        const user = getUser(authProvider)

        setUser({
            displayName: user.displayName || '',
            email: user.mail || user.userPrincipalName || '',
            timeFormat: user.mailboxSettings?.timeFormat || '',
            timeZone: user.mailboxSettings?.timeZone || 'UTC'
        })

        displayError('Access token retrieved', result.accessToken)
    }

    const signOut = async () => {
        await msal.instance.logoutPopup()
        setUser(undefined)
    }

    useEffect(() => {
        const checkUser = async () => {
            if (!user) {
                try {
                    const account = msal.instance.getActiveAccount()
                    if (account) {
                        const user = await getUser(authProvider)

                        setUser({
                            displayName: user.displayName || '',
                            email: user.mail || user.userPrincipalName || '',
                            timeFormat: user.mailboxSettings?.timeFormat || 'h:mm a',
                            timeZone: user.mailboxSettings?.timeZone || 'UTC'
                        })
                    }
                } catch (err) {
                    displayError(err.message);
                }
            }
        }
        
        checkUser()
    })

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