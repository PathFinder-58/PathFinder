import React from 'react';
import SearchBar from './SearchBar.jsx'; // Assuming that the SearchBar component is located in the same folder as SideBar.js
import '../styles.css';

const SideBar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <h1>PathFinder</h1>
      <SearchBar onSelect={onSelect}/>
    </div>
  );
};

export default SideBar;
