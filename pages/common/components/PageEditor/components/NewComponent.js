import React from "react"
import styled from "styled-components"

import { dispatch } from "../../../event"

import putPage from "../../../put/pages"

import components from "../../../../components"

const Select = styled.select`
  display: block;
`

export default class extends React.Component {
  state = {
    value: Object.keys(components)[0]
  }

  onClick = () => {
    const page = this.props.page
    const currentVersion = this.props.version

    currentVersion.components.push({
      name: this.state.value,
      metadata: []
    })

    putPage(page).then(() => dispatch("PageVersionUpdated"))
  }

  onChange = event => this.setState({ value: event.target.value })

  render() {
    return (
      <div>
        <Select value={this.state.value} onChange={this.onChange}>
          {Object.keys(components).map(component =>
            <option key={component}>{component}</option>
          )}
        </Select>
        <button onClick={this.onClick}>Add new component</button>
      </div>
    )
  }
}
