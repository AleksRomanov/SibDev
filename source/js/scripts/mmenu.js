const mmenu = () => {
  // let hamburgerMenu = document.querySelector('.hamburger');


  document.addEventListener(
    "DOMContentLoaded", () => {
      let menuItemsList = document.querySelector(".site-sidebar__list");

      new Mmenu("#my-menu", {
          "setSelected": {
            "hover": true,
            "parent": true
          },
          "extensions": [
            "position-back"
            // "all": ["theme-white"],
            // "(max-width: 12px)": ["fullscreen"]
            // "fullscreen"
          ],
          hooks: {
            "open:start": (panel) => {
              // hamburgerMenu.classList.add('is-active');
              menuItemsList.classList.add("site-sidebar__list--js-show");
            },
            "close:start": (panel) => {
              // hamburgerMenu.classList.remove('is-active');
              menuItemsList.classList.remove("site-sidebar__list--js-show");

            }
          },
          sidebar: {
            collapsed: "(min-width: 320px)",
            expanded: "(min-width: 1440px)"
          }
        }
      );
    }
  );
};

export {mmenu};
