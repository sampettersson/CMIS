import React from "react"
import styled from "styled-components"
import { parse } from "url"

import Head from "./common/head"
import PageEditor from "./common/components/PageEditor/index"
import components from "./components"

import { fetchPage } from "./common/fetch/pages"

export default class extends React.Component {
  state = {
    version: null
  }

  static async getInitialProps({ req, query }) {
    let pathname = ""

    if (req) {
      pathname = parse(req.url, true).pathname
    } else {
      pathname = window.location.pathname
    }

    const page = await fetchPage(pathname)

    return { page: page, query: query }
  }

  componentWillMount() {
    this.state.version = this.props.page.versions.filter(
      version => version._id == this.props.query.version
    )[0]
  }

  render() {
    return (
      <div>
        <Head title={this.props.page.name} />
        <PageEditor page={this.props.page} />

        {this.state.version && this.state.version.components.map((component, index) => {
          const _componentToRender = components[component.name]
          return <_componentToRender key={index} />
        })}

        <div>
          Website running on <a href="https://github.com/sampettersson/CMIS">CMIS</a>.
        </div>
      </div>
    )
  }
}
