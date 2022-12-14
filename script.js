"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//for (let i = 0; i < btnsOpenModal.length; i++) = replaced with forEach
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////
//SELECTING ELEMENTS
console.log(document.documentElement); // select the entire HTML
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button"); // all elements with button (live display)
console.log(allButtons);

console.log(document.getElementsByClassName("btn")); //HTM Collection

// Creating and inserting elements
// .insertAdjacentHTML => inserting html code
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent =
  "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); // prepend adds it as the FIRST child of header
header.append(message); // append adds it as the LAST child of header
// header.append(message.cloneNode(true)); // copying and displaying multiple messages

// test fade
// Set the initial opacity to 1
message.style.opacity = 1;

// Create a function to fade out the element
function fadeOut() {
  // Decrease the element's opacity by 0.1 every 30 milliseconds
  const tick = function () {
    message.style.opacity = +message.style.opacity - 0.02;

    // Stop the animation when the element is fully invisible
    if (+message.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 30);
    }
  };

  // Start the animation
  tick();
}

// remove cookie message
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    fadeOut();
    setTimeout(function () {
      message.remove();
    }, 1000);

    //oldway:
    //message.parentElement.removeChild(message);
  });

// Styles
//message.style.backgroundColor = '#37383d';
message.style.width = "120%";

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color); // a big object with all properties so we define which one we want
console.log(getComputedStyle(message).height); // a big object with all properties so we define which one we want

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px"; // odvojili smo broj sa stringa od px i pretvorili u num
console.log(getComputedStyle(message).height); // a big object with all properties so we define which one we want

document.documentElement.style.setProperty("--color-primary", "#5ec576"); // izabrali smo color iz root i promjenili

// Atributes
// standard
const logo = document.querySelector(".nav__logo");
console.log(logo);
console.log(logo.src); // displays the alt/src or whatever we call from the img (absolute atribute)
console.log(logo.className); // we need to type className to get the class

logo.alt = "Beatiful minimalist logo"; // changing the alt

// non-standard
console.log(logo.designer); // not a standard property so its undefined
console.log(logo.getAttribute("designer")); // with getAttribute we can get the non standard atribute
logo.setAttribute("company", "Bankist"); // replacing and creating a new atribute wit setAttribute

console.log(logo.getAttribute("src")); // (relative version, we need to use getAttribute to get a relative version)

const link = document.querySelector(".nav__link--btn");
console.log(link.href); // absolute
console.log(link.getAttribute("href")); // relative (as displayed in HTML)

// Data atributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c");

// dont do that
logo.className = "Jonas";

// Implement scroll on click
// old way
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  //e.preventDefault();

  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // dispaying current coordinations of the page
  console.log("Current scroll (X/Y)", window.pageXOffset, pageYOffset); // current scroll position

  console.log(
    "Heigth/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // geting height and width of the viewport

  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href"); // selecing the ID name
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//
// Building tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// selecting buttons:
//tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))); // this is bad practice
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab"); //this way we get the button if we click the span number
  console.log(clicked);

  //modern way
  if (!clicked) return; // if there is nothing clicked return function

  // Remove active classes
  tabs.forEach((el) => el.classList.remove("operations__tab--active"));
  tabsContent.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );
  // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  console.log(clicked.dataset.tab); // getting the number of the tab

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  const slider = document.querySelector(".slider");
  // slider.style.transform = 'scale(0.5) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Selecting active slide dot
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  };

  const init = function () {
    goToSlide(0);
    createDots(0);
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  // first slide -100%, second 0%, third 200%

  // moving slider with arrow keys
  document.addEventListener("keydown", function (e) {
    console.log(e); // checking keyboard buttons
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
    // e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // console.log('DOT');
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//
// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]"); // selecting data-src images
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px", //delaying load img
});

imgTargets.forEach((img) => imgObserver.observe(img));

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target); // good for performance
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden"); // better to hide with js because the user can disable JS
});

//
// Menu fade anumation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation
// Intersaction - better way for sticky navigation (better performance)
const obsCallback = function (entries, observer) {
  // these entries are the threshold
  entries.forEach((entry) => {
    //console.log(entry);
  });
};
const navHeight = nav.getBoundingClientRect().height; // selecting height of an nav element
//console.log(navHeight);

const obsOptions = {
  root: null,
  threshold: [0, 0.2], // 0,  20% => when the target is visible x% then its visible
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries; // this is the samel ike entries[0]
  //console.log(entry); // here we check when isIntersecting is true or false

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // nav appering before 90px => important for precise positioning
});
headerObserver.observe(header);
