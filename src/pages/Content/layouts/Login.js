import React, { useEffect } from 'react'


export default () => {
  useEffect(() => {
    console.log('Login mounted')
  }, [])
  return (
    <div className="__Login">
      <h1>needs login</h1>

    </div>
  )
}