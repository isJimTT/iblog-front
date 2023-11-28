import React, { Suspense, useEffect, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import { ReactComponent as LoginDark } from './assets/fonts-icon/loginDark.svg'
import { ReactComponent as LoginLight } from './assets/fonts-icon/loginLight.svg'
import useAppSelector from '@/hooks/useAppSelector'
import Login from './views/Login'
import { useNavigate } from 'react-router-dom'
import routes from './router'
import './App.scss'

function App() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState<string>('light')
  const [activeLink, setActiveLink] = useState('/home')
  const [stayUserName, setUserName] = useState<string | any>()

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }
  const changeTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const backHome = () => {
    navigate('/home')
    setActiveLink('/home')
  }

  useEffect(() => {
    setUserName(window.localStorage.getItem('userName'))
  }, [stayUserName])

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <section className="logo" onClick={() => backHome()}>
          积木踢踢
        </section>
        <section className="nav">
          <Link
            to="/home"
            className={activeLink === '/home' ? 'nav-active' : ''}
            onClick={() => handleLinkClick('/home')}
          >
            首页
          </Link>
          <Link
            to="/article"
            className={activeLink === '/article' ? 'nav-active' : ''}
            onClick={() => handleLinkClick('/article')}
          >
            文章
          </Link>
          <Link
            to="/resources"
            className={activeLink === '/resources' ? 'nav-active' : ''}
            onClick={() => handleLinkClick('/resources')}
          >
            资源
          </Link>
          <Link
            to="/about"
            className={activeLink === '/about' ? 'nav-active' : ''}
            onClick={() => handleLinkClick('/about')}
          >
            关于
          </Link>
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
