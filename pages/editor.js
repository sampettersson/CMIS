import React from "react"
import styled from "styled-components"

import Head from "./common/head"
import Secure from "./common/utils/secure"

import PageList from "./common/components/PageList"
import NewPage from "./common/components/NewPage"

const Wrapper = styled.div`
  background: red;
`
class Editor extends React.Component {
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

export default Secure(Editor)
