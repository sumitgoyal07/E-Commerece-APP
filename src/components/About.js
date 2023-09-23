import React from 'react'
import {Helmet} from 'react-helmet'

function About({ title, description, author, keyword }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      about
    </div>
  )
}

export default About
