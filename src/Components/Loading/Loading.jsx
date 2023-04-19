import React from 'react'
import "./Loading.css"
import { Oval } from 'react-loader-spinner';

function Loading() {
  return (
    <div className='loading_container'>
        <Oval
            height={80}
            width={80}
            color="#7380ec"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="rgba(59, 76, 227, 0.18)"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    </div>
  )
}

export default Loading