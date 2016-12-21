import bcrypt from "bcrypt-nodejs"

import Db from "./db"

const hashUserPassword = function (next) {
  if (!isNaN(bcrypt.getRounds(this.password))) {
    return next()
  }

  bcrypt.hash(this.password, null, null, (error, hash) => {
    this.password = hash
    next()
  })
}

const checkUserUniqueNess = function (next) {
  Db.User.find({ username: this.username }).then(users => {
    users.length && next(new Error("Username not unique"))
    !users.length && next()
  })
}

Db.User.schema.pre("save", checkUserUniqueNess)
Db.User.schema.pre("save", hashUserPassword)
Db.User.schema.pre("update", hashUserPassword)

Db.User.schema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password
    return ret
  }
})

class Users {
  get(req, res) {
    const user = req.session.user
    const userId = user && user._id
    Db.User.find({ _id: userId }).then(users => res.json(users))
  }

  post(req, res) {
    Db.User(req.body)
    .save()
    .then(user => res.json(user))
    .catch(error => res.json(error, 400))
  }
}

export default new Users()
