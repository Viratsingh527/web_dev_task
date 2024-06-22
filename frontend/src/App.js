// src/App.js
import React, { useEffect, useState } from 'react';
import { getData } from './apiService';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Backend:</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;

