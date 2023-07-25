import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './store.js';


const root = createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}> {/* importing store and adding it to Provider so App has access to store */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Provider>
);