import React from "react";
import Accordion from "../components/Accordion";

const Site = () => {
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
        <Accordion name="autres informations">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          minima fuga esse ipsum neque aliquam quia accusantium a accusamus
          similique?
        </Accordion>
      </div>
    </section>
  );
};

export default Site;
