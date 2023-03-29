import { validate } from "./validation.js";

const inputs = document.querySelectorAll(".contact__input, .contact__textarea");

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

/* Portfolio Swiper */
let swiper = new Swiper(".portfolio__container", {
  spaceBetween: 24,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // breakpoints: {
  //   1200: {
  //     slidesPerView: 2,
  //     spaceBetween: -56,
  //   },
  // },
});

/* Testimonial */

/* Scroll Sections Active Link */
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const sectionsClass = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/* Change background header */
function scrollHeader() {
  const header = document.querySelector("#header");
  this.scrollY >= 50 // was 80
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* Show Scroll Up */
function scrollUp() {
  const scrollUp = document.querySelector("#scroll-up");
  this.scrollY >= 350 /*WAS 560*/
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
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

const changeLanguage = async (lan) => {
  console.log(lan);
  const req = await fetch(
    `https://github.com/juliozm20/Portfolio/blob/master/languages/${lan}.json`
  );
  const content = await req.json();
  for (const texts of textChange) {
    const section = texts.dataset.section;
    const value = texts.dataset.value;

    if (section === "email-error") {
      if (lan === "ES") {
        if (email.innerText === "The Email field cannot be empty") {
          email.innerText = "El correo no puede estar vacío";
        } else if (email.innerText === "The Email format is invalid") {
          email.innerText = "El formato del correo es invalido";
        }
      } else if (lan === "EN") {
        if (email.innerText === "The Email field cannot be empty") {
          email.innerText = "El correo no puede estar vacío";
        } else if (email.innerText === "El formato del correo es invalido") {
          email.innerText = "The Email format is invalid";
        }
      }
    } else {
      texts.innerHTML = content[section][value];
    }
  }
};

language.addEventListener("click", (e) => {
  e.target.innerText === "EN"
    ? (e.target.innerText = "ES")
    : (e.target.innerText = "EN");
  changeLanguage(e.target.innerText);
});

/*EMAIL JS*/
const contactForm = document.querySelector("#contact-form");
const contactName = document.querySelector("#contact-name");
const contactEmail = document.querySelector("#contact-email");
const contactProject = document.querySelector("#contact-project");
const contactMessage = document.querySelector("#contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_bpfmllu",
      "template_fbau4yw",
      "#contact-form",
      "IlfDD62pq5eT5jrwQ"
    )
    .then(
      () => {
        if (language.innerText === "EN") {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            showConfirmButton: false,
            timer: 3500,
            width: 600,
            padding: "3em",
            backdrop: `
    rgba(0,0,123,0.4)
    url("/img/nyan-cat.gif")
    left top
    no-repeat
  `,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Mensaje Enviado!",
            showConfirmButton: false,
            timer: 3500,
            width: 600,
            padding: "3em",
            backdrop: `
    rgba(0,0,123,0.4)
    url("/img/nyan-cat.gif")
    left top
    no-repeat
  `,
          });
        }
      },
      (error) => {
        if (language.innerText === "EN") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Un error ha ocurrido!",
          });
        }
      }
    );
  contactName.value = "";
  contactEmail.value = "";
  contactProject.value = "";
  contactMessage.value = "";
};

contactForm.addEventListener("submit", sendEmail);

//scroll reveal
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 300,
  // reset:true
});

sr.reveal(`.home__title`);
sr.reveal(
  `.home__subtitle, .home__description, .home__social-icon, .home__img, .button--flex`,
  {
    delay: 200,
    origin: "bottom",
    interval: 100,
  }
);
sr.reveal(`.about`);
sr.reveal(`.left-skills`, { origin: "left" });
sr.reveal(`.right-skills`, { origin: "right" });
sr.reveal(`.qualification__sections`);
sr.reveal(`.portfolio__container`);
sr.reveal(`.contact__container`);
