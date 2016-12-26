import React from "react"
import styled from "styled-components"

import Head from "./common/head"
import NewUser from "./common/components/NewUser"

const Wrapper = styled.div`
  background: red;
`

export default class extends React.Component {
  render() {
    return (
      <Wrapper>
        <Head title="CMIS - Users" />
        <NewUser />
      </Wrapper>
    )
  }
}
