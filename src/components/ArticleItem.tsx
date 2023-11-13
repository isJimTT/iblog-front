import React from 'react'
import './index.scss'

interface IArticleItem {
  title: string
  desc: string
  img: string
  time: string
  keyWord1: string
  keyWord2: string
}

interface IHome {
  dataList: IArticleItem[]
}

const ArticleItem: React.FC<IHome> = (props) => {
  return (
    <>
      {props.dataList.map((item) => {
        return (
          <div className="item-wrap" key={item.title}>
            <div className="item-left">
              <img src={item.img} alt="" />
            </div>
            <div className="item-right">
              <div className="title">{item.title}</div>
              <div className="desc">{item.desc}</div>
              <div className="bottom">
                <div className="time">{item.time}</div>
                <div className="key-word">
                  {item.keyWord1 ? item.keyWord1 : ''}
                  {item.keyWord2 ? item.keyWord2 : ''}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ArticleItem
