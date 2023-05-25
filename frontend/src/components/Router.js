import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Site from "../pages/Site";

const Router = () => {
  return (
    <Routes>
      <Route exact path={"/"} Component={Accueil} />
      <Route exact path="/site" Component={Site} />
      <Route path="*" Component={Accueil} />
    </Routes>
  );
};

export default Router;
