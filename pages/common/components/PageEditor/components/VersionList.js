import React from "react"

import { dispatch } from "../../../event"

export default props =>
  <ul>
    {props.page.versions.map(version =>
      <li key={version._id} style={{ backgroundColor: props.version._id === version._id && "red" }}>
        <button onClick={() => { dispatch("ChangeVersion", version._id) }}>
          {version.created}
        </button>
      </li>
    )}
  </ul>
