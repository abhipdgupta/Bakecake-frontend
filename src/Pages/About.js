import React from "react";

import "../CSS/about.css";
export const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-img">
          <img src="../Image/about_img.png" alt="Owner_image"></img>
        </div>

        <div className="about-paragraph">
          <p>NILAKHI GAUTAM</p>
          <p>
            “ STARTED BAKING CAKES AS A HOBBY BUT WITH TIME IT BECAME ONE OF MY
            FAVOURITES TIME KILLER...BAKING CAKES AND FULFILLING THE WISHES OF
            MANY SINCE 2.5 YEARS... YOUR CAKES WILL BE PREPARED WITH UTMOST LOVE
            AND CARE... HAVE A DELICIOUS DAY ”
          </p>
        </div>

        <div className="contact-me">
          <p>Contact Me</p>
          <div className="social-media">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="instagram"
              ></img>
            </a>
          </div>
          <div className="social-media">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="instagram"
              ></img>
            </a>
          </div>
          <div className="social-media">
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="instagram"
              ></img>
            </a>
          </div>
        </div>

        <div className="contact-form">
          <form
            action="mailto:testingabhi007@gmail.com" 
            method="post"
            className="contact-form-inputs"
          >
            <input
              type="text"
              name="username"
              placeholder="Name"
              autoComplete="off"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              autoComplete="off"
              required
            />

            <textarea
              name="message"
              placeholder="Enter Your Message"
              required
            ></textarea>
            <input type="submit" />
          </form>
        </div>
        
      </div>
    </>
  );
};
