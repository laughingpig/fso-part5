import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ user, blog, setBlogs, setNotification, setNotificationType }) => {

  const addLike = async () => {
    const updatedBlog = {
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes+1
    }

    try {
      blogService.setToken(user.token)
      await blogService.updateBlog(blog.id, updatedBlog)
      blogService.getAll().then(blogs =>
        {
          setBlogs(blogs)
        }
      )
      setNotification('added like.')
      setNotificationType('success')
      setTimeout(() => {setNotification('')}, 10000)               
    } 
    catch(err) {
      setNotification('error adding like.')
      setNotificationType('error')
      setTimeout(() => {setNotification('')}, 10000)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm("Do you really want to delete"+blog.title+"?")) { 
    try {
      blogService.setToken(user.token)
      await blogService.deleteBlog(blog.id)
      blogService.getAll().then(blogs =>
        {
          setBlogs(blogs)
        }
      )
      setNotification('blog deleted.')
      setNotificationType('success')
      setTimeout(() => {setNotification('')}, 10000)               
    } 
    catch(err) {
      setNotification('error deleting blog.')
      setNotificationType('error')
      setTimeout(() => {setNotification('')}, 10000)
    }    
    }
  }

  return (
  <div style={{border: '1px solid #000', marginBottom: '5px', padding: '5px'}}>
    <div>{blog.title}</div>
    <Togglable buttonLabel='view'>
    <br />
    {blog.url}<br />
    likes {blog.likes} <button onClick={addLike}>like</button><br /> 
    {blog.author}
    {user && blog.user.username === user.username ?  <> <br /><button onClick={deleteBlog}>remove</button> </>  : ''}
    </Togglable>
  </div>
  )
}

export default Blog
