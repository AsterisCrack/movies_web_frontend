import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    email2: "",
    password2: "",
    name: "",
    phone: "",
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
    setErrors({});
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
                      nombre: values.name,
                      tel: values.phone,
                  }),
              });
              if (response.ok) {
                  navigate("/login");
              } else {
                  console.log("Registration failed");
                  // GEt error message
                  const data = await response.json();
                  // Place the errors in the errors state
                  setErrors(data);
  
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

        {errors.username && (
          <span className="span-error" id="username-error">{errors.username}</span>
        )}

        
        <input
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        

        {submitted && !values.email && (
          <span className="span-error" id="name-error">Please enter an email address</span>
        )}

        
        <input
          className="form-field"
          type="email"
          placeholder="Repeat Email"
          name="email2"
          value={values.email2}
          onChange={handleInputChange}
        />
        

        {submitted && !values.email2 && (
          <span className="span-error" id="email-error">Please repeat your email address</span>
        )}
        {submitted && values.email2 && values.email2 != values.email && (
          <span className="span-error" id="email-error">Email addresses do not match</span>
        )}
        {errors.email && (
          <span className="span-error" id="email-error">{errors.email}</span>
        )}

        
        <input
          className="form-field"
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
        />
        

        {submitted && !values.name && (
          <span className="span-error" id="name-error">Please enter your name</span>
        )}

        {errors.nombre && (
          <span className="span-error" id="name-error">{errors.nombre}</span>
        )}

        
        <input
          className="form-field"
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={values.phone}
          onChange={handleInputChange}
        />
        

        {submitted && !values.phone && (
          <span className="span-error" id="phone-error">Please enter your phone number</span>
        )}

        {errors.tel && (
          <span className="span-error" id="phone-error">{errors.tel}</span>
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
        
        <input
            className="form-field"
            type="password"
            placeholder="Repeat Password"
            name="password2"
            value={values.password2}
            onChange={handleInputChange}
        />
        

        {submitted && !values.password2 && (
            <span className="span-error" id="password-error">Please repeat your password</span>
        )}

        {submitted && values.password2 && values.password2 != values.password && (
            <span className="span-error" id="password-error">Passwords do not match</span>
        )}

        {submitted && values.password && !check_password_format(values.password) && (values.password == values.password2) && (
            <span className="span-error" id="password-error">Password must be at least 8 characters long and contain at least one digit, one uppercase and one lowercase</span>
        )}

        {errors.password && (
            <span className="span-error" id="password-error">{errors.password}</span>
        )}
        
        <button className="form-field" type="submit">
          Register
        </button>
        
      </form>
    </div>
  );
}
