import React from "react"

import { dispatch } from "../../../event"

export default props =>
  <ul>
    {props.page.versions.map(version =>
      <li key={version._id}>
        <button onClick={() => { dispatch("ChangeVersion", version._id) }}>
          {version.created}
        </button>
      </li>
    )}
  </ul>
