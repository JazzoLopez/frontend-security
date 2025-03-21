import React from 'react'
import './styles.css'

export default function NotFound() {
  return (
    <div className='not-found'>
      <div className="content">
        <h1>404</h1>
        <h2>Not Found</h2>
        <p>Sorry, an error has occurred, Requested page not found!</p>
        <p>Return home <a href="home">Click here</a></p>
      </div>
    </div>
  )
}
