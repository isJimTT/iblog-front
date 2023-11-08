import React, { ReactNode, memo } from 'react'
// import useAppSelector from '@/hooks/useAppSelector'
import ReactFullpage from '@fullpage/react-fullpage'
import '../index.scss'

interface IProps {
  children?: ReactNode
}

const Home: React.FC<IProps> = () => {
  // const { theme } = useAppSelector((state) => ({
  //   theme: state.themeRedux.curTheme
  // }))

  return (
    <>
      <ReactFullpage
        scrollingSpeed={1000}
        navigation={true}
        verticalCentered={false}
        credits={{
          enabled: true
        }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className={`section active-section`}>
                <div className="home-name">积木踢踢</div>
                <em className="home-article" onClick={() => fullpageApi.moveSectionDown()}>
                  了解事物的本质，才能获得真理的自由
                </em>
              </div>
              <div className="section" data-scroll-overflow="true">
                <div>aaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaa</div>
                <div>aaaaaaaaaaaaaaaa</div>
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      />
    </>
  )
}

// Home.defaultProps = {
//   name: 'jim'
// }

export default memo(Home)
