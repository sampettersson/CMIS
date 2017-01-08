import React from "react"
import styled from "styled-components"

import NewVersion from "./components/NewVersion"
import VersionList from "./components/VersionList"
import ComponentsList from "./components/ComponentsList"
import NewComponent from "./components/NewComponent"

const Wrapper = styled.div`
  background: white;
  position: absolute;
  padding: 20px;
  right: 0;
`

export default props =>
  <Wrapper>
    <p>Versions:</p>
    <VersionList page={props.page} version={props.version} />
    <NewVersion page={props.page} />

    <p>Components:</p>
    <ComponentsList version={props.version} />
    <NewComponent page={props.page} version={props.version} />
  </Wrapper>
