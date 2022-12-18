import Axios from "axios";
import React, { useEffect, useState } from "react";
import "../CSS/login.css";
export const Login = ({ admin, setadmin, shownav, setshownav }) => {
  useEffect(() => {
    login_page_animation();
    setshownav(false);
  });
  const login_page_animation = () => {
    const inputs = document.getElementsByClassName("admin-form-input");
    const labels = document.getElementsByClassName("admin-form-label");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].onfocus = () => {
        labels[i].style.transform = "translateY(10px)";
      };
    }
  };
  const [admin_info, setadmin_info] = useState({
    user: "",
    pass: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setadmin_info({
      ...admin_info,
      [name]: value,
    });
  };
  const handleAdmin = (e) => {
    e.preventDefault();

    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/login/admin`, admin_info)
      .then((response) => {
        setadmin(response.data.validation);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(admin);
    setadmin_info({
      user: "",
      pass: "",
    });
  };
  return (
    <div id="register-login-container">
      <div id="avatar"></div>

      <span>Admin Login</span>
      <form id="register-login-form" onSubmit={handleAdmin}>
        <label htmlFor="user" className="admin-form-label">
          User Name
        </label>
        <input
          className="admin-form-input"
          type="text"
          autoComplete="on"
          value={admin_info.user}
          onChange={handleChange}
          name="user"
          id="user"
          required
        />

        <label htmlFor="password" className="admin-form-label">
          Password
        </label>
        <input
          className="admin-form-input"
          type="password"
          autoComplete="on"
          value={admin_info.pass}
          onChange={handleChange}
          name="pass"
          id="password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
