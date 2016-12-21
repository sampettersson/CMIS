import Mongoose, { Schema } from "mongoose"
Mongoose.connect("mongodb://localhost/cmis")

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
        validator: (value) => value.substring(0, 1) === "/",
	      message: "url need's to be a valid url"
      }
    },
    versions: [Schema.Types.ObjectId],
    currentVersion: Schema.Types.ObjectId
  })

  PageVersion = Mongoose.model("PageVersion", {
    published: { type: Date, default: Date.now },
    components: [Schema.Types.ObjectId]
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
