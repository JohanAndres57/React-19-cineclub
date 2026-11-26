import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetail, { movieLoader } from './pages/MovieDetail'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'
import ErrorPage from './pages/ErrorPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies', element: <Movies /> },
      { 
        path: 'movies/:id', 
        element: <MovieDetail />, 
        loader: movieLoader,
        errorElement: <ErrorPage />
      },
      { path: 'add-movie', element: <AddMovie /> },
      {
        path: 'edit-movie/:id',
        element: <EditMovie />,
        loader: movieLoader,
        errorElement: <ErrorPage />
      },
      { path: 'favorites', element: <Favorites /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
