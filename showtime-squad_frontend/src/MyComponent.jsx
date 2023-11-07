import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTJhZGJmMTBiZGYyOWRlZGNmNTIyOGMwZmViNWY3YiIsInN1YiI6IjY1NDI0YjdlNDFhNTYxMDBmZTZkY2M4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NXFmWfjITHnStkPPRsgjVJlNINman2gOq02Gv18GBrk'
      }
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
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

  
