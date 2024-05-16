import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.username && values.password) {
      setErrors({});
      // Send the data to the server
      const response = await fetch("http://127.0.0.1:8000/apps/users/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.log("Login failed");
        setErrors({ message: "Invalid username or password" });
      }

    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="form register-form" onSubmit={handleSubmit}>

        <input
          className="form-field"
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleInputChange}
        />
        

        {submitted && !values.username && (
          <span className="span-error" id="username-error">Please enter a username</span>
        )}

  
        <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
        />
        

        {submitted && !values.password && (
            <span className="span-error" id="password-error">Please enter a password</span>
        )}
        {errors.message && (
          <span className="span-error" id="login-error">{errors.message}</span>
        )}

        <button className="form-field" type="submit">
          Login
        </button>

      </form>
    </div>
  );
}
