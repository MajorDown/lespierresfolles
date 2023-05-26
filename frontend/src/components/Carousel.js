import React, { useState, useEffect } from "react";
import SvgMaker from "./SvgMaker";

const Carousel = ({ album, time }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(album.length > 1);

  useEffect(() => {
    setIsActive(album.length > 1);
  }, [album]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % album.length);
    }, time);
    return () => clearInterval(interval);
  }, [currentIndex, album.length]);

  function handlePrev() {
    setCurrentIndex((currentIndex - 1 + album.length) % album.length);
  }

  function handleNext() {
    setCurrentIndex((currentIndex + 1) % album.length);
  }

  return (
    <div className="carousel">
      <img id="carouselItem" src={album[currentIndex]} alt="carousel item" />
      <div className="arrow-left" onClick={handlePrev}>
        <SvgMaker item="arrow-left" onClick={handlePrev} />
      </div>
      <div className="arrow-right" onClick={handleNext}>
        <SvgMaker item="arrow-right" onClick={handleNext} />
      </div>
      <p id="item-name">Menhir du Camp de César</p>
    </div>
  );
};

export default Carousel;
