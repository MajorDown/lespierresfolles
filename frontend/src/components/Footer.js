import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to={"/charte"}>Charte d'utilisation</Link>
      <p>© Copyright 2023 - Tout droit réservé</p>
    </footer>
  );
};

export default Footer;
