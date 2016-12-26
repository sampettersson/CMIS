import React, { Component } from "react"
// TODO fix when next is fixed
import Router from "next/dist/lib/router"

import { fetchState, waitForPages, waitForUsers } from "../state"
import { dispatch } from "../event"

export default function secure(Page) {
  return class Secure extends Component {
    static async getInitialProps({ req, res }) {
      if (req) {
        fetchState().cookies = req.headers.cookie
      }

      await waitForPages()
      await waitForUsers()

      if (!fetchState().users.length) {
        if (res) {
          return res.redirect("/login")
        } else {
          return Router.push("/login")
        }
      }

      return { pages: fetchState().pages }
    }

    render() {
      return (
        <Page {...this.props} />
      )
    }
  }
}
