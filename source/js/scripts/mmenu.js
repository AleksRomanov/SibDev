const mmenu = () => {
  // let hamburgerMenu = document.querySelector('.hamburger');


  document.addEventListener(
    "DOMContentLoaded", () => {

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
          sidebar: {
            collapsed: "(min-width: 320px)",
            expanded: "(min-width: 1440px)"
          }
        }

        // hooks: {
        //   "open:start": (panel) => {
        //     hamburgerMenu.classList.add('is-active');
        //     console.log("Started opening panel: ");
        //   },
        //   "close:start": (panel) => {
        //     hamburgerMenu.classList.remove('is-active');
        //     console.log("Finished opening panel: ");
        //   }
        // },
      );
    }
  );
};

export {mmenu};
