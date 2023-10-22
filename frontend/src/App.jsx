import React from 'react'
import LostAndFoundForm from './LostAndFoundForm'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <LostAndFoundForm />
      <Toaster position="top-right"/>
    </>
  )
}

export default App