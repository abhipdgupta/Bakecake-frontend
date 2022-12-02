import React from "react";
import Axios from "axios";
import { useState } from "react";
import "../CSS/OrderForm.css";
export const OrderForm = ({ cart, setcart }) => {
  const [customer, setcustomer] = useState({
    username: "",
    address: "",
    email: "",
    phoneno: "",
    comment: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setcustomer({
      ...customer,
      [name]: value,
    });
  };
  const handleorder = (e) => {
    e.preventDefault();
    const data = [cart, customer];
    console.log(data);
    if (cart.length === 0) alert("CART IS EMPTY");
    else {
      console.log("place order clicked");
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders`, data)
        .then((response) => {
          if (cart.length === 0){ alert("CART IS EMPTY");
          
        }
          else {
            const order_form = document.getElementById("order_form");
            const place_order_btn = document.getElementById("place_order_btn");
            order_form.style.display = "none";
            place_order_btn.style.display = "flex";
            alert(`THANK YOU SO MUCH\nYour ORDER is PLACED with OREDR ID\n${response.data}\n !!!PLEASE NOTE IT!!!`);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`DUE TO SOME TECHNICAL DIFICULLTY\nCAN'T PLACE ORDER`)
        });
    }
    setcustomer({
      username: "",
      address: "",
      email: "",
      phoneno: "",
      comment: "",
    });
    setcart([]);
  };


  return (
    <>
      <form className="OrderForm contact-form" onSubmit={handleorder}>
        <label htmlFor="username">Full Name</label>
        <input
          type="text"
          autoComplete="on"
          value={customer.username}
          onChange={handleChange}
          name="username"
          id="username"
          required
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          autoComplete="on"
          value={customer.address}
          onChange={handleChange}
          name="address"
          id="address"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete="on"
          value={customer.email}
          onChange={handleChange}
          name="email"
          id="email"
          required
        />

        <label htmlFor="phoneno">WhatsApp Number</label>
        <input
          type="text"
          autoComplete="on"
          value={customer.phoneno}
          onChange={handleChange}
          name="phoneno"
          id="phoneno"
          required
        />

        <label htmlFor="comment">Name on cake</label>
        <input
          type="text"
          autoComplete="on"
          value={customer.comment}
          onChange={handleChange}
          name="comment"
          id="comment"
          required
        />

        <button className="submit_order_btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
