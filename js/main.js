const burgerBtn = document.querySelector(".header__hamburger");
const menuNav = document.querySelector(".header__menu");
burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menuNav.classList.toggle("active");
});
