import React, { useState } from "react";

const Manipulable = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };
  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    setOffsetX(offsetX + event.clientX - startX);
    setOffsetY(offsetY + event.clientY - startY);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };
  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const newOffsetX = offsetX + touchX - startX;
    const newOffsetY = offsetY + touchY - startY;
    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
    setStartX(touchX);
    setStartY(touchY);
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    setOffsetX(offsetX + event.clientX - startX);
    setOffsetY(offsetY + event.clientY - startY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="manipulable"
      style={{
        cursor: "grab",
        position: "absolute",
        left: offsetX,
        top: offsetY,
        transition: "none",
      }}
      onMouseDown={(event) => handleMouseDown(event)}
      onTouchStart={(event) => handleTouchStart(event)}
      onMouseUp={(event) => handleMouseUp(event)}
      onTouchEnd={(event) => handleTouchEnd(event)}
      onMouseMove={(event) => handleMouseMove(event)}
      onTouchMove={(event) => handleTouchMove(event)}
    >
      {children}
    </div>
  );
};

export default Manipulable;
