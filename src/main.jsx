import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './index.css'
import Movies from './pages/Movies'
import MovieDetail, { movieLoader } from './pages/MovieDetail'
import ErrorPage from './pages/ErrorPage'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <MainLayout />,
    children: [
      {
  path: 'edit-movie/:id',
  element: <EditMovie />,
  loader: movieLoader,
  errorElement: <ErrorPage />
},
      {
  path: 'movies/:id',
  element: <MovieDetail />,
  loader: movieLoader,
  errorElement: <ErrorPage />
},
      { path: 'movies', element: <Movies /> },
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
      { path: 'add-movie', element: <AddMovie /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)