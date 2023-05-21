import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";

const Router = () => {
  return (
    <Routes>
      <Route exact path={"/"} Component={Accueil} />
      <Route path="*" Component={Accueil} />
    </Routes>
  );
};

export default Router;
