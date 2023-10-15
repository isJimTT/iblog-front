import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/BlogHome'))
const Article = lazy(() => import('@/views/BlogArticle'))
const About = lazy(() => import('@/views/BlogAbout'))
const Resources = lazy(() => import('@/views/BlogResources'))
const Login = lazy(() => import('@/views/BlogLogin'))

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
    path: '/about',
    element: <About />
  },
  {
    path: '/resources',
    element: <Resources />
  },
  {
    path: '/login',
    element: <Login />
  }
]

export default routes
