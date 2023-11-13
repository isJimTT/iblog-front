import React, { ReactNode, useRef, useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import '../index.scss'
import avatar from '../../assets/img/avatar.png'
import avatar2 from '../../assets/img/avatar2.jpg'
import article1 from '../../assets/img/1.jpg'
import article2 from '../../assets/img/3.jpg'
import article3 from '../../assets/img/4.jpg'
import ArticleItem from '@/components/ArticleItem'
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

const Home: React.FC<IProps> = () => {
  // const { theme } = useAppSelector((state) => ({
  //   theme: state.themeRedux.curTheme
  // }))
  const contentBgRef: any = useRef()
  const [isAvatarRotated, setIsAvatarRotated] = useState<boolean>(false)
  const [isAvatarSwitch, setIsAvatarSwitch] = useState<boolean>(false)
  const dataList: any[] = [
    {
      img: article1,
      title: '测试1',
      desc: '描述萨达萨达萨达萨达',
      time: '2023-10-11',
      keyWord1: 'Vue',
      keyWord2: 'JS'
    },
    {
      img: article2,
      title: '测试2',
      desc: '描述萨达萨达萨达萨达',
      time: '2023-10-11',
      keyWord1: 'Vue',
      keyWord2: 'JS'
    },
    {
      img: article3,
      title: '测试3',
      desc: '描述萨达萨达萨达萨达',
      time: '2023-10-11',
      keyWord1: 'Vue',
      keyWord2: 'JS'
    }
  ]
  const category: any[] = [
    'Vue',
    'React',
    'Echarts',
    'Node.js',
    '数据结构与算法',
    '闭包',
    '原型链与作用域链',
    'Html'
  ]

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

  return (
    <>
      <ReactFullpage
        scrollingSpeed={700}
        navigation={true}
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
                <div className="section" data-scroll-overflow="true">
                  <div className="home-content">
                    <div className="content-left">
                      <ArticleItem dataList={dataList} />
                    </div>
                    <div className="content-right">
                      <div className="user-info">
                        <div className="info-top">
                          <img
                            src={isAvatarSwitch ? avatar : avatar2}
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
                            <div>50</div>
                          </div>
                          <div className="bottom-item">
                            <div>标签</div>
                            <div>22</div>
                          </div>
                          <div className="bottom-item">
                            <div>浏览量</div>
                            <div>22</div>
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
                            <div>成都</div>
                          </div>
                        </div>
                        <div className="notice-bottom">网站还在速速开发中~</div>
                      </div>
                      <div className="article-label">
                        <div className="label-top">
                          <Label style={{ width: 26, marginLeft: 20, marginRight: 5 }} />
                          分类标签
                        </div>
                        <div className="label-bottom">
                          {category.map((item) => {
                            return (
                              <div key={item} className="label-item">
                                {item}
                              </div>
                            )
                          })}
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
