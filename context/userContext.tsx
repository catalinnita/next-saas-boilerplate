import React, { useState } from "react"
import Stripe from "stripe";
import { auth0Token, auth0User, updateUserById } from "../utils/auth0";

type userStatusType = "FREE" | "PREMIUM" | "NEW"

type userContextType = {
  token: auth0Token
  user: auth0User
  userStatus?: userStatusType
  updateUserStatus?: (status: string) => void
  setUser?: (userDetails: auth0User) => void
  hadTrial: boolean
}

type userContextProvider = {
  pageProps: Record<string, any>
}

export const UserContext = React.createContext({} as userContextType);

export const UserContextProvider: React.FC<userContextProvider> = ({ pageProps, children }) => {
  const { token, user } = pageProps
  const defaultUserStatus = user?.user_metadata?.userStatus || "NEW"

  const [userStatus, setUserStatus] = useState(defaultUserStatus as userStatusType)

  const updateUserStatus = (newStatus: userStatusType): void => {
    updateUserById(token, user.user_id, {
      user_metadata: {
        userStatus: newStatus
      }
    }).then(() => {
      setUserStatus(newStatus)
    })
  }

  const setUser = async (userDetails: auth0User): Promise<Response> => {
    return await updateUserById(token, user.user_id, {
      ...userDetails
    })
  }

  const hadTrial = true

  return (
    <UserContext.Provider value={{
      token,
      user,
      userStatus,
      updateUserStatus,
      setUser,
      hadTrial,
    }}>
      {children}
    </UserContext.Provider>
  )
}
