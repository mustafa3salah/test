

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  $(document).ready(function () {
    $('select').niceSelect();
  });





  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');

  function toggleScrolled() {
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Navmenu links active state on scroll
   */
  let navmenulinks = document.querySelectorAll('#navmenu a');

  function navmenuActive() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('#navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuActive);
  document.addEventListener('scroll', navmenuActive);

  /**
   * Adjust scroll position on load with URL hash links
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        e.preventDefault();
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 1);
      }
    }
  });




  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  /* new PureCounter();  */

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
        filters.addEventListener('click', function () {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });





  const myModal = document.getElementById('myModal')
  const myInput = document.getElementById('myInput')

  myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
  })



});


/**
   * Mobile nav toggle
   */
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToogle() {
  document.querySelector('body').classList.toggle('mobile-nav-active');
  mobileNavToggleBtn.classList.toggle('bi-list');
  mobileNavToggleBtn.classList.toggle('bi-x');
}
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

/**
 * Hide mobile nav on same-page/hash links
 */
document.querySelectorAll('#navmenu a').forEach(navmenu => {
  navmenu.addEventListener('click', () => {
    if (document.querySelector('.mobile-nav-active')) {
      mobileNavToogle();
    }
  });

});


/**
  * Toggle mobile nav dropdowns
  */
document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
  navmenu.addEventListener('click', function (e) {
    if (document.querySelector('.mobile-nav-active')) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    }
  });
});




const fieldset = document.querySelector(".fieldset");
const fields = document.querySelectorAll(".field");
const boxes = document.querySelectorAll(".box");

function handleInputField({ target }) {
  const value = target.value.slice(0, 1);
  target.value = value;

  const step = value ? 1 : -1;
  const fieldIndex = [...fields].findIndex((field) => field === target);
  const focusToIndex = fieldIndex + step;

  if (focusToIndex < 0 || focusToIndex >= fields.length) return;

  fields[focusToIndex].focus();
}
fields.forEach((field) => {
  field.addEventListener("input", handleInputField);
});




document.addEventListener("DOMContentLoaded", function () {
  const tab1 = document.getElementById("change-bg-1");
  const tab2 = document.getElementById("change-bg-2");
  const imageBack = document.querySelector("#bg-main");
  const image1 = document.querySelector(".img-fluid");
  const join = document.querySelector("#text-join");
  const bg = document.querySelector(".ff");

  tab2.addEventListener("click", function () {
    imageBack.style = "background: url(assets/img/sign2-bg.png)";
    image1.src = "../assets/img/logo-business.png";
    join.style = 'background: linear-gradient(272.83deg, #25948C 2.66%, #49B5AD 96.93%);';
    bg.style = 'background: rgba(15, 143, 122, 0.39);'
    join.textContent = "انضم الى الحلول أعمال";
    join.href = "./business/sign-up.html";
  });

  tab1.addEventListener("click", function () {
    imageBack.style = "background: url(assets/img/sign-bg.png)";
    image1.src = "../assets/img/logo-individual.svg";
    join.style = 'background: linear-gradient(272.83deg, #12379B 2.66%, #3859B4 96.93%);'
    bg.style = 'background: rgba(30, 45, 97, 0);'
    join.textContent = "انضم الى الحلول أفراد";
    join.href = "./Individual/sign-up.html ";
  });


  var toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach(function (button) {

    button.addEventListener("click", function () {
      console.log(toggleButtons);

      console.log(button);
      var input = button.parentElement.children[0];
      console.log(input);
      if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
      } else {
        input.setAttribute("type", "password");
      }
    });
  });



});





/**
   * Animation on scroll function and init
   */
function aosInit() {
  AOS.init({
    duration: 0,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

window.addEventListener('load', aosInit);


/**
 * Apply .scrolled class to the body as the page is scrolled down
 */
const selectBody = document.querySelector('body');
const selectHeader = document.querySelector('#header');

function toggleScrolled() {
  if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top')) return;
  window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}

document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', toggleScrolled);

/**
 * Scroll up sticky header to headers with .scroll-up-sticky class
 */
let lastScrollTop = 0;


/**
 * Navmenu links active state on scroll
 */
let navmenulinks = document.querySelectorAll('#navmenu a');

function navmenuActive() {
  navmenulinks.forEach(navmenulink => {
    if (!navmenulink.hash) return;
    let section = document.querySelector(navmenulink.hash);
    if (!section) return;
    let position = window.scrollY + 200;
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      document.querySelectorAll('#navmenu a.active').forEach(link => link.classList.remove('active'));
      navmenulink.classList.add('active');
    } else {
      navmenulink.classList.remove('active');
    }
  })
}
window.addEventListener('load', navmenuActive);
document.addEventListener('scroll', navmenuActive);

/**
 * Adjust scroll position on load with URL hash links
 */
window.addEventListener('load', function (e) {
  if (window.location.hash) {
    if (document.querySelector(window.location.hash)) {
      e.preventDefault();
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 1);
    }
  }
});



new Swiper('.hero-slider', {
  speed: 400,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    992: {
      slidesPerView: 1
    }
  }
});



document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}



