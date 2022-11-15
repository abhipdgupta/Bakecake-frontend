import React from "react";
import { useState, useEffect } from "react";
import "../CSS/Cart.css";
import { OrderForm } from "../Components/OrderForm";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';


export const Cart = ({ cart, setcart }) => {
  const [subtotal, setsubtotal] = useState(0);
  

  const getsubtotal = () => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].pprice*2*cart[i].pquantity*cart[i].psize;
    }
    setsubtotal(sum);
  };

  const deleteitem = (item) => {
    let arr = [...cart];
    for (let i = 0; i < cart.length; i++) {
      if (arr[i].id === item.id && arr[i].psize===item.psize) {
        arr.splice(i, 1);
        i--;
        break;
      }
    }

    setcart(arr);
  };

  useEffect(() => {
    getsubtotal();
  });

  const placeorder = (e) => {
    if (cart.length === 0) alert("CART IS EMPTY");
    else {
      const order_form = document.getElementById("order_form");
      const place_order_btn = document.getElementById("place_order_btn");
      order_form.style.height="600px"
      order_form.style.display = "flex";
      place_order_btn.style.display = "none";
    }
  };
  const plusitem = (item) => {
    setcart((cart) =>
      cart.map((ele) =>
        item.id === ele.id && item.psize===ele.psize && ele.pquantity<3? { ...ele, pquantity: ele.pquantity + 1 } : ele
      )
    );
  };
  const minusitem = (item) => {
    setcart((cart) =>
      cart.map((ele) =>
        item.id === ele.id && item.psize===ele.psize && ele.pquantity>1? { ...ele, pquantity: ele.pquantity - 1 } : ele
      )
    );
  };
  return (
    <div className="csp">
      <div className="cart">
        {/* Card--> card
          Card.Title--> card-title
          Card.Img-->card-img-top */}
        <h1>CART ITEMS</h1>
        {cart.map((item, index) => {
          return (
            <div className="cart-item" key={index}>
              <img className="cart-img-top" src={`../Image/Products/${item.id}.jpg`} alt="Cart Item" />
              <div className="cart-title">{item.pname}</div>
              <div className="cart-price">Rs.{item.pprice*2*item.psize}</div>
              <div className="counter">
                <div
                  className="minus_item"
                  onClick={() => {
                    minusitem(item);
                  }}
                >
                  <RemoveRoundedIcon/>
                </div>
                <div className="item_quantity">{item.pquantity}</div>
                <div
                  className="plus_item"
                  onClick={() => {
                    plusitem(item);
                  }}
                >
                  <AddRoundedIcon/>
                </div>
              </div>
              <div className="item_size" >
                  {item.psize}
              </div>
              <div
                className="cart-delete"
                onClick={() => {
                  deleteitem(item);
                }}
              >
                <img
                  src="https://img.icons8.com/pastel-glyph/344/trash.png"
                  alt="delete"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="sub-total">
        <h1>SubTotal</h1>
        <h1>Rs.{subtotal}</h1>
      </div>

      <button
        id="place_order_btn"
        onClick={() => {
          placeorder(cart);
        }}
      >
        place order
      </button>
      <div id="order_form">
        <OrderForm cart={cart} setcart={setcart} />
      </div>
    </div>
  );
};
