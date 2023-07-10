import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedROute(props) {

    if(localStorage.getItem('userToken')== null){
        return < Navigate to={'/login'} />
     }else{
         return props.children
     }
  
  
}



