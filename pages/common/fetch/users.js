import fetch from "isomorphic-fetch"
import config from "../../../config"

import { getFetchOptions } from "../utils/fetch"

export default () => fetch(`${config.api}/api/users`, getFetchOptions("GET")).then(response => response.json())
