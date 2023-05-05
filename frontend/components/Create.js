export function Create(props) {
  const html = /*html*/ `
        <h2>section Create</h2>
  
      `;

  return {
    renderIn: (target) => {
      document.querySelector(target).innerHTML += html;
    },
    html: html,
  };
}

export function CreateScript() {}
