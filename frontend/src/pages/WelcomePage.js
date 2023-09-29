import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// Define custom arrow components
const CustomPrevArrow = (props) => (
  <button {...props} className="slick-prev">
    &#8592; {/* Left arrow icon */}
  </button>
);

const CustomNextArrow = (props) => (
  <button {...props} className="slick-next">
    &#8594; {/* Right arrow icon */}
  </button>
);

// const Carousel = () => {};
const WelcomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000, // Transition speed in milliseconds
    autoplay: true, // Autoplay the carousel
    autoplaySpeed: 1000, // Autoplay interval in milliseconds (1 second)
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Custom left arrow component
    nextArrow: <CustomNextArrow />,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {/**First Image */}
        <div className="welcome first">
          <div className="bigwords">
            <h1>Lorem Ipsum1</h1>
          </div>

          <div className="smallwords">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse laoreet nunc a ipsum consectetur elementum. In et
              massa at nulla aliquet
            </p>
          </div>
          <div className={currentSlide === 0 ? "startbtn show" : "startbtn"}>
            <Link to="/login">
              <button>Get Started &rarr; </button>
            </Link>
          </div>
        </div>
        {/* *Second Image*/}
        <div className="welcome second">
          <div className="fullbody">
            <div className="bigwords">
              <h1>Lorem Ipsum2</h1>
            </div>

            <div className="smallwords">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse laoreet nunc a ipsum consectetur elementum. In et
                massa at nulla aliquet
              </p>
            </div>
            <div className={currentSlide === 1 ? "startbtn show" : "startbtn"}>
              <Link to="/login">
                <button>Get Started &rarr; </button>
              </Link>
            </div>
          </div>
        </div>
        {/**Third Image */}
        <div className="welcome third">
          <div className="fullbody">
            <div className="bigwords">
              <h1>Lorem Ipsum3</h1>
            </div>

            <div className="smallwords">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse laoreet nunc a ipsum consectetur elementum. In et
                massa at nulla aliquet
              </p>
            </div>
            <div className="startbtn">
              <Link to="/login">
                <button>Get Started &rarr; </button>
              </Link>
            </div>
          </div>
        </div>{" "}
      </Slider>
    </div>
  );
};
export default WelcomePage;
