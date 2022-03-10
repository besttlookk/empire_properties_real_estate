//main.js file
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  mirror: false, // whether elements should animate out while scrolling past them
});

// =============Header icons scroll ===========================
// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;

    const sectionTop =
      current.getBoundingClientRect().top + window.pageYOffset - 50;

    const sectionId = current.getAttribute("id");

    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.nav-link[href*="${sectionId}"]`)
        .classList.add("nav-link--active");
    } else {
      document
        .querySelector(`.nav-link[href*="${sectionId}"]`)
        .classList.remove("nav-link--active");
    }
  });
}

// ====================Sidebar=================
const menuIcon = document.querySelector("#menu-icon");
const cancelIcon = document.querySelector("#cancel-icon");
const sidebarEl = document.querySelector("#sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar__link");

menuIcon.addEventListener("click", () => {
  sidebarEl.classList.add("sidebar--active");
});

cancelIcon.addEventListener("click", () => {
  sidebarEl.classList.remove("sidebar--active");
});

sidebarLinks.forEach((sidebarLink) => {
  sidebarLink.addEventListener("click", () => {
    sidebarEl.classList.remove("sidebar--active");
  });
});
