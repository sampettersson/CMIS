import React from "react"

import { dispatch } from "../../../event"

import putPage from "../../../put/pages"

export default class extends React.Component {
  onClick = () => {
    const page = this.props.page
    const lastVersion = page.versions.length && page.versions[0]

    page.versions.unshift({
      published: new Date(),
      components: lastVersion ? lastVersion.components : []
    })

    putPage(page).then(page => dispatch("PageVersionCreated"))
  }

  render() {
    return (
      <button onClick={this.onClick}>Create new version</button>
    )
  }
}
