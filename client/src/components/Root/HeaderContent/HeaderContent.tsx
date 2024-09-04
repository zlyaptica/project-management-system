import React, { FC } from 'react'

interface IHeaderContentProps {
  children: React.ReactNode
}

const HeaderContent: FC<IHeaderContentProps> = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export {HeaderContent} 