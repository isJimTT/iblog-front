import React, { Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to="/home">首页</Link>
        <Link to="/article">文章</Link>
        <Link to="/resources">资源</Link>
        <Link to="/about">关于</Link>
        <Link to="/login">登录</Link>
      </div>
      <Suspense fallback="111111111">
        <div className="main">{useRoutes(routes)}</div>
        <div className="footer">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </Suspense>
    </div>
  )
}

export default App
