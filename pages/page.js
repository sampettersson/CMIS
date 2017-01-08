import React from "react"
import { parse } from "url"

import Head from "./common/head"
import PageEditor from "./common/components/PageEditor/index"
import components from "./components"

import { fetchPage } from "./common/fetch/pages"
import fetchUsers from "./common/fetch/users"

import {
  fetchServerState,
  insert } from "./common/state"

import { attach } from "./common/event"

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const serverState = fetchServerState()

    let pathname = ""

    if (req) {
      pathname = parse(req.url, true).pathname
      insert(serverState, "req", req)
    } else {
      pathname = window.location.pathname
    }

    const page = await fetchPage(pathname)
    const users = await fetchUsers()

    return { page, query, isAuthenticated: users.length !== 0 }
  }

  constructor(props) {
    super(props)

    this.state = {
      page: this.props.page,
      version: null
    }
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      const version = this.getVersion(this.props.query.version) || this.props.page.versions[0]
      this.setState({ version })
    } else {
      this.setState({ version: this.getPublishedVersion() })
    }
  }

  componentDidMount() {
    attach("ChangeVersion", this.changeVersion)
    attach("PageVersionCreated", this.refreshPage)
    attach("PageVersionUpdated", this.refreshPage)
  }

  getPublishedVersion = () =>
    this.props.page.versions.filter(
      version => version.published === true
    )[0]

  getVersion = targetId =>
    this.props.page.versions.filter(
      version => version._id === targetId
    )[0]

  refreshPage = async () =>
    this.setState({ page: await fetchPage(this.state.page.url) })

  changeVersion = versionId =>
    this.setState({ version: this.getVersion(versionId) })

  render() {
    return (
      <div>
        <Head title={this.props.page.name} />

        {this.props.isAuthenticated &&
          <PageEditor page={this.props.page} version={this.state.version} />
        }

        {this.state.version && this.state.version.components.map((component, index) => {
          const ComponentToRender = components[component.name]
          return <ComponentToRender key={index} />
        })}

        {!this.state.version && <p>Not Found!</p>}

        <div>
          Website running on <a href="https://github.com/sampettersson/CMIS">CMIS</a>.
        </div>
      </div>
    )
  }
}
