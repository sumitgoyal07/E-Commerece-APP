import React from 'react'
import { Helmet } from 'react-helmet'

function Privacy_Policy({ title, description, author, keyword }) {
  return (
    <div>
                  <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      privacy
    </div>
  )
}

export default Privacy_Policy
