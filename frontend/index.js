import { Router } from "./components/Router.js";
import { Accueil } from "./components/Accueil.js";
import { Create } from "./Components/Create.js";
import { Search } from "./Components/Search.js";

Accueil().renderIn("#accueil");
Search().renderIn("#search");
Create().renderIn("#create");

Router.init();
