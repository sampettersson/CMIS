import React from "react"
import styled from "styled-components"
// TODO fix when next is fixed
import Router from "next/dist/lib/router"

import Head from "./common/head"
import { fetchState, waitForPages, waitForUsers } from "./common/state"

import PageList from "./common/components/PageList"
import NewPage from "./common/components/NewPage"

const Wrapper = styled.div`
  background: red;
`

export default class extends React.Component {
  static async getInitialProps({ res }) {
    await waitForPages()
    await waitForUsers()

    if (!fetchState().users.length) {
      if (res) {
        res.redirect("/login")
      } else {
        Router.push("/login")
      }
    }

    return { pages: fetchState().pages }
  }

  render() {
    return (
      <Wrapper>
        <Head title="Welcome" />
        <PageList initialPages={this.props.pages} />
        <NewPage />
      </Wrapper>
    )
  }
}
