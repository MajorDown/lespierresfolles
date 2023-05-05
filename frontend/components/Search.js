export function Search(props) {
  const html = /*html*/ `
      <h2>section Search</h2>

    `;

  return {
    renderIn: (target) => {
      document.querySelector(target).innerHTML += html;
    },
    html: html,
  };
}

export function SearchScript() {}
