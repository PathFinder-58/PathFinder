import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bye = () => {
  const navigate = useNavigate();

  function goHome() {
    navigate('/home');
  }

  return (
    <div>
      <p>bye</p>
      <button onClick={goHome}>Take me to Home</button>
    </div>
  )
}

export default Bye