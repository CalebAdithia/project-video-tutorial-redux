import { useState } from 'react'
import PostsList from './features/posts/PostsList'
import AddPost from './features/posts/AddPost'
import Layout from './components/Layout'
import { Routes, Route, Navigate } from 'react-router-dom'
import SinglePost from './features/posts/SinglePost'
import EditPost from './features/posts/EditPost'
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<PostsList/>} />

          <Route path='post'>
            <Route index element={<AddPost/>}/>
            <Route path=':postId' element={<SinglePost/>}/>
            <Route path='edit/:postId' element={<EditPost/>}/>
          </Route>

          <Route path='user'>
            <Route index element={<UsersList/>}/>
            <Route path=':userId' element={<UserPage/>}/>
          </Route>

          <Route path='*' element={<Navigate to={`/`} replace/>}></Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
