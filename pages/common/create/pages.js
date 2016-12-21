import fetch from "isomorphic-fetch"
import config from "../../../config"

export default page => fetch(`${config.api}/api/pages`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(page)
}).then(response => response.json())
