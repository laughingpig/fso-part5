import React, { useState } from 'react'

const BlogForm = ( { processBlogForm } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <form onSubmit={(event) => processBlogForm(event, title, author, url)}>
      <h2>create new</h2>
      <div>
        title: <input value={title} name="title" type="text" onChange={({ target }) => setTitle(target.value)} className="title" />
      </div>
      <div>
        author: <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} className="author" />
      </div>
      <div>
        url: <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} className="url" />
      </div>
      <div>
        <input type="submit" value="Submit" id="blogform" />
        <br /><br />
      </div>
    </form>
  )
}

export default BlogForm