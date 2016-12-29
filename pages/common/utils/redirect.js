// TODO fix when next is fixed
import Router from "next/dist/lib/router"

import { fetchServerState } from "../state"

export default target => {
  const { res } = fetchServerState()

  if (res) {
    return res.redirect(target)
  } else {
    return Router.push(target)
  }
}
