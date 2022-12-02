import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import "../CSS/Dashboard.css";
export const Dashboard = ({ shownav, setshownav, banner, category}) => {
 
  useEffect(() => {
    setshownav(false);
  });
  const [customers, setcustomers] = useState([]);
  const [orders, setorders] = useState([]);
  const getcustomers = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/customers`)
      .then((response) => {
        console.log(response.data);

        setcustomers(response.data.customers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getorders = ({ order_id }) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/${order_id}`)
      .then((response) => {
        console.log(response.data);

        setorders(response.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getcustomers();
    // getorders();
  }, []);
  return (
    <div>
      <h1>Customers details</h1>
      <div className="customer_table">
        <table>
          <tbody>
            <tr>
              <th>username</th>
              <th>phone no</th>
              <th>order date</th>
              <th>email id</th>
              <th>order id</th>
              <th>comment</th>
              <th>Action</th>
            </tr>

            {customers.map((customer, index) => {
              return (
                <tr key={index}>
                  <td>{customer.username}</td>
                  <td>{customer.phone_no}</td>
                  <td>
                    <div>{customer.date_of_order.split("T")[0]}</div>
                    <div>
                      {customer.date_of_order.split("T")[1].split(".")[0]}
                    </div>
                  </td>

                  <td>{customer.email}</td>
                  <td>{customer.order_id}</td>
                  <td>{customer.comment}</td>
                  <td>
                    <button  onClick={() => getorders(customer)}>
                      View orders
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Orders</h1>
        <table>
          <tbody>
            {orders.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.product_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
