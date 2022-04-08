import React from 'react'

import DogSvg from '../../../assets/svg/dog.svg'
import CatSvg from '../../../assets/svg/cat.svg'

export function SvgStack(){
  return (
    <>
      <DogSvg 
        fill={"#0002"}
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          top: 50,
          left: 20,
          transform: [{
            rotate: '45deg'
          }]
        }}
      />
      <CatSvg 
        fill={"#0002"}
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          bottom: 90,
          right: 15,
        }}
      />
    </>
  )
}