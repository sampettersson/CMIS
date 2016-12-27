// TODO fix when next is fixed
import Router from "next/dist/lib/router"

export default (target) => {
  const { res } = fetchState()

  if (res) {
    return res.redirect(target)
  } else {
    return Router.push(target)
  }
}
