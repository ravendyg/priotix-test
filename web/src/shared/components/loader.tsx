import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

type LoaderProps = {
  expand?: boolean
}
export function Loader({ expand }: LoaderProps) {
  const spinner = <Spinner animation='border'/>
  if (!expand) return spinner
  return <div className='expanded-to-page'>
    {spinner}
  </div>
}
