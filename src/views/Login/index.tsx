import React, { useState } from 'react'
import { LoginApi, RegisterApi } from '@/api/login'
import { Popconfirm, message } from 'antd'
import { setToken } from '@/utils/auth'
import { useDispatch } from 'react-redux'
import useAppSelector from '@/hooks/useAppSelector'
import { nameChangeAction } from '@/store/modules/user'
import { removeToken } from '@/utils/auth'

interface ILoginParams {
  name?: string
  password?: string
  phoneNumber?: string | any
  passwordConfirm?: string
}
function Login() {
  const dispatch = useDispatch()
  const [isStayLogin, setIsStayLogin] = useState<boolean>(false)
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false)
  const [isRegisterOpen, setRegisterOpen] = useState<boolean>(false)
  const [loginParams, setLoginParams] = useState<ILoginParams>()
  const { reduxUserName } = useAppSelector((state) => ({
    reduxUserName: state.userRedux.name
  }))
  const [registerParams, setRegisterParams] = useState<ILoginParams>({
    name: '',
    password: '',
    phoneNumber: '',
    passwordConfirm: ''
  })

  // 处理登录
  const handleLogin = async () => {
    const { code, msg, data } = await LoginApi(JSON.stringify(loginParams))
    if (code == 200) {
      setLoginOpen(false)
      setToken(data.token)
      dispatch(nameChangeAction(data.name))
      handleStayLogin(data.name)
      setLoginParams({})
      return message.success(msg)
    }
    message.error(msg)
  }

  // 处理注册
  const handleRegister = async () => {
    // 1. 验证手机号位数和类型
    if (!validatePhoneNumber(registerParams?.phoneNumber)) return message.error('手机号格式有误')
    // 2. 验证再次输入密码是否正确
    if (registerParams?.password !== registerParams?.passwordConfirm)
      return message.error('两次密码输入不一致')
    try {
      const { code, msg } = await RegisterApi(JSON.stringify(registerParams))
      code === 200 ? message.success(msg) : message.error(msg)
    } catch (err) {
      console.log(err)
    }
  }

  // 登录持久化
  const handleStayLogin = (name: string) => {
    if (isStayLogin) {
      window.localStorage.setItem('userName', name)
    }
  }

  // 处理登录
  const isLogin = () => {
    if (!reduxUserName) {
      setLoginOpen(true)
    }
  }

  // 退出登录
  const logOut = () => {
    dispatch(nameChangeAction(null))
    removeToken()
    localStorage.removeItem('userName')
  }

  // 验证手机号
  const validatePhoneNumber = (phoneNumber: string) => {
    const pattern = /^1[3-9]\d{9}$/
    return pattern.test(phoneNumber)
  }

  // 处理关闭登录
  const handleClose = () => {
    setLoginOpen(false)
  }

  return (
    <div>
      <div onClick={isLogin}>
        {!reduxUserName ? (
          <div>登录</div>
        ) : (
          <Popconfirm
            placement="bottom"
            title="警告"
            description="是否要退出登录"
            okText="是"
            cancelText="否"
            onConfirm={logOut}
          >
            <div className="login-name">{reduxUserName}</div>
          </Popconfirm>
        )}
      </div>
      {isLoginOpen && (
        <div className="login-container">
          {!isRegisterOpen ? (
            <div className="login-content">
              <div>Login...</div>
              <div>
                <span className="login-span"> 账号:</span>
                <input
                  type="text"
                  style={{ fontSize: 18, width: 270 + 'px' }}
                  placeholder="请输入手机号/用户名"
                  onChange={(e) => setLoginParams({ ...loginParams, name: e.target.value })}
                />
              </div>
              <div>
                <span className="login-span">密码:</span>
                <input
                  type="password"
                  style={{ fontSize: 18, width: 270 + 'px' }}
                  placeholder="请输入密码"
                  onChange={(e) => setLoginParams({ ...loginParams, password: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="containLogin" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    id="containLogin"
                    className="login-checkbox"
                    size={26}
                    onChange={(e) => setIsStayLogin(e.target.checked)}
                  />
                  <span style={{ marginLeft: 10, fontSize: 16 }}>保持登录</span>
                </label>
                <span className="login-register">
                  <span onClick={() => setRegisterOpen(true)}>还没有账号？ 点我</span>
                </span>
              </div>
              <div className="login-bottom">
                <span className="login-confirm" onClick={handleLogin}>
                  登录
                </span>
                <span className="login-close" onClick={handleClose}>
                  关闭
                </span>
              </div>
            </div>
          ) : (
            <div className="register-content">
              <div style={{ fontSize: 22 }}>Register...</div>
              <div>
                <input
                  className="login-span"
                  type="text"
                  placeholder="请输入手机号(可填)"
                  onChange={(e) =>
                    setRegisterParams({ ...registerParams, phoneNumber: e.target.value })
                  }
                />
                -手机号
              </div>
              <div>
                <input
                  className="login-span"
                  type="text"
                  placeholder="请输入用户名"
                  onChange={(e) => setRegisterParams({ ...registerParams, name: e.target.value })}
                />
                -用户名
              </div>
              <div>
                <input
                  className="login-span"
                  type="password"
                  placeholder="请输入密码"
                  onChange={(e) =>
                    setRegisterParams({ ...registerParams, password: e.target.value })
                  }
                />
                -密码
              </div>
              <div>
                <input
                  className="login-span"
                  type="password"
                  placeholder="请再次输入密码"
                  onChange={(e) =>
                    setRegisterParams({ ...registerParams, passwordConfirm: e.target.value })
                  }
                />
                -密码
              </div>
              <div className="login-upload">
                <div>头像上传：</div>
              </div>
              <div>
                <span className="login-register">
                  <span onClick={() => setRegisterOpen(false)}>点击返回登录页面</span>
                </span>
              </div>
              <div className="login-bottom">
                <span className="login-close" onClick={handleRegister}>
                  注册
                </span>
                <span className="login-confirm" onClick={handleClose}>
                  关闭
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {isLoginOpen && <div className="login-mask"></div>}
    </div>
  )
}

export default Login
