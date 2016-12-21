import fetch from "isomorphic-fetch"

export default page => fetch("http://localhost:3001/api/pages", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(page)
}).then(response => response.json())
