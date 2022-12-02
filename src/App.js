import React from "react";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Cart } from "./Pages/Cart";
import { OrderForm } from "./Components/OrderForm";
import { Dashboard } from "./Pages/Dashboard";
import { Products } from "./Components/Products";

import { Scrolltotop } from "./Components/Scrolltotop";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { Login } from "./Components/Login";
import { Atc } from "./Components/Atc";

const App = () => {
  let cartitemsLOCAL = JSON.parse(sessionStorage.getItem("cartitems"));
  if (!cartitemsLOCAL) cartitemsLOCAL = [];

  let adminStatusLOCAL = false;
  adminStatusLOCAL = JSON.parse(sessionStorage.getItem("admin_status"));

  const [banner, setbanner] = useState([]);
  const [category, setcategory] = useState([]);
  const [cart, setcart] = useState(cartitemsLOCAL);
  const [product, setproduct] = useState([]);
  const [itemno, setitemno] = useState(0);
  const [shownav, setshownav] = useState(true);
  const [admin, setadmin] = useState(adminStatusLOCAL);

  const getbanner = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/banner`)
      .then((response) => {
        console.log(response);

        setbanner(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getcategory = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/category`)
      .then((response) => {
        console.log(response.data);

        setcategory(response.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getproduct = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((response) => {
        console.log(response.data);
        let arr = response.data.products;
        arr.forEach((element) => {
          element.quantity = 1;
          element.size = 0.5;
        });

        setproduct(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //From Products page
  const handleAddToCart = (
    productid,
    productname,
    productprice,
    productquantity,
    cakeSize
  ) => {
    let present_in_cart = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productid && cart[i].psize === cakeSize) {
        present_in_cart = true;
        if (cart[i].pquantity >= 3) {
          alert("CANOT ADD MORE");
        }
        break;
      }
    }
    if (present_in_cart) {
      setcart((cart) =>
        cart.map((ele) =>
          productid === ele.id && ele.pquantity < 3
            ? { ...ele, pquantity: ele.pquantity + 1 }
            : ele
        )
      );
    } else {
      setcart([
        ...cart,
        {
          id: productid,
          pname: productname,
          pprice: productprice,
          pquantity: productquantity,
          psize: cakeSize,
        },
      ]);
    }
    
    const element = document.getElementsByClassName("atc_animation");
    console.log(element)
    element[0].classList.add("start_atc_animation");
    setTimeout(()=>{
      element[0].classList.remove("start_atc_animation");
    },1000)

    console.log(cart);
  };

  useEffect(() => {
    sessionStorage.setItem("cartitems", JSON.stringify(cart));
    let sum = 0;
    cart.forEach((element) => {
      sum += element.pquantity;
    });
    setitemno(sum);
  }, [cart]);

  useEffect(() => {
    getbanner();
    getcategory();
    getproduct();
  }, []);
  
  useEffect(() => {
    sessionStorage.setItem("admin_status", JSON.stringify(admin));
  }, [admin]);
  return (
    <>
      <Router>
        <Scrolltotop />
        {shownav && <Navbar itemno={itemno} />}
        <Atc />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                banner={banner}
                category={category}
                product={product}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/cart"
            element={<Cart cart={cart} setcart={setcart} />}
          />
          <Route
            path="/place-order"
            element={<OrderForm cart={cart} setcart={setcart} />}
          />

          <Route
            path="/dashboard"
            element={
              admin ? (
                <Dashboard
                  shownav={shownav}
                  setshownav={setshownav}
                  banner={banner}
                  category={category}
                />
              ) : (
                <Navigate replace to={"/dashboard/login-admin"} />
              )
            }
          />

          <Route
            path="/dashboard/login-admin"
            element={
              !admin ? (
                <Login
                  admin={admin}
                  setadmin={setadmin}
                  shownav={shownav}
                  setshownav={setshownav}
                />
              ) : (
                <Navigate replace to={"/dashboard"} />
              )
            }
          />
          <Route
            path={"/category/:category_name"}
            element={
              <Products product={product} onAddToCart={handleAddToCart} />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
