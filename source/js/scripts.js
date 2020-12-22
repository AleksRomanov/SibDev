var swiper = new Swiper('.reviews-swiper', {
  slidesPerView: 2,
  spaceBetween: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  on: {
    click: function () {
      let popup = document.querySelector('.reviews-popup-swiper');
      popup.classList.add('show');
      swiper2.init();
      swiper2.slideReset();
    },
  }
});

var swiper2 = new Swiper('.reviews-popup', {
  init: false,
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination2',
    clickable: true,
  },

  on: {
    init: function () {
      swiper2.slideTo(swiper.clickedIndex);
    },
  }
});


