import React, { useState, useEffect } from 'react'
import './App.css';
import Routes from './Routes';
// import { commerce } from './lib/commerce'
// import Checkout from './containers/CheckoutForm/Checkout'


function App() {
  console.log('app')
  
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
