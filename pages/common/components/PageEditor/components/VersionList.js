import React from "react"
import styled from "styled-components"

import { dispatch } from "../../../event"

import putPage from "../../../put/pages"

const ListItem = styled.li`
  backgroundColor: ${props => props.selected && "red"}
`

const unpublishAll = page =>
  page.versions.forEach(version => { version.published = false })

const publishVersion = props => version => {
  const page = props.page
  const nextState = !version.published

  unpublishAll(page)

  version.published = nextState

  putPage(page).then(() => dispatch("PageVersionUpdated"))
}

export default props =>
  <ul>
    {props.page.versions.map(version =>
      <ListItem
        selected={version._id === props.version._id}
        key={version._id}>
        <button onClick={() => { dispatch("ChangeVersion", version._id) }}>
          {version.created}
        </button>

        <button onClick={() => publishVersion(props)(version)}>
          {version.published ? "Unpublish" : "Publish" }
        </button>
      </ListItem>
    )}
  </ul>
