import fetchPages from "./fetch/pages"
import fetchUsers from "./fetch/users"

const state = {
  pages: [],
  users: []
}

export const fetchState = () => state
export const waitForPages = async () => await fetchPages().then(pages => state.pages = pages)
export const waitForUsers = async () => await fetchUsers().then(users => state.users = users)
