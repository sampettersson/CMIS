import React from "react"
import { fetchState, waitForPages } from "../state"
import { attach, detach } from "../event"

import PageDelete from "./PageDelete"

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pages: this.props.initialPages
    }
  }

  componentDidMount() {
    attach("PageCreated", this.refreshPages)
    attach("PageDeleted", this.refreshPages)
  }

  componentWillUnmount() {
    detach("PageCreated", this.refreshPages)
    detach("PageDeleted", this.refreshPages)
  }

  refreshPages = () => waitForPages().then(() => this.setState({ pages: fetchState().pages }))

  render() {
    return (
      <ul>
        {this.state.pages.map(page =>
          <li key={page._id}>
            {page.name} - {page.url}
            <PageDelete page={page} />
          </li>
        )}
      </ul>
    )
  }
}
