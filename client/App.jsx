import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import Map from './components/Map.jsx';
import Homepage from './components/Homepage.jsx'
import './styles.css'

const App = () => {
  return (
      <>
       <div className='wrapper'>   
          <Homepage />
        </div>
    <Routes>
      <Route path='/' />
    </Routes>
    </>
  )
}

export default App