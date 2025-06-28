import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import BusRoute from './BusRoute';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // This will be called when login is successful
  const handleLoginSuccess = () => setLoggedIn(true);

  return (
    <div style={{ padding: 20 }}>
      <h1>Bus Route App</h1>
      {!loggedIn ? (
        <>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Signup</button>
          <hr />
          {showLogin
            ? <Login onLogin={handleLoginSuccess} />
            : <Signup />}
        </>
      ) : (
        <>
          <p>Welcome! You are logged in.</p>
          <BusRoute />
        </>
      )}
    </div>
  );
}

export default App;
