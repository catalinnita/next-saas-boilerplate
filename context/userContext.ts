import React from "react"

type userContextType = {
  token: string
  user: Record<string, any>
}

export const UserContext = React.createContext({} as userContextType);
