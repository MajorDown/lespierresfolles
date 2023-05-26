import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Site from "../pages/Site";
import Search from "../pages/Search";

const Router = () => {
  return (
    <Routes>
      <Route exact path={"/"} Component={Accueil} />
      <Route exact path={"/search"} Component={Search} />
      <Route path="/site" Component={Site} />
      <Route path="*" Component={Accueil} />
    </Routes>
  );
};

export default Router;
