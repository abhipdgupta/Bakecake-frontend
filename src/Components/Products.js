import React, { useEffect } from "react";
import "../CSS/product.css";
import { useParams } from "react-router-dom";


export const Products = ({ product, onAddToCart }) => {
  const { category_name } = useParams();

  const optionhandler = (e, id, index) => {
   
    let price = document.getElementsByClassName("item_price");
  
    for (let i = 0; i < product.length; i++) {
      if (product[i].ID === id) {
        product[i].size = e.target.value;

        price[i].innerHTML = `Rs.${
          product[i].PRICE_PER_HALF_KG_RS * 2 * product[i].size
        }`;
       
      }
    }
  };

  

  return (
    <div className="product_container">
      <header>ALL PRODUCTS</header>

      <div className="products">
        {product.map((prod, index) => {
          return (
            <div
              className={`card_wrapper  ${
                category_name === undefined || category_name === prod.CATEGORY
                  ? ""
                  : "display_none"
              }`}
              key={index}
            >
              <div className="card_image">
                <img src={`../Image/Products/${prod.ID}.jpg`} alt="product" />
              </div>

              <div className="card_title">{prod.NAME}</div>
              <div className="card_info_section">
                <div className="item_price">Rs.{prod.PRICE_PER_HALF_KG_RS}</div>
                <div className="item_size">
                  <label htmlFor="size">SIZE</label>
                  <select
                    name="size"
                    id="size"
                    onChange={(e) => optionhandler(e, prod.ID, index)}
                  >
                    <option value=".5">1/2 Kg</option>
                    <option value="1">1 Kg</option>
                    <option value="2">2 Kg</option>
                    <option value="3">3 Kg</option>
                  </select>
                </div>
              </div>
              <button className="btn_atc" id={`btn-${prod.ID}`}
                onClick={() =>
                  onAddToCart(
                    prod.ID,
                    prod.NAME,
                    prod.PRICE_PER_HALF_KG_RS,
                    prod.quantity,
                    prod.size
                  )
                }
              >
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
