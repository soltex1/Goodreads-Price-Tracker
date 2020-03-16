import React from 'react'
import '../styles/Loading.css'
import LoadingGif from '../images/loading.gif'

const Loading = () => {
  return <div className="loadingWrapper">
    <img className={'loading'} alt={'loading'} src={LoadingGif}/>
    <span>LOADING</span>
  </div>
}

export default Loading
