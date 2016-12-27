import fetch from "isomorphic-fetch"
import config from "../../../config"

export default () => fetch("http://localhost:3001/api/pages").then(response => response.json())
export const fetchPage = (url) => fetch(`${config.api}/api/pages?url=${url}`).then(response => response.json())
