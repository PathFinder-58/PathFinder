import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bye = () => {
  const navigate = useNavigate();

  function goRoot() {
    navigate('/');
  }

  return (
    <div>
      <p>bye</p>
      <button onClick={goRoot}>Take me to Root</button>
    </div>
  )
}

export default Bye