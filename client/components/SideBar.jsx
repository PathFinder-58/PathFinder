import React from 'react';
import SearchBar from './SearchBar.jsx'; // Assuming that the SearchBar component is located in the same folder as SideBar.js
import '../styles.css';

const SideBar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <p>I am the side bar!</p>
      <SearchBar onSelect={onSelect}/>
    </div>
  );
};

export default SideBar;
