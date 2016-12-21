import Db from "./db"

class Pages {
  get(req, res) {
    Db.Page.find().then(pages => res.json(pages))
  }

  post(req, res) {
    Db.Page(req.body)
    .save()
    .then(page => res.json(page))
    .catch(error => res.json(error, 400))
  }

  delete(req, res) {
    Db.Page
    .remove({ _id: req.body._id })
    .then(result => res.json(result))
    .catch(error => res.json(error, 400))
  }
}

export default new Pages()
