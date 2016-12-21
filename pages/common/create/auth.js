import fetch from "isomorphic-fetch"
import config from "../../../config"

export default user => fetch(`${config.api}/api/auth`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
}).then(response => response.json())
