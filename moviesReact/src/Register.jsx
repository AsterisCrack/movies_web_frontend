import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateFields();
  };

  const handleRepeatEmailChange = (event) => {
    setRepeatEmail(event.target.value);
    validateFields();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validateFields();
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    validateFields();
  };

  const validateFields = () => {
    
    if (email !== repeatEmail) {
    setErrorMessage('Emails do not match');
    setIsDisabled(true);
    } else if (password !== repeatPassword) {
    setErrorMessage('Passwords do not match');
    setIsDisabled(true);
    } else if (!username || !email || !repeatEmail || !password || !repeatPassword) {
    setErrorMessage('All fields are required');
    setIsDisabled(false);
    } else {
      setErrorMessage('');
      setIsDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your register logic here, such as sending a request to a server
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="repeatEmail">Repeat Email:</label>
          <input
            type="email"
            id="repeatEmail"
            value={repeatEmail}
            onChange={handleRepeatEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
          />
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit" disabled={isDisabled}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;