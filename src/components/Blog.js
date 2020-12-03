import React from 'react'
import Togglable from './Togglable'

const Blog = ({ user, blog, addLike, deleteBlog }) => {
  return (
    <div style={ { border: '1px solid #000', marginBottom: '5px', padding: '5px' } }>
      <div className='bloghead'>{blog.title} - {blog.author}</div>
      <Togglable buttonLabel='view'>
        <div className='blogbod'>
          <br />
          {blog.url}<br />
    likes {blog.likes} <button onClick={() => addLike(blog)} className='likebtn'>like</button><br />
          {blog.user.username}
          {user && blog.user.username === user.username ?  <> <br /><button onClick={(event) => deleteBlog(event, blog)}>remove</button> </>  : ''}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
