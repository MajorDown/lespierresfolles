import React from "react";

const Accueil = () => {
  return (
    <section id="accueilSection">
      <h2>Le site de référencement des mégalithes de France</h2>
      <article id="album">
        <img
          id="album1"
          src="/images/dolmen_de_la_madeleine.jpg"
          alt="dolmen de la Madeleine"
        />
        <img
          id="album2"
          src="/images/menhir_de_la_rainière.jpg"
          alt="menhir de la Rainière"
        />
        <img
          id="album3"
          src="/images/dolmen_de_thiré.jpg"
          alt="dolmen de Thiré"
        />
        <img
          id="album4"
          src="/images/menhir_du_camp_de_césar.jpg"
          alt="menhir du camp de César"
        />
        <img
          id="album5"
          src="/images/menhirs_des_pierres_folles_du_follet.jpg"
          alt="menhirs des Pierres Folles du Follet"
        />
        <img
          id="album6"
          src="/images/tumulus_de_la_sulette.jpg"
          alt="tumulus de la Sulette"
        />
        <img
          id="album7"
          src="/images/dolmen_des_landes.jpg"
          alt="dolmen des Landes"
        />
      </article>

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
        Créé par des passionnés de gros cailloux, cette application gratuite à
        pour but de favoriser l'étude des mégalithes, leurs fonctions et leur
        sercrets.
      </p>
    </section>
  );
};

export default Accueil;
