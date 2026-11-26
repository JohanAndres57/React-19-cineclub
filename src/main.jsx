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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
  path: 'movies/:id',
  element: <MovieDetail />,
  loader: movieLoader,
  errorElement: <ErrorPage />
},
      { path: 'movies', element: <Movies /> },
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)