import React from "react"

export default class extends React.Component {
  render() {
    return (
      <ul>
        {this.props.page.versions.map(version =>
          <li key={version._id}>
            <a href={`?version=${version._id}`}>
              {version.created}
            </a>
          </li>
        )}
      </ul>
    )
  }
}
