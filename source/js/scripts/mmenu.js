const mmenu = () => {
  let hamburgerMenu = document.querySelector('.hamburger');


  document.addEventListener(
    "DOMContentLoaded", () => {
      let menuItemsList = document.querySelector(".site-sidebar__list");
      let logoName = document.querySelector('.site-logo-wrapper');

      new Mmenu("#my-menu", {
          "setSelected": {
            "hover": true,
            "parent": true
          },
          "extensions": [
            "position-back"
          ],
          hooks: {
            "open:start": (panel) => {
              hamburgerMenu.classList.add('is-active');
              menuItemsList.classList.add("site-sidebar__list--js-show");
              logoName.classList.add("site-logo-name--js-show");
            },
            "close:start": (panel) => {
              hamburgerMenu.classList.remove('is-active');
              menuItemsList.classList.remove("site-sidebar__list--js-show");
              logoName.classList.remove("site-logo-name--js-show");
            }
          },
          sidebar: {
            collapsed: "(min-width: 319px)",
            expanded: "(min-width: 1440px)"
          }
        }
      );
    }
  );
};

export {mmenu};
