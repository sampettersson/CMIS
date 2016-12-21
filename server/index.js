import Express from "express"
import BodyParser from "body-parser"
import Cors from "cors"
import Session from "express-session"
import Next from "next"

import { parse } from "url"

import Secure from "./secure"
import Users from "./users"
import Auth from "./auth"
import Pages from "./pages"
import Components from "./components"

const app = Express()
const next = Next("../", { dev: true, staticMarkup: true })
const nextHandle = next.getRequestHandler()

app.use(BodyParser.json())
app.use(Cors())
app.use(Session({
  secret: "CMIS",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000,
  }
}))

app.get("/api/users", Users.get)
app.post("/api/users", Users.post)

app.post("/api/auth", Auth.post)

app.get("/api/pages", Pages.get)
app.post("/api/pages", Pages.post)
app.delete("/api/pages", Secure(Pages.delete))

app.post("/api/components", Components.post)

app.get("*", (req, res) => {
  const { pathname, query } = parse(req.url, true)
  nextHandle(req, res)
})

app.listen(3001)
