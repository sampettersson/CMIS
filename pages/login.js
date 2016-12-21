import React from "react"
import styled from "styled-components"

import Head from "./common/head"
import LoginForm from "./common/components/LoginForm"

const Wrapper = styled.div`
  background: red;
`

export default class extends React.Component {
  render() {
    return (
      <Wrapper>
        <Head title="Login into CMIS" />
        <LoginForm />
      </Wrapper>
    )
  }
}
