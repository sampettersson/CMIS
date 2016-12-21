import React from "react"
import deletePage from "../delete/pages"
import { dispatch } from "../event"

const onClick = props =>
  () => deletePage(props.page).then(() => dispatch("PageDeleted"))

export default props =>
  <span>
    <button onClick={onClick(props)}>Delete</button>
  </span>
