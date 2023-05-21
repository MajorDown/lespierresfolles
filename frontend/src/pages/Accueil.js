import React from "react";

const Accueil = () => {
  return (
    <section>
      <h2>Menhir de la Pierre Levé</h2>
      <p className="place">Avrillé (85)</p>
      <div className="previewers">
        <div className="previewerLead">
          <img src="/images/menhir1.jpg" alt="" />
        </div>
        <div className="previewersList">
          <div className="previewer">
            <img src="/images/menhir1.jpg" alt="" />
          </div>
          <div className="previewer">
            <img src="/images/menhir2.jpg" alt="" />
          </div>
          <div className="previewer">
            <img src="/images/menhir3.jpg" alt="" />
          </div>
          <div className="previewer">
            <img src="/images/menhir4.jpg" alt="" />
          </div>
          <div className="previewer">
            <img src="/images/menhir5.jpg" alt="" />
          </div>
        </div>
        <p className="credits">crédit photos : Alex</p>
      </div>
      <div className="describer">
        <p>
          Menhir haut de 7 mètre de haut en plein centre ville d'Avrillé,
          derrière la mairie. Quelques pancartes relatent son historique autour.
        </p>
        <p>Type de structure : Menhir</p>
      </div>
    </section>
  );
};

export default Accueil;
