import React from "react"
import styled from "styled-components"
// TODO fix when next is fixed
import Router from "next/dist/lib/router"

import createAuth from "../create/auth"

const Form = styled.form`
  padding: 10px;
`

export default class extends React.Component {
  state = {
    error: false,
    username: "",
    password: ""
  }

  onSubmit = event => {
    event.preventDefault()

    createAuth({
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      if (typeof response.username !== "undefined") {
        return Router.push("/editor")
      }

      this.setState({ error: true })
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        {this.state.error && <span>ERROR!!!</span>}
        <input
          type="text"
          name="username"
          onChange={event => this.setState({ username: event.target.value })}
          placeholder="Username" />

        <input
          type="password"
          name="password"
          onChange={event => this.setState({ password: event.target.value })}
          placeholder="Password" />

        <button>Login</button>
      </Form>
    )
  }
}
