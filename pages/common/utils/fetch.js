import { fetchState } from "../state"

export const getFetchOptions = () => ({
  credentials: "include",
  headers: {
    "Cookie": fetchState().cookies
  }
})
