import Express from "express"
import BodyParser from "body-parser"
import Cors from "cors"
import Session from "express-session"
import Next from "next"
import HttpProxy from "http-proxy"

import { parse } from "url"

import Secure from "./secure"
import Users from "./users"
import Auth from "./auth"
import Pages from "./pages"
import Components from "./components"

import Config from "../config.server"

const app = Express()
const proxy = HttpProxy.createProxyServer({ target: Config.next })

const next = Next("../", { dev: true })
const nextHandle = next.getRequestHandler()

app.use(BodyParser.json())
app.use(Cors())
app.use(Session(Config.session))

app.get("/test", (req, res) => {
  res.json(req.session)
})

app.get("/api/users", Users.get)
app.post("/api/users", Users.post)

app.post("/api/auth", Auth.post)

app.get("/api/pages", Pages.get)
app.post("/api/pages", Pages.post)
app.delete("/api/pages", Secure(Pages.delete))

app.post("/api/components", Components.post)

app.all("/__webpack_hmr", (req, res) => proxy.web(req, res))

app.get("*", (req, res) => {
  const { pathname, query } = parse(req.url, true)
  nextHandle(req, res)
})

app.listen(3001)
