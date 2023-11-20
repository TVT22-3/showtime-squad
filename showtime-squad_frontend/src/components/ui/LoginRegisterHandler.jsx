import React, { useState } from 'react';
import Login from '../modals/Login.jsx';
import Register from '../modals/Register.jsx';
import ForgotPassword from '../modals/ForgotPassword.jsx';

const loadFontAwesomeScript = () => {
  const script = document.createElement('script');
  script.src = import.meta.env.VITE_REACT_APP_FONT_AWESOME_URL;
  script.crossOrigin = 'anonymous';
  script.async = true;
  document.head.appendChild(script);
};

loadFontAwesomeScript();


function LoginRegisterHandler() {
  const [formType, setFormType] = useState('login');

  const toggleForms = (type) => {
    console.log('Toggle Forms called with:', type);
    setFormType(type);
  };

  // Render the appropriate form based on the formType state
  const renderForm = () => {
    switch (formType) {
      case 'login':
        return <Login toggleForms={toggleForms} />;
      case 'register':
        return <Register toggleForms={toggleForms} />;
      case 'forgotPassword':
        return <ForgotPassword toggleForms={toggleForms} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
}

export default LoginRegisterHandler