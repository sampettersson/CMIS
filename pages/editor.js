import React from "react"
import styled from "styled-components"

import Head from "./common/head"
import Secure from "./common/utils/secure"

import PageList from "./common/components/PageList"
import NewPage from "./common/components/NewPage"

import { waitForPages } from "./common/state"

const Wrapper = styled.div`
  background: red;
`
const Editor = props =>
  <Wrapper>
    <Head title="Welcome" />
    <PageList initialPages={props.pages} />
    <NewPage />
  </Wrapper>

export default Secure(Editor, [waitForPages])
