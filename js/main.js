//window.addEventListener('load', setup);

import { validate } from "/js/validation.js";

const inputs = document.querySelectorAll("#form-data");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    validate(input.target);
  });
});

/* show/hide menu */
const navMenu = document.querySelector("#nav-menu");
const navToggle = document.querySelector("#nav-toggle");
const navClose = document.querySelector("#nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* Remove menu mobile*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.querySelector("#nav-menu");
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/* Accordion Skills */
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;
  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/* Qualifications tab */
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/* Services Modal */

// const get = document.getElementById.bind(document);

const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = (modalclick) =>
  modalViews[modalclick].classList.add("active-modal");

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => modal(i));
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

// function setup() {
//    let modalRoot = get('main');
//    modalRoot.addEventListener('click', rootClick)

//    function rootClick() {
//       modalViews.classList.remove('active-modal');
//    }
// }

/* Portfolio Swiper */
// var swiper = new Swiper(".portfolio__container", {
//    spaceBetween: 30,
//    centeredSlides: true,
//    loop: true,
//    // autoplay: {
//    //    delay: 5000,
//    //    disableOnInteraction: false,
//    // },
//    pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//    },
//    navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//    },
// });

/* Testimonial */

/* Scroll Sections Active Link */
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/* Change background header */
function scrollHeader() {
  const nav = document.querySelector("#header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* Show Scroll Up */
function scrollUp() {
  const scrollUp = document.querySelector("#scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/* Light/Dark theme */
const themeButton = document.querySelector("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//Language

const language = document.querySelector("#lang");

const textChange = document.querySelectorAll("[data-section]");

const email = document.querySelector("#email-err");
let emailArr = email.getAttribute("data-value").split(";");
const test = document.querySelectorAll("input[type=email]");

const changeLanguage = async (lan) => {
  const req = await fetch(`../languages/${lan}.json`);
  const content = await req.json();
  for (const texts of textChange) {
    const section = texts.dataset.section;
    const value = texts.dataset.value;
    if (section === "email-error") {
      // debugger;
      for (let i = 0; i < emailArr.length; i++) {
        email.innerHTML = content[section][i];
      }
    }
    texts.innerHTML = content[section][value];
  }
};

language.addEventListener("click", (e) => {
  changeLanguage(e.target.innerText);
  e.target.innerText === "ES"
    ? (e.target.innerText = "EN")
    : (e.target.innerText = "ES");
});
