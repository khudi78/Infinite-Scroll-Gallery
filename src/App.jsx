import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Gallery from './Gallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <header className=" bg-emerald-900 rounded-3xl text-white p-4 text-center max-[640px]:w-[400px] max-[640px]:ml-7">
      <h1 className="text-2xl font-bold">Infinite Scroll Gallery</h1>
    </header>
    <main>
      <Gallery />
    </main>
  </div>
  )
}

export default App
