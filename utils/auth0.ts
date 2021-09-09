import { initAuth0 } from "@auth0/nextjs-auth0"
import { Url } from "url";

export const auth0 = initAuth0({
  authorizationParams: {
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: "openid profile",
    redirectUri: `${process.env.APP_DOMAIN}/api/account/callback`,
    postLogoutRedirectUri: `${process.env.APP_DOMAIN}/`,
  },
  baseURL: process.env.APP_DOMAIN,
  issuerBaseURL: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
  // The secret used to encrypt the cookie.
  secret: process.env.AUTH0_COOKIE_SECRET,
  session: {
    cookie: {
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
      sameSite: "lax",

    }
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    // cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    // cookieDomain: '192.168.10.101:3000',
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    // (Optional) Store the id_token in the session. Defaults to false.
    // storeIdToken: false,
    // (Optional) Store the access_token in the session. Defaults to false.
    // storeAccessToken: false,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    // storeRefreshToken: false
  },
  // oidcClient: {
  //   // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
  //   httpTimeout: 5000,
  //   // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
  //   clockTolerance: 10000
  // }
});

export interface auth0Token {
  "access_token": string,
  "refresh_token": string,
  "id_token": string,
  "token_type": string,
  "expires_in": number
}

// move them to /api !

export const getToken = async (): Promise<auth0Token> => {
  const url = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    })
  })

  return response.json()
}

export interface auth0User {
  "user_id": string,
  "blocked": boolean,
  "email_verified": boolean,
  "email": string,
  "phone_number": string,
  "phone_verified": boolean,
  "user_metadata": Record<string, any>,
  "app_metadata": Record<string, any>,
  "given_name": string,
  "family_name": string,
  "name": string,
  "nickname": string,
  "picture": Url,
  "verify_email": boolean,
  "verify_phone_number": boolean,
  "password": string,
  "connection": string,
  "client_id": string,
  "username": string,
}

export const getUser = async (userId: string, token: auth0Token, fields?: string[]): Promise<auth0User> => {
  const fieldsUrl = fields ? `?fields=${fields.join(",")}` : ""
  const url = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}${fieldsUrl}`
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token.access_token}`,
    },
  })

  return response.json()
}

export const updateUserById = async (token: auth0Token, userId: string, userData: Record<string,any>): Promise<Response> => {
  const url = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}`

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    const res = await response.json()
    if (res.statusCode && res.statusCode !== 200) {
      throw new Error(res.message);
    }
    return res
  } catch (err) {
    return Promise.reject(err)
  }
}
