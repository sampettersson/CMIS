import React from "react"
import { parse } from "url"

import Head from "./common/head"
import PageEditor from "./common/components/PageEditor/index"
import components from "./components"

import { fetchPage } from "./common/fetch/pages"

import { attach } from "./common/event"

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    let pathname = ""

    if (req) {
      pathname = parse(req.url, true).pathname
    } else {
      pathname = window.location.pathname
    }

    const page = await fetchPage(pathname)

    return { page, query }
  }

  state = {
    version: null
  }

  componentWillMount() {
    this.setState({ version: this.getVersion(this.props.query.version) })
  }

  componentDidMount() {
    attach("ChangeVersion", this.changeVersion)
  }

  getVersion = targetId =>
    this.props.page.versions.filter(
      version => version._id === targetId
    )[0]

  changeVersion = versionId =>
    this.setState({ version: this.getVersion(versionId) })

  render() {
    return (
      <div>
        <Head title={this.props.page.name} />
        <PageEditor page={this.props.page} />

        {this.state.version && this.state.version.components.map((component, index) => {
          const componentToRender = components[component.name]
          return <componentToRender key={index} />
        })}

        <div>
          Website running on <a href="https://github.com/sampettersson/CMIS">CMIS</a>.
        </div>
      </div>
    )
  }
}
