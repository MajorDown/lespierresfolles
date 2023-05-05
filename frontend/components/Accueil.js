export function Accueil(props) {
  const html = /*html*/ `
    <h2>Bienvenue sur notre application dédié aux mégalithes ! </h2>
    <p>Lorem ipsum dolor sit <span>amet</span> consectetur adipisicing elit. Aliquam 
    ipsam sequi odio natus excepturi rerum eveniet ad quo ipsa maiores.
    </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam 
    ipsam sequi odio natus excepturi rerum eveniet ad quo ipsa maiores.
    </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam 
    ipsam sequi odio natus excepturi rerum eveniet ad quo ipsa maiores.
    </p>
  `;

  return {
    renderIn: (target) => {
      document.querySelector(target).innerHTML += html;
    },
    html: html,
  };
}

export function AccueilScript() {}
