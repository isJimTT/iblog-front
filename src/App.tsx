import React, { Suspense, useEffect, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import { ReactComponent as LoginDark } from './assets/fonts/loginDark.svg'
import { ReactComponent as LoginLight } from './assets/fonts/loginLight.svg'
import useAppSelector from '@/hooks/useAppSelector'
import Login from './views/Login'
import routes from './router'
import './App.scss'

function App() {
  const [theme, setTheme] = useState<string>('light')
  const [stayUserName, setUserName] = useState<string | any>()
  const { reduxUserName } = useAppSelector((state) => ({
    reduxUserName: state.userRedux.name
  }))
  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => {
    setUserName(window.localStorage.getItem('userName'))
    console.log(window.localStorage.getItem('userName'))
  }, [stayUserName])

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <section className="logo">积木踢踢</section>
        <section className="nav">
          <Link to="/home" state={theme}>
            首页
          </Link>
          <Link to="/article">文章</Link>
          <Link to="/resources">资源</Link>
          <Link to="/about">关于</Link>
          <a>
            {theme === 'dark' ? (
              <LoginLight className="login-img" />
            ) : (
              <LoginDark className="login-img" />
            )}
            <Login />
          </a>
        </section>
        <section className="search" onClick={changeTheme}>
          <span style={{ color: '#fff', fontWeight: 'bolder', marginRight: 10 }}>
            {stayUserName !== reduxUserName || stayUserName ? stayUserName : reduxUserName}
          </span>
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
