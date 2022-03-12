"use strict";

//main.js file
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  delay: 200,
  // values from 0 to 3000, with step 50ms
  duration: 1500,
  // values from 0 to 3000, with step 50ms
  easing: "ease",
  // default easing for AOS animations
  mirror: false // whether elements should animate out while scrolling past them

}); // =============Header icons scroll ===========================
// Get all sections that have an ID defined

var sections = document.querySelectorAll("section[id]"); // Add an event listener listening for scroll

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  var scrollY = window.pageYOffset; // Now we loop through sections to get height, top and ID values for each

  sections.forEach(function (current) {
    var sectionHeight = current.offsetHeight;
    var sectionTop = current.getBoundingClientRect().top + window.pageYOffset - 50;
    var sectionId = current.getAttribute("id");
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-link[href*=\"".concat(sectionId, "\"]")).classList.add("nav-link--active");
    } else {
      document.querySelector(".nav-link[href*=\"".concat(sectionId, "\"]")).classList.remove("nav-link--active");
    }
  });
} // ====================Sidebar=================


var menuIcon = document.querySelector("#menu-icon");
var cancelIcon = document.querySelector("#cancel-icon");
var sidebarEl = document.querySelector("#sidebar");
var sidebarLinks = document.querySelectorAll(".sidebar__link");
menuIcon.addEventListener("click", function () {
  sidebarEl.classList.add("sidebar--active");
});
cancelIcon.addEventListener("click", function () {
  sidebarEl.classList.remove("sidebar--active");
});
sidebarLinks.forEach(function (sidebarLink) {
  sidebarLink.addEventListener("click", function () {
    sidebarEl.classList.remove("sidebar--active");
  });
});
//# sourceMappingURL=script.js.map