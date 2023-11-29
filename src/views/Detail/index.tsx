import '../index.scss'
import { useParams } from 'react-router-dom'
import { GetArticleInfoApi } from '@/api/article'
import React, { useEffect, useState, useMemo } from 'react'
import { ReadOutlined } from '@ant-design/icons'
import hljs from 'highlight.js'
import 'highlight.js/styles/lioshi.css'

const Detail = () => {
  const { articleId } = useParams()
  const [html, setHtml] = useState<string>('')
  const [head, setHead] = useState<string>('')
  const [titles, setTitle] = useState<any>(null)
  const regex = /<h1(?:\s+style="[^"]*")?>(.*?)<\/h1>/g

  const getArticleInfo = async () => {
    try {
      const { code, data } = await GetArticleInfoApi(articleId)
      if (code === 200) {
        setHead(data[0].title)
        setHtml(data[0].content)
        const matches = data[0].content.matchAll(regex)
        const newTitles = []
        for (const match of matches) {
          newTitles.push(match[1])
        }
        setTitle(newTitles)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const highlightedHtml = useMemo(() => {
    const parsedHtml = new DOMParser().parseFromString(html, 'text/html')
    const codeBlocks = parsedHtml.querySelectorAll('pre')
    codeBlocks.forEach((block) => {
      try {
        hljs.highlightBlock(block)
      } catch (e) {
        console.log(e)
      }
    })
    console.log(parsedHtml.documentElement.innerHTML)

    return parsedHtml.documentElement.innerHTML
  }, [html])

  useEffect(() => {
    getArticleInfo()
  }, [])
  return (
    <>
      <div className="detail-title">
        <h1>{head}</h1>
      </div>
      <div className="detail-content">
        <div className="detail-left" dangerouslySetInnerHTML={{ __html: highlightedHtml }}></div>
        <div className="detail-right">
          <div className="label-top">
            <ReadOutlined style={{ marginRight: 10 }} /> 目录
          </div>
          <div>
            {titles?.map((item: any) => {
              return (
                <div key={item} className="label-item">
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail
