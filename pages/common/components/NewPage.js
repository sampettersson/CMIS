import React from "react"
import styled from "styled-components"

import { dispatch } from "../event"
import createPage from "../create/pages"

const Form = styled.form`
  padding: 10px;
`

export default class extends React.Component {
  state = {
    name: "",
    url: ""
  }

  handleSubmit = event => {
    event.preventDefault()

    createPage({
      name: this.state.name,
      url: this.state.url
    }).then(() => dispatch("PageCreated"))

    this.setState({ name: "" })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <input
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            name="name"
            placeholder="Name"
            type="text" />

          <input
            value={this.state.url}
            onChange={event => this.setState({ url: event.target.value })}
            name="url"
            placeholder="Url"
            type="text" />
          <button>Create Page</button>
        </Form>
      </div>
    )
  }
}
