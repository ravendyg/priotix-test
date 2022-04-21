import React from 'react'

type ErrorProps = {
  message: string
}
export function Error({ message, children }: React.PropsWithChildren<ErrorProps>) {
  return <div className='expanded-to-page' data-testid='error-container'>
    {message}
    <div>
      {children}
    </div>
  </div>
}
