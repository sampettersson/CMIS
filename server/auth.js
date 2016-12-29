import bcrypt from "bcrypt-nodejs"

import Db from "./db"

class Auth {
  post = (req, res) => {
    const onSuccess = user => {
      req.session.user = user.toJSON()
      res.json(user.toJSON())
    }

    Db.User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
        return res.json("Username not found", 400)
      }

      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (same) {
          onSuccess(user)
        } else {
          res.json("Password didn't match", 401)
        }
      })
    })
  }
}

export default new Auth()
