import Mongoose, { Schema } from "mongoose"

Mongoose.connect("mongodb://localhost/cmis")

export const updateModelInstance = (updatedObject, target) => {
  delete updatedObject.__v

  Object
  .keys(updatedObject)
  .forEach(key => {
    target[key] = updatedObject[key]
  })

  return target
}

export const toModelInstance = model => obj => {
  const Model = Mongoose.model(model)

  if (obj._id) {
    // there is surely a better solution for this :(
    Model.findOne({ _id: obj._id }).then(foundObj => {
      Object
      .keys(obj)
      .forEach(key => {
        foundObj[key] = obj[key]
      })

      foundObj.save()
    })

    return obj
  }

  const modelInstance = new Model(obj)
  modelInstance.save()
  return modelInstance
}

class Db {
  User = Mongoose.model("User", {
    username: {
      type: String,
      required: true,
      minlength: 1
    },
    password: {
      type: String,
      required: true,
      minlength: 1
    }
  })

  Page = Mongoose.model("Page", {
    name: {
      type: String,
      required: true,
      minlength: 1
    },
    url: {
      type: String,
      required: true,
      minlength: 1,
      validate: {
        validator: value => value.substring(0, 1) === "/",
        message: "url need's to be a valid url"
      }
    },
    versions: [{
      type: Schema.Types.ObjectId,
      set: toModelInstance("PageVersion")
    }],
    currentVersion: Schema.Types.ObjectId
  })

  PageVersion = Mongoose.model("PageVersion", {
    published: Boolean,
    created: { type: Date, default: Date.now },
    components: [{
      type: Schema.Types.ObjectId,
      set: toModelInstance("Component")
    }]
  })

  Component = Mongoose.model("Component", {
    name: String,
    metadata: [Schema.Types.ObjectId]
  })

  ComponentMetadata = Mongoose.model("ComponentMetadata", {
    name: String,
    value: String
  })
}

export default new Db()
