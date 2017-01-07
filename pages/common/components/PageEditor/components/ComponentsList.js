import React from "react"

export default props =>
  <div>
    {props.version.components.map(component => <p>{component.name}</p>)}
  </div>
