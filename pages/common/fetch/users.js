import fetch from "isomorphic-fetch"
import config from "../../../config"

export default () => fetch(`${config.api}/api/users`, {
  credentials: "include"
}).then(response => response.json())
