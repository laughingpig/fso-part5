import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const processForm = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login( { username, password } )
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('logged in successfully.')
      setNotificationType('success')
      setTimeout(() => {setNotification('')}, 10000)
    }
    catch(err) {
      setNotification('wrong username or password.')
      setNotificationType('error')
      setTimeout(() => {setNotification('')}, 10000)
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes+1
    }

    try {
      console.log(user.token)
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

  const processBlogForm = async (event, title, author,url) => {
    event.preventDefault()

    try {
      blogService.setToken(user.token)
      blogService.newBlog( { title, author, url } ).then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setNotification('new blog added.')
        setNotificationType('success')
        setTimeout(() => {setNotification('')}, 10000)        
      })
    }
    catch(err) {
      setNotification('error adding blog.')
      setNotificationType('error')
      setTimeout(() => {setNotification('')}, 10000)
    }
  }

  const deleteBlog = async (event, blog) => {
    if (window.confirm('Do you really want to delete'+blog.title+'?')) {
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

  const loginForm = () => (
    <form onSubmit={processForm}>
      <h2>login to application</h2>
      <div>
        username: <input value={username} name="username" id="username" type="text" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password: <input type="password" name="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <div>
        <input type="submit" value="Submit" />
        <br /><br />
      </div>
    </form>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedUser')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} type={notificationType} />

      { user === null ? loginForm() :
        <div>{user.username} logged in <button onClick={logout}>Logout</button>
          <br /><br />
          <Togglable buttonLabel='show form'>
            <BlogForm processBlogForm={processBlogForm} />
          </Togglable>
        </div>
      }

      <div id="bloglist">
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
      )}
      </div>
    </div>
  )
}

export default App