import { fetchServerState } from "../state"

const getHeaders = () => {
  const { req } = fetchServerState()

  return {
    "Cookie": req && req.headers.cookie
  }
}

export const getFetchOptions = () => ({
  credentials: "include",
  headers: getHeaders()
})
