export function Accueil(props) {
  const html = /*html*/ `
    <h2>Menhir de la Pierre Levé</h2>
    <p class="place">Avrillé (85)</p>
    <div class="previewers">
      <div class="previewerLead">
        <img src="./images/menhir1.jpg" alt="" />
      </div>
      <div class="previewersList">
        <div class="previewer">
          <img src="./images/menhir1.jpg" alt="" />
        </div>
        <div class="previewer">
          <img src="./images/menhir2.jpg" alt="" />
        </div>
        <div class="previewer">
          <img src="./images/menhir3.jpg" alt="" />
        </div> 
        <div class="previewer">
          <img src="./images/menhir4.jpg" alt="" />
        </div> 
        <div class="previewer">
          <img src="./images/menhir5.jpg" alt="" />
        </div>       
      </div>
      <p class="credits">crédit photos : Alex</p>
    </div>
    <div class="describer">
    <p>Menhir haut de 7 mètre de haut en plein centre ville d'Avrillé, derrière la mairie. Quelques pancartes relatent son historique autour.</p>
    <p>Type de structure : Menhir</p>
    </div>
  `;

  return {
    renderIn: (target) => {
      document.querySelector(target).innerHTML += html;
    },
    html: html,
  };
}

export function AccueilScript() {}
