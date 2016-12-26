import MongoStore from "connect-mongo"
import Session from "express-session"

const mongoStore = MongoStore(Session)

export default {
  api: "http://localhost:3001",
  next: "http://localhost:3000",
  session: {
    secret: "CMIS",
    name: "CMIS.token",
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      httpOnly: false,
    },
    store: new mongoStore({
      url: "mongodb://localhost:27017/cmis"
    })
  }
}
