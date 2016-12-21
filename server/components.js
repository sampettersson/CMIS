import Db from "./db"

class Components {
  post(req, res) {
    Db.Component({
      name: req.body.name,
      metadata: []
    }).save().then(component => res.json(component))
  }
}

export default new Components()
