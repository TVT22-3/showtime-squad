import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

function LoginRegisterHandler() {
  const [changeForm, setChangeForm] = useState(true);

  const toggleForms = () => {
    setChangeForm(!changeForm);
  };

  return (
    <div>
      {changeForm ? (
        <Login toggleForms={toggleForms} />
      ) : (
        <Register toggleForms={toggleForms} />
      )}
    </div>
  );
}

export default LoginRegisterHandler;