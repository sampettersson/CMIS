import React from "react"
import styled from "styled-components"

import { dispatch } from "../event"
import createUser from "../create/users"

const Form = styled.form`
  padding: 10px;
`

export default class extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleSubmit = event => {
    event.preventDefault()

    createUser({
      username: this.state.username,
      password: this.state.password
    }).then(() => dispatch("UserCreated"))

    this.setState({ username: "", password: "" })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            name="name"
            placeholder="Username"
            type="text" />

          <input
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            name="password"
            placeholder="Password"
            type="text" />
          <button>Create User</button>
        </Form>
      </div>
    )
  }
}
