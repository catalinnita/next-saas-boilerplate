import { useSelector } from "react-redux"
import { RootState } from "../state/store"

export const useStateSelector = (key: string) => {
  return useSelector((state: RootState) => state[key])
}
