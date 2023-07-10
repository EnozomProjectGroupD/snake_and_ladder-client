import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/home.png'
import { Helmet } from 'react-helmet';
export default function home() {
  return (
    <>
    <Helmet>
      <title>Snake and ladder home page</title>
    </Helmet>
    <div >
    <div className='row d-flex align-items-center justify-content-center '>
    <div className='col-md-6'>
<p className='fw-bold fs-2'>
   Unleash your competitive spirit and climb to victory with our addictive Snake and Ladder game
</p>
<Link className='btn btn-danger rounded-5 fs-3' to={'/login'}>Play Now!</Link>
    </div>
    <div className='col-md-6'>
      <img src={logo} alt='game logo' className='w-100'/>
    </div>
    </div>
    </div>
    </>
  )
}
