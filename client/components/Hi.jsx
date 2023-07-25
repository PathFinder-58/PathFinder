import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hi = () => {
  const navigate = useNavigate();

  function goHome() {
    navigate('/home');
  }

  return (
    <div>
      <p>hi</p>
      <button onClick={goHome}>Take me to Home</button>
    </div>
  )
}

export default Hi