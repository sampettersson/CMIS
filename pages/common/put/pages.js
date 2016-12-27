import fetch from "isomorphic-fetch"
import config from "../../../config"

import { getFetchOptions } from "../utils/fetch"

export default page => fetch(`${config.api}/api/pages`, getFetchOptions("PUT", page)).then(response => response.json())
