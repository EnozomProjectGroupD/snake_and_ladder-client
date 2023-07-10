import React from 'react'

export default function Game() {
  return (
    <>
    {localStorage.getItem('userToken')}
    <div>Game</div>
    </>
  )
}
