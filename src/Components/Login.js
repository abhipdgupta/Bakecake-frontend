import Axios from "axios";
import React, { useEffect, useState } from "react";

export const Login = ({ admin, setadmin, shownav, setshownav }) => {
  useEffect(() => {
    setshownav(false);
  });
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

    Axios.post("http://localhost:3001/login/admin", admin_info)
      .then((response) => {
        setadmin(response.data.validation);
      })
      .catch((err) => {
        alert("Technical difficulty")
       
      });
     
    setadmin_info({
      user: "",
      pass: "",
    });
  };
  return (
    <div>
      <form  onSubmit={handleAdmin}>
        <label htmlFor="username">User</label>
        <input
          type="text"
          autoComplete="on"
          value={admin_info.user}
          onChange={handleChange}
          name="user"
          id="user"
          required
        />

        <label htmlFor="address">Password</label>
        <input
          type="password"
          autoComplete="on"
          value={admin_info.pass}
          onChange={handleChange}
          name="pass"
          id="pass"
          required
        />

        <button  type="submit">
          Submit
        </button>
      </form>

    
    </div>
  );
};
