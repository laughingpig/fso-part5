import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, setBlogs, setNotification, setNotificationType}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const processBlogForm = async (event) => {
    event.preventDefault()

    try {
      blogService.setToken(user.token)
      await blogService.newBlog({title, author, url})
      blogService.getAll().then(blogs =>
        {
          setBlogs(blogs)
        }
      )
      setNotification('new blog added.')
      setNotificationType('success')
      setTimeout(() => {setNotification('')}, 10000)               
    } 
    catch(err) {
      setNotification('error adding blog.')
      setNotificationType('error')
      setTimeout(() => {setNotification('')}, 10000)
    }
  }   

  return (
  <form onSubmit={processBlogForm}>
    <h2>create new</h2>
    <div>
      title: <input value={title} name="title" type="text" onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
      author: <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
    </div>   
    <div>
      url: <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
    </div>          
    <div>
      <input type="submit" value="Submit" />
      <br /><br />
    </div>
  </form>  
  )
}

export default BlogForm;