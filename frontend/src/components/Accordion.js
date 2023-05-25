import React, { useState } from "react";
import SvgMaker from "./SvgMaker";

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="accordion">
      <div className="accordionHeader" onClick={handleClick}>
        <p>{props.name}</p>
        {isOpen ? <SvgMaker item="up" /> : <SvgMaker item="down" />}
      </div>
      <div className={`accordionContent ${isOpen ? "open" : ""}`}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Accordion;
