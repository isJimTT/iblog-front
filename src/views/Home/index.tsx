import React, { ReactNode, memo } from 'react'
import useAppSelector from '@/hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { testChangeAction } from '@/store/modules/test'

interface IProps {
  children?: ReactNode
}

const Home: React.FC<IProps> = () => {
  const { name } = useAppSelector((state) => ({
    age: state.testRedux.age,
    name: state.testRedux.name
  }))
  const dispatch = useDispatch()
  function handleTest() {
    dispatch(testChangeAction('haaaaaaaaaaa'))
  }

  return (
    <>
      <div>name: {name}</div>
      <button onClick={handleTest}>点击</button>
    </>
  )
}

// Home.defaultProps = {
//   name: 'jim'
// }

export default memo(Home)
