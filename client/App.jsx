import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Hi from './components/Hi.jsx';
import Bye from './components/Bye.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Hi />} />
      <Route path='/home' element={<Bye />} />
    </Routes>
  )
}

export default App