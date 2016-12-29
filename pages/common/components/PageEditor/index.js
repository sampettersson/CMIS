import React from "react"
import styled from "styled-components"

import { attach } from "../../event"
import { fetchPage } from "../../fetch/pages"

import NewVersion from "./components/NewVersion"
import VersionList from "./components/VersionList"

const Wrapper = styled.div`
  background: white;
  position: absolute;
  padding: 20px;
  right: 0;
`

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: this.props.page
    }
  }

  componentDidMount() {
    attach("PageVersionCreated", this.refreshPage)
  }

  refreshPage = async () => {
    const page = await fetchPage(this.state.page.url)
    this.setState({ page })
  }

  render() {
    return (
      <Wrapper>
        <p>Versions:</p>
        <VersionList page={this.state.page} />
        <NewVersion page={this.state.page} />
      </Wrapper>
    )
  }
}
