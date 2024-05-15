import React, { useState } from "react";

export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    email2: "",
    password2: "",
    name: "",
    phone: "",
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

  const check_password_format = (password) => {
    const valid_password = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(password);

    if (valid_password) {
        return password;
    } else {
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.username && values.email && values.password && values.email2 && values.password2 && values.name && values.phone) {
        // Check if the email addresses match and if the passwords match
        if ((values.email == values.email2) && (values.password == values.password2)) {
          // Check if the password is in the correct format
          if (check_password_format(values.password)) {
            try {
              const response = await fetch("http://127.0.0.1:8000/apps/users/", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      username: values.username,
                      email: values.email,
                      password: values.password,
                      name: values.name,
                      phone: values.phone,
                  }),
              });
              if (response.ok) {
                  setValid(true);
              } else {
                  console.log("Registration failed");
              }
            } catch (error) {
                console.error("Error:", error);
            }
          }
        }
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="form register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>
              {" "}
              Welcome {values.username}{" "}
            </h3>
            <div> Your registration was successful! </div>
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
          <span id="span-error username-error">Please enter a username</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="span-error name-error">Please enter an email address</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="email"
            placeholder="Repeat Email"
            name="email2"
            value={values.email2}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email2 && (
          <span id="span-error email-error">Please repeat your email address</span>
        )}
        {submitted && values.email2 && values.email2 != values.email && (
          <span id="span-error email-error">Email addresses do not match</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.name && (
          <span id="span-error name-error">Please enter your name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.phone && (
          <span id="span-error phone-error">Please enter your phone number</span>
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
            <span id="span-error password-error">Please enter a password</span>
        )}

        {!valid && (
        <input
            className="form-field"
            type="password"
            placeholder="Repeat Password"
            name="password2"
            value={values.password2}
            onChange={handleInputChange}
        />
        )}

        {submitted && !values.password2 && (
            <span id="span-error password-error">Please repeat your password</span>
        )}

        {submitted && values.password2 && values.password2 != values.password && (
            <span id="span-error password-error">Passwords do not match</span>
        )}

        {submitted && values.password && !check_password_format(values.password) && (values.password == values.password2) && (
            <span id="span-error password-error">Password must be at least 8 characters long and contain at least one digit, one uppercase and one lowercase</span>
        )}

        {!valid && (
          <button className="form-field" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
  );
}
