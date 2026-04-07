"use client"

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://images.pexels.com/photos/32035936/pexels-photo-32035936.jpeg"
            alt="Slider image 1"
            className="image-slider-image"
          />
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/32035936/pexels-photo-32035936.jpeg"
            alt="Slider image 2"
            className="image-slider-image"
          />
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/32035936/pexels-photo-32035936.jpeg"
            alt="Slider image 3"
            className="image-slider-image"
          />
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/32035936/pexels-photo-32035936.jpeg"
            alt="Slider image 4"
            className="image-slider-image"
          />
        </div>
      </Slider>
    </div>
  );
}
