import { MotiView } from 'moti'
import React, { ReactNode } from 'react'

export function Container({ children, center = true } : { children: ReactNode, center?: boolean }){
  return (
    <MotiView
      from={{
        opacity: 0,
        transform: [{ translateX: 100 }]
      }}
      animate={{
        opacity: 1,
        transform: [{ translateX: 0 }]
      }}
      exit={{
        opacity: 0,
        transform: [{ translateX: -100 }]
      }}
      transition={{
        type: 'timing',
        duration: 200
      }}
      style={{
        height: '100%',
        width: '100%',
        justifyContent: center ? 'center' : 'flex-start'
      }}
    >
      {children}
    </MotiView>
  )
}