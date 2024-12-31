import React from 'react'

const Blog = ({title, content}) => {
  return (
    <div>
        <div>
            <h1>{title}</h1>
        </div>

        <div>
            {content}
        </div>
    </div>
  )
}

export default Blog