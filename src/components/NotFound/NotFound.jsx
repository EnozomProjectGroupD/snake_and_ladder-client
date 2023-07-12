import React from 'react'
import logo from '../../assets/404 error.png'

export default function NotFound() {
  return (

    <>
    <div className='container vh-100 align-items-center justify-content-center d-flex'>
        <img src={logo} className='w-100' alt="404 error" />
    </div>
    </>
  )
}
