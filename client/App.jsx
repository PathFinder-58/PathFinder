import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import Map from './components/Map.jsx';
import './styles.css'

const App = () => {
  return (
      <>
        <div className='wrapper'>
          <SideBar />
          <Map />
        </div>
    <Routes>
      <Route path='/' />
    </Routes>
    </>
  )
}

export default App