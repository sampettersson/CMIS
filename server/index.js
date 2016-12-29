import Express from "express"
import BodyParser from "body-parser"
import Cors from "cors"
import Session from "express-session"
import Next from "next"
import HttpProxy from "http-proxy"

import { parse } from "url"

import Db from "./db"
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

app.get("/api/users", Users.get)
app.post("/api/users", Users.post)

app.post("/api/auth", Auth.post)

app.get("/api/pages", Pages.get)
app.post("/api/pages", Pages.post)
app.put("/api/pages", Secure(Pages.put))
app.delete("/api/pages", Secure(Pages.delete))

app.post("/api/components", Components.post)

app.all("/__webpack_hmr", (req, res) => proxy.web(req, res))

next.prepare().then(() => {
  app.get("*", (req, res) => {
    const { pathname, query } = parse(req.url, true)

    Db.Page.findOne({ url: pathname }).then(page => {
      if (page) {
        next.render(req, res, "/page", query)
      } else {
        nextHandle(req, res)
      }
    })
  })
})

app.listen(3001)
