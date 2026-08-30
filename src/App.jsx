import React from 'react';
import Forgot from './pages/admin/auth/Forgot';
import VerifyCode from './pages/admin/auth/VerifyCode';
import Login from './pages/admin/auth/login';
import Register from './pages/admin/auth/Register';
const App = () => {
  return (
    <div>
      <Login/>
      <Register/>
      <Forgot/>
      <VerifyCode/>
    </div>
  );
}

export default App;
