import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Site from "../pages/Site";
import Search from "../pages/Search";
import Create from "../pages/Create";

const Router = () => {
  return (
    <Routes>
      <Route exact path={"/"} Component={Accueil} />
      <Route exact path={"/search"} Component={Search} />
      <Route path="/site" Component={Site} />
      <Route path="/create" Component={Create} />
      <Route path="*" Component={Accueil} />
    </Routes>
  );
};

export default Router;
