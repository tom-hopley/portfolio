const strings = {
  nav: document.querySelector(".nav-overlay"),
  header: document.querySelector(".header-overlay")
};

document.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    strings.nav.classList.add("nav-overlay-visible");
    strings.nav.classList.remove("nav-overlay-clear");
    strings.header.classList.add("header-overlay-extend");
  } else {
    strings.nav.classList.add("nav-overlay-clear");
    strings.nav.classList.remove("nav-overlay-visible");
    strings.header.classList.remove("header-overlay-extend");
  }
});
