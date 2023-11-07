import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_REACT_APP_AUTH_KEY
      }
    };

    fetch('https://api.themoviedb.org/3/movie/285?language=en-US', options)
      .then(response => response.json())
      .then(data => {
        setJsonData(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;

  
