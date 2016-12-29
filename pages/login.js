import React from "react"
import styled from "styled-components"

import Head from "./common/head"
import LoginForm from "./common/components/LoginForm"

const Wrapper = styled.div`
  background: green;
`

export default () =>
  <Wrapper>
    <Head title="Login into CMIS" />
    <LoginForm />
  </Wrapper>
