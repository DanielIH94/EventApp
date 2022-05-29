const msalConfig = {
  auth: {
    clientId: 'dc7f2322-ca6f-4e0a-9e1f-edc90d36a357',
    authority: 'https://login.microsoftonline.com/462fd399-df24-4064-8796-79d110098488/',
    redirectUri: 'https://localhost:44406/login',
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
}

export const loginRequest = {
  scopes: [
    'User.Read',
    // 'mailboxsettings.read',
    // 'calendars.readwrite',
  ],
  prompt: 'select_account'
}

export const tokenRequest = {
  scopes: [
    'api://fff7e69e-3f94-4aaa-a265-7ee8b9469303/api_access',
    // 'user.read'
  ],
  forceRefresh: false
}

export default msalConfig