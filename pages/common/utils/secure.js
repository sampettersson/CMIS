import React, { Component } from "react"

import {
  fetchState,
  fetchServerState,
  insert,
  waitForUsers } from "../state"
import redirect from "./redirect"

export default function secure(SecuredComponent, awaitables) {
  return class Secure extends Component {
    static async getInitialProps({ req, res }) {
      const state = fetchState()
      const serverState = fetchServerState()

      if (req && res) {
        insert(serverState, "req", req)
        insert(serverState, "res", res)
      }

      await awaitables.forEach(async awaitable => {
        await awaitable()
      })

      await waitForUsers()

      if (!state.users.length) {
        return redirect("/login")
      }

      return { state }
    }

    render() {
      return (
        <SecuredComponent {...this.props.state} />
      )
    }
  }
}
