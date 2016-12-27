import fetchPages from "./fetch/pages"
import fetchUsers from "./fetch/users"

const state = {
  pages: [],
  users: []
}

const serverState = {
  req: null,
  res: null
}

export const fetchState = () => state
export const fetchServerState = () => serverState

export const insert = (state, key, value) => {
  state[key] = value
}

export const waitForPages = async () => await fetchPages().then(pages => state.pages = pages)
export const waitForUsers = async () => await fetchUsers().then(users => state.users = users)
