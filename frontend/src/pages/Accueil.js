import React from "react";
import Carousel from "./Carousel";

const Accueil = () => {
  return (
    <section id="accueil">
      <h2>Le site de référencement des mégalithes de France</h2>
      <p>les derniers ajouts :</p>
      <Carousel
        time="10000"
        album={[
          "/images/menhir1.jpg",
          "/images/menhir2.jpg",
          "/images/menhir3.jpg",
          "/images/menhir4.jpg",
          "/images/menhir5.jpg",
        ]}
      />
      <p>
        Que vous souhaitiez silloner les routes à la découvertes des menhirs,
        dolmens et autre tumulus éparpillés sur notre belle contrée, ou que vous
        souhaitiez contribuer à cette base de donnée en apportant vos photos ou
        vos commentaires, Soyez les bienvenues !
      </p>
      <p>
        l'ensemble de la base de donnée est accessible à tous. <br />
        Toutefois, pour poster un nouveau site ou pour ajouter un commentaire,
        une authentification est recquise.
      </p>
      <p>
        Créé par des passionnés de gros cailoux, cette application gratuite à
        pour but de favoriser l'étude des mégalithes, leurs fonctions et leur
        sercrets.
      </p>
    </section>
  );
};

export default Accueil;
