import React, { useState, useEffect } from 'react'
import './index.scss'

const PageComponent = (props: any) => {
  const pages = []
  const groupCount = 5 // 页码分组，显示5个页码，其余用省略号显示
  const [currentPage, setCurrentPage] = useState(1) // 当前页码
  const [startPage, setStartPage] = useState(1) // 分组开始页码
  const [totalPage, setTotalPage] = useState(1) // 总页数

  useEffect(() => {
    setCurrentPage(props.currentPage)
    setTotalPage(props.totalPage)
  }, [props.currentPage, props.totalPage])

  const pageClick = (page: any) => {
    const newStartPage = page >= groupCount ? page - 2 : 1
    setStartPage(newStartPage)
    setCurrentPage(page)
    props.pageCallbackFn(page)
  }

  const prePageHandler = () => {
    if (currentPage > 1) {
      pageClick(currentPage - 1)
    }
  }

  const nextPageHandler = () => {
    if (currentPage < totalPage) {
      pageClick(currentPage + 1)
    }
  }

  if (currentPage !== 1) {
    pages.push(
      <li onClick={prePageHandler} key={0}>
        {' '}
        上一页
      </li>
    )
  }

  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li key={i} onClick={() => pageClick(i)} className={currentPage === i ? 'activePage' : ''}>
          {i}
        </li>
      )
    }
  } else {
    pages.push(
      <li className={currentPage === 1 ? 'activePage' : ''} key={1} onClick={() => pageClick(1)}>
        1
      </li>
    )

    if (currentPage >= groupCount) {
      pages.push(<li key={-1}>···</li>)
    }

    for (let i = currentPage - 2; i < currentPage + 3; i++) {
      if (i <= totalPage - 1 && i > 1) {
        pages.push(
          <li
            className={currentPage === i ? 'activePage' : ''}
            key={i}
            onClick={() => pageClick(i)}
          >
            {i}
          </li>
        )
      }
    }

    if (totalPage - startPage >= groupCount + 1) {
      pages.push(<li key={-2}>···</li>)
    }

    pages.push(
      <li
        className={currentPage === totalPage ? 'activePage' : ''}
        key={totalPage}
        onClick={() => pageClick(totalPage)}
      >
        {totalPage}
      </li>
    )
  }

  if (currentPage !== totalPage) {
    pages.push(
      <li onClick={nextPageHandler} key={totalPage + 1}>
        下一页
      </li>
    )
  }

  return <ul className="g-page">{pages}</ul>
}

export default PageComponent
