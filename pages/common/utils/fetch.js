import { fetchServerState } from "../state"

const getHeaders = () => {
  const { req } = fetchServerState()

  return {
    Cookie: req && req.headers.cookie,
    "Content-Type": "application/json"
  }
}

export const getFetchOptions = (method: "GET", body) => ({
  method,
  credentials: "include",
  headers: getHeaders(),
  body: body && JSON.stringify(body)
})
