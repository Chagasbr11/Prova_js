import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [advice, setAdvice] = useState('Loading...');

  const getAdvice = async (keyword = '') => {
    let url = 'https://api.adviceslip.com/advice';
    if (keyword) {
      url = `https://api.adviceslip.com/advice/search/${keyword}`;
    }

    try {
      const response = await axios.get(url, { headers: { Accept: 'application/json' } });
      let advice = 'No advice found';
      if (response.data.slips && response.data.slips.length > 0) {
        advice = response.data.slips[Math.floor(Math.random() * response.data.slips.length)].advice;
      } else if (response.data.slip) {
        advice = response.data.slip.advice;
      }
      setAdvice(advice);
    } catch (error) {
      setAdvice('Failed to fetch advice');
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Random Advice</h1>
      <div id="advice" style={styles.adviceBox}>{advice}</div>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => getAdvice('dog')}>Get Dog Advice</button>
        <button style={styles.button} onClick={() => getAdvice('cat')}>Get Cat Advice</button>
        <button style={styles.button} onClick={() => getAdvice('study')}>Get Study Advice</button>
        <button style={styles.button} onClick={() => getAdvice()}>Get Random Advice</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '50px auto',
    width: '400px'
  },
  adviceBox: {
    margin: '20px 0',
    fontSize: '1.2em',
    color: '#333',
    minHeight: '50px'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer'
  }
};
