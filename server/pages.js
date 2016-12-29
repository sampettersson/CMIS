import Db from "./db"

class Pages {
  get = (req, res) => {
    const url = req.query.url

    if (url) {
      Db.Page
      .findOne({ url: url })
      .populate({
        path: "versions",
        model: "PageVersion"
      })
      .then(pages => res.json(pages))
    } else {
      Db.Page
      .find()
      .populate("versions")
      .then(pages => res.json(pages))
    }
  }

  post = (req, res) => {
    Db.Page(req.body)
    .save()
    .then(page => res.json(page))
    .catch(error => res.json(error, 400))
  }

  put = (req, res) => {
    Db.Page
    .findOne({ _id: req.body._id })
    .then(page => {
      delete req.body.__v

      Object
      .keys(req.body)
      .forEach(key => { page[key] = req.body[key] })

      page
      .save()
      .then(result => res.json(result))
      .catch(error => res.json(error, 400))
    })
  }

  delete = (req, res) => {
    Db.Page
    .remove({ _id: req.body._id })
    .then(result => res.json(result))
    .catch(error => res.json(error, 400))
  }
}

export default new Pages()
