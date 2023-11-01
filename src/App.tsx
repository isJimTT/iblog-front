import React, { Suspense, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import { ReactComponent as LoginDark } from './assets/fonts/loginDark.svg'
import { ReactComponent as LoginLight } from './assets/fonts/loginLight.svg'
import routes from './router'
import './App.scss'

function App() {
  const [theme, setTheme] = useState<string>('light')
  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <section className="logo">积木踢踢</section>
        <section className="nav">
          <Link to="/home">首页</Link>
          <Link to="/article">文章</Link>
          <Link to="/resources">资源</Link>
          <Link to="/about">关于</Link>
          <Link to="/login">
            {theme === 'dark' ? (
              <LoginLight className="login-img" />
            ) : (
              <LoginDark className="login-img" />
            )}
            登录
          </Link>
        </section>
        <section className="search" onClick={changeTheme}>
          点我切换主题
        </section>
      </header>
      <Suspense fallback="Loading">
        <article className="main">{useRoutes(routes)}</article>
        <footer className="footer">了解事物的本质，才能获得真理的自由</footer>
      </Suspense>
    </div>
  )
}

export default App
