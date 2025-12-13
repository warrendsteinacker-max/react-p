import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { response } from 'express'
import Data from './componets/data.jsx'

const [data, setData] = useState(null);


useEffect(async() => {  response= await fetch('http://localhost:3000/api/hello')
  const data = await response.json()
  setData(data)
}, [])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Data data={data} setData={setData} />
    </>
  )
}

export default App
