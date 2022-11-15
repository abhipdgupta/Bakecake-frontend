import React from "react";

import { Link } from "react-router-dom";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import "../CSS/Category.css";

export const AvailableFlavour = ({ category }) => {
  return (
    <div className="category_container">
      <header>Available Flavours</header>
      <div className="category">
        {category.map((fav, index) => {
          return (
            <div className="category_wrapper" key={fav.category_id}>
              <Link
                className="category_links"
                to={`/category/${fav.category_name}`}
              >
               <CircleOutlinedIcon/>{fav.category_name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
