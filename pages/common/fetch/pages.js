import fetch from "isomorphic-fetch"

export default () => fetch("http://localhost:3001/api/pages").then(response => response.json())
