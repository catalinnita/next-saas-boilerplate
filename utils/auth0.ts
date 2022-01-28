import { Url } from "url";

export interface auth0Token {
  "access_token": string,
  "refresh_token": string,
  "id_token": string,
  "token_type": string,
  "expires_in": number
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
  const url = `https://${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}${fieldsUrl}`
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.access_token}`,
    },
  })

  return response.json()
}

export const updateUserById = async (token: auth0Token, userId: string, userData: Record<string,any>): Promise<Response> => {
  const url = `https://${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
