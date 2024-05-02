import React, { useState } from "react";

export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    email2: "",
    password2: ""
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
    if (values.username && values.email && values.password && values.email2 && values.password2) {
        // Check if the email addresses match and if the passwords match
        if ((values.email == values.email2) && (values.password == values.password2)) {
            setValid(true);
        }
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
              Welcome {values.firstName} {values.lastName}{" "}
            </h3>
            <div> Your registration was successful! </div>
          </div>
        )}
        {!valid && (
          <input
            class="form-field"
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
            class="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="last-name-error">Please enter an email address</span>
        )}

        {!valid && (
          <input
            class="form-field"
            type="email"
            placeholder="Repeat Email"
            name="email2"
            value={values.email2}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email2 && (
          <span id="email-error">Please repeat your email address</span>
        )}
        {submitted && values.email2 && values.email2 != values.email && (
          <span id="email-error">Email addresses do not match</span>
        )}
    
        {!valid && (
        <input
            class="form-field"
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
        <input
            class="form-field"
            type="password"
            placeholder="Repeat Password"
            name="password2"
            value={values.password2}
            onChange={handleInputChange}
        />
        )}

        {submitted && !values.password2 && (
            <span id="password-error">Please repeat your password</span>
        )}

        {submitted && values.password2 && values.password2 != values.password && (
            <span id="password-error">Passwords do not match</span>
        )}

        {!valid && (
          <button class="form-field" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
