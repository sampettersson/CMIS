import React from "react"
import Head from "next/head"
 
export default props =>
  <Head>
    <title>{props.title}</title>
    <style>
      {`
	* {
	  box-sizing: border-box;
	  margin: 0;
	  padding: 0;
	  border: 0;
	}
      `}
    </style>
  </Head>
