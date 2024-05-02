import React, { useState } from "react";

export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.username && values.password) {
        setValid(true);
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.username}{" "}
            </h3>
            <div> Your login was successful! </div>
          </div>
        )}
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.username && (
          <span id="username-error">Please enter a username</span>
        )}

        {!valid && (
        <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
        />
        )} 

        {submitted && !values.password && (
            <span id="password-error">Please enter a password</span>
        )}

        {!valid && (
          <button className="form-field" type="submit">
            Login
          </button>
        )}
      </form>
    </div>
  );
}
