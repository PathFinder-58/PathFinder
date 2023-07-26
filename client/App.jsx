import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import Map from './components/Map.jsx';
import Homepage from './components/Homepage.jsx'
import './styles.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Homepage />} />
    </Routes>
  )
}

export default App