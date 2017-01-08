import React from "react"
import styled from "styled-components"

import { dispatch } from "../../../event"

const ListItem = styled.li`
  backgroundColor: ${props => props.selected && "red"}
`

export default props =>
  <ul>
    {props.page.versions.map(version =>
      <ListItem
        selected={version._id === props.version._id}
        key={version._id}>
        <button onClick={() => { dispatch("ChangeVersion", version._id) }}>
          {version.created}
        </button>
      </ListItem>
    )}
  </ul>
