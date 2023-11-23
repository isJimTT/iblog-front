import '../index.scss'
import { useParams } from 'react-router-dom'
import { GetArticleInfoApi } from '@/api/article'
import React, { useEffect, useState } from 'react'

const Detail = () => {
  const { articleId } = useParams()
  const [html, setHtml] = useState<string>('')

  const getArticleInfo = async () => {
    try {
      const { code, data } = await GetArticleInfoApi(articleId)
      if (code === 200) {
        setHtml(data[0].content)
        console.log(data[0].content)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getArticleInfo()
  })
  return (
    <>
      <div className="detail-content">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  )
}

export default Detail
