import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../CSS/Banner.css";

export const Banner = ({ banner }) => {
  return (
    <div className="carousel">
      <Carousel>
        {banner.map((ban, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                src={`../Image/Banners/${ban.image_name}.jpg`}
                className="d-block w-100 carousel_img"
                alt={ban.idbanner}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
