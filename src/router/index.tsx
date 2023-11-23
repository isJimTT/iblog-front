import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/Home'))
const Article = lazy(() => import('@/views/Article'))
const About = lazy(() => import('@/views/About'))
const Resources = lazy(() => import('@/views/Resources'))
const Detail = lazy(() => import('@/views/Detail'))

import { Navigate } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/article',
    element: <Article />
  },
  {
    path: '/detail/:articleId',
    element: <Detail />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/resources',
    element: <Resources />
  }
]

export default routes
