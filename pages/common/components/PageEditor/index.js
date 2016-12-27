import React from "react"

import { attach } from "../../event"
import { fetchPage } from "../../fetch/pages"

import NewVersion from "./components/NewVersion"
import VersionList from "./components/VersionList"

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
      <div>
        <p>Versions:</p>
        <VersionList page={this.state.page} />
        <NewVersion page={this.state.page} />
      </div>
    )
  }
}
