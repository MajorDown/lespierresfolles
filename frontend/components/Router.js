export const Router = {
  init: function () {
    const links = document.querySelectorAll("a[href^='/']");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        // ACTUALISER L'URL DE LA PAGE
        const url = link.getAttribute("href");
        history.pushState(null, "", url);

        // DESACTIVER CHAQUE SECTION
        const sections = document.querySelectorAll("section");
        for (const section of sections) {
          section.classList.remove("active");
        }

        // ACTIVE LA BONNE SECTION
        const sectionId = url.substring(1);
        const section = document.getElementById(sectionId);
        section.classList.add("active");
      });
    }
  },
};
