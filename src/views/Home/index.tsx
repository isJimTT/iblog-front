import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import { Space } from 'antd'
import '../index.scss'
import avatar from '../../assets/img/avatar.png'
import avatar2 from '../../assets/img/avatar2.jpg'
import { useNavigate } from 'react-router-dom'
import TextLoop from 'react-text-loop'
import { RedoOutlined, EyeOutlined } from '@ant-design/icons'
import { GetArticleListApi, GetClassListApi } from '@/api/article'
import { ExistDateApi } from '@/api/exist'
import { NoticeListApi } from '@/api/notice'

import { ReactComponent as GitHub } from '../../assets/fonts-icon/github.svg'
import { ReactComponent as QQ } from '../../assets/fonts-icon/qq.svg'
import { ReactComponent as WeChat } from '../../assets/fonts-icon/wechat.svg'
import { ReactComponent as Personal } from '../../assets/fonts-icon/personal.svg'
import { ReactComponent as Position } from '../../assets/fonts-icon/position.svg'
import { ReactComponent as Notice } from '../../assets/fonts-icon/notice.svg'
import { ReactComponent as BackTop } from '../../assets/fonts-icon/backTop.svg'
import { ReactComponent as Label } from '../../assets/fonts-icon/lable.svg'
import { ReactComponent as DownArrow } from '../../assets/fonts-icon/bottomArr.svg'
interface IProps {
  children?: ReactNode
}

interface IQueryList {
  category?: string
}

interface ICurWeather {
  text: string
  temp: string
}

const Home: React.FC<IProps> = () => {
  const contentBgRef: any = useRef()
  const navigate = useNavigate()
  const [isAvatarRotated, setIsAvatarRotated] = useState<boolean>(false)
  const [isAvatarSwitch, setIsAvatarSwitch] = useState<boolean>(false)
  const [dataList, setDataList] = useState<any[]>([])
  const [classList, setClassList] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [overflow, setOverflow] = useState<any>('')
  const [existDate, setExistDate] = useState<string>('')
  const [articleNum, setArticleNum] = useState<number>(0)
  const [noticeList, setNoticeList] = useState<any>([])
  const [curWether, setCurWether] = useState<ICurWeather>()

  const getExistDate = async () => {
    try {
      const { code, data } = await ExistDateApi()
      if (code === 200) {
        setExistDate(data)
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getWeather = () => {
    const url = `https://devapi.qweather.com/v7/weather/now?location=101270101&key=a54c60d0218f471bb6f5d1afff1e7439`
    fetch(url)
      .then((response) => response.json())
      .then((res) =>
        setCurWether({
          temp: res.now.temp,
          text: res.now.text
        })
      )
  }

  const getNoticeList = async () => {
    try {
      const { code, data } = await NoticeListApi()
      if (code === 200) {
        setNoticeList(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getArticleList = async (query: any = undefined) => {
    try {
      const { code, data, overflow } = await GetArticleListApi(query)
      if (code === 200) {
        setDataList(data)
        if (overflow) {
          setOverflow(overflow)
          setArticleNum(data.length)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getClassList = async () => {
    try {
      const { code, data } = await GetClassListApi()
      if (code === 200) {
        setClassList(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleArticle = (item: any) => {
    const articleId = item.article_id
    navigate(`/detail/${articleId}`)
  }

  const handleCategory = async (category: string, itemId: number) => {
    getArticleList({ category })
    setCurrentIndex(itemId)
  }

  const handleTimeFormat = (time: string) => {
    return new Date(time).toLocaleString()
  }

  const resetCurrentClass = () => {
    setCurrentIndex(0)
    getArticleList()
  }

  const onTitleMouseOver = () => {
    contentBgRef.current.style.background = '#222'
  }

  const onTitleMouseLeave = () => {
    contentBgRef.current.style.background = ''
  }

  const onAvaMouseEnter = () => {
    setIsAvatarRotated(true)
    if (!isAvatarSwitch) return setIsAvatarSwitch(true)
    setIsAvatarSwitch(false)
  }

  const onAnimationEnd = () => {
    setIsAvatarRotated(false)
  }

  useEffect(() => {
    getArticleList()
    getClassList()
    getExistDate()
    getNoticeList()
    getWeather()
  }, [])

  return (
    <>
      <ReactFullpage
        scrollingSpeed={700}
        verticalCentered={false}
        credits={{
          enabled: false
        }}
        render={({ state, fullpageApi }) => {
          return (
            <>
              <ReactFullpage.Wrapper>
                <div ref={contentBgRef} className={`section active-section`}>
                  <div className="home-name">
                    <a
                      className="font-logo"
                      onMouseEnter={() => onTitleMouseOver()}
                      onMouseLeave={() => onTitleMouseLeave()}
                    >
                      虽千万里，吾往矣
                    </a>
                    <span className="logo-bottom" onClick={() => fullpageApi.moveSectionDown()}>
                      JimTT
                    </span>
                  </div>
                  <DownArrow className="down-arrow" onClick={() => fullpageApi.moveSectionDown()} />
                </div>
                <div className="section" data-anchor="secondSection" data-scroll-overflow="true">
                  <div className="home-content">
                    <div className="content-left">
                      {dataList
                        ? dataList.map((item) => {
                            return (
                              <div
                                className="item-wrap"
                                key={item.title}
                                onClick={() => handleArticle(item)}
                              >
                                <div className="item-left">
                                  <img src={item.cover} alt="" />
                                </div>
                                <div className="item-right">
                                  <div className="title">{item.title}</div>
                                  <div className="desc">{item.summary}</div>
                                  <div className="bottom">
                                    <div className="time">
                                      {handleTimeFormat(item.cteat_time) as any}
                                    </div>
                                    <div className="key-word">
                                      🎈{item.tags ? item.tags : ''}
                                      <span style={{ marginRight: 20 }}></span>
                                      📃{item.category ? item.category : ''}
                                    </div>
                                    <div>
                                      <EyeOutlined />
                                      <span> </span>
                                      {item.overflow}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        : ''}
                    </div>
                    <div className="content-right">
                      <div className="user-info ">
                        <div className="info-top">
                          <img
                            src={isAvatarSwitch ? avatar2 : avatar}
                            className={` ${isAvatarRotated ? 'img-rotated' : ''}`}
                            onMouseEnter={() => onAvaMouseEnter()}
                            onAnimationEnd={() => onAnimationEnd()}
                          />
                        </div>
                        <div className="info-mid">
                          {isAvatarSwitch ? '虽千万里，吾往矣' : '心之所向，素履以往'}
                        </div>
                        <div className="info-bottom">
                          <div className="bottom-item">
                            <div>文章</div>
                            <div>{articleNum}</div>
                          </div>
                          <div className="bottom-item">
                            <div>分类</div>
                            <div>{classList.length}</div>
                          </div>
                          <div className="bottom-item">
                            <div>浏览量</div>
                            <div>{overflow}</div>
                          </div>
                        </div>
                      </div>
                      <div className="user-link">
                        <a href="https://github.com/isJimTT" target="blank">
                          <GitHub />
                        </a>
                        <QQ />
                        <WeChat />
                        <Personal />
                      </div>
                      <div className="user-notice">
                        <div className="notice-top">
                          <div>
                            <Notice style={{ marginRight: 10, width: 24 }} />
                            <div>滴滴滴~</div>
                          </div>

                          <div>
                            <Position style={{ marginRight: 5, width: 20 }} />
                            <div>
                              <Space>
                                <span> 成都</span>
                                <span>{curWether?.text}</span>
                                <span>{curWether?.temp}°C</span>
                              </Space>
                            </div>
                          </div>
                        </div>
                        <div className="notice-bottom">
                          <TextLoop noWrap={false} mask={true}>
                            <span>{noticeList[0]?.content}</span>
                            <span>{noticeList[1]?.content}</span>
                            <span>{noticeList[2]?.content}</span>
                            <span>{noticeList[3]?.content}</span>
                          </TextLoop>
                        </div>
                      </div>
                      <div className="article-label">
                        <div className="label-top">
                          <Label style={{ width: 26, marginLeft: 20, marginRight: 5 }} />
                          <span style={{ marginRight: 175 }}>分类</span>
                          <RedoOutlined
                            onClick={() => resetCurrentClass()}
                            style={{ fontSize: 20, cursor: 'pointer' }}
                          />
                        </div>
                        <div></div>
                        <div className="label-bottom">
                          {classList.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={`label-item ${
                                  currentIndex == item.id ? `label-item-active` : ''
                                }`}
                                onClick={() => handleCategory(item.class_name, item.id)}
                              >
                                {item.class_name}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="website-exist">
                        <div>
                          🎈小破站已经存活了<span>{existDate}</span>天~🎈
                        </div>
                        <div>
                          👉累计文章访问量<span>{overflow}</span>次~👈
                        </div>
                      </div>
                    </div>

                    <div>
                      <BackTop
                        className="back-top"
                        onClick={() => {
                          fullpageApi.moveTo(1)
                        }}
                      />
                    </div>
                  </div>
                  <div className="home-footer">了解事物的本质，才能获得真理的自由</div>
                </div>
              </ReactFullpage.Wrapper>
            </>
          )
        }}
      />
    </>
  )
}

// Home.defaultProps = {
//   name: 'jim'
// }

export default Home
