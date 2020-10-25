import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import logo from './docker-whale-logo.png';
import './App.css';
import { message, color, backgroundColor, apiUrl } from './config'


function App() {
  const msg = message || 'FRONTEND'

  const [ serverValue, setServerValue ] = useState('');
  useEffect(() => {
    if (!apiUrl) {
      setServerValue('');
      return;
    }

    const url = `${apiUrl}/api/v1/data`;

    setServerValue('...');
    fetch(url)
      .then(result => {
        return result.text();
      })
      .then(result => {
        console.log(result);
        setServerValue(result)
        return result;
      })
      .catch(err => {
        console.warn(err);
        setServerValue('err loading')
      })
    
  },[]);

  const [ countValue, setCountValue ] = useState('-');
  const [ hostValue, setHostValue ] = useState('');
  const performCount = () => {
    if (!apiUrl) {
      setCountValue('no-api');
      return;
    }
    const url = `${apiUrl}/api/v1/count`;

    fetch(url)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        setCountValue(result.error || result.counter)
        setHostValue(result.host || '<unkonwn server>');
      })
      .catch(err => {
        console.warn(err);
        setCountValue('err loading')
      })
  }

  return (
    <div className="App" >
      <header className="App-header" style={{ backgroundColor }} >
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color }}>
          - {msg} - 
        </p>
        {serverValue && (
          <p>
            {serverValue}
          </p>
        )}
        <p>
          <button onClick={performCount}>
            Count: <span>{countValue}</span>
          </button>          
        </p>
        
      </header>
    </div>
  );
}

export default App;
