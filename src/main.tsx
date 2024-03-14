import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store'
import { fetchPosts } from './features/posts/postSlice.ts'
import { fetchUsers } from './features/users/usersSlice.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />}/> 
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
