import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import '../../../styles/slider.css'

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    inifinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidetoScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <p className="review__text">
          "Oh my gosh, the Pho Burger is so good :v I tried 1 piece and I'm addicted, do you ship to Korea? :v "
        </p>
        <div className="slider__content d-flex align-items-center gap-3">
          <img src={ava01} alt="avatar" className="rounded"/>
          <h6>Rosé-BlackPink</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "Vegetarian pizza is very delicious but good for health. Recomment everyone to eat, you can eat 5 and you won't be afraid of being fat like me =)))"
        </p>
        <div className="slider__content d-flex align-items-center gap-3">
          <img src={ava02} alt="avatar" className="rounded"/>
          <h6>Cj-GtaSan</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "Wow, this is unbelievable. The bread here is very different from the outside. 1 good experience of Vietnamese food"
        </p>
        <div className="slider__content d-flex align-items-center gap-3">
          <img src={ava03} alt="avatar" className="rounded"/>
          <h6>Gordon Ramsey</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
