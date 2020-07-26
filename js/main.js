const burgerBtn = document.querySelector(".header__hamburger");
const menuNav = document.querySelector(".header__menu");
burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menuNav.classList.toggle("active");
});
// Calculator
const summaryBox = document.querySelector(".calc__summary");
const resultList = document.querySelectorAll(".calc__result");
const totalInfo = document.querySelector(".calc__result--total ");
const summaryInfo = document.querySelector(".summary ");
const selectList = document.querySelector(".calc__select");
const pricingSettings = {
  products: 0.5,
  orders: 0.25,
  package: {
    basic: 0,
    professional: 25,
    premium: 60,
  },
  accounting: 35,
  terminal: 5,
};

const totalSum = () => {
  let sum = 0;
  resultList.forEach((result) => {
    if (result.classList.contains("opened")) {
      const info = result.querySelector(".price");
      const price = info === null ? 0 : Number(info.innerText.slice(1));
      sum += price;
    }
  });
  if (sum === 0) {
    totalInfo.classList.remove("opened");
  } else {
    totalInfo.classList.add("opened");
    summaryInfo.innerText = `$${sum}`;
  }
};

const calcItem = (input, type) => {
  resultList.forEach((item) => {
    if (item.id === input.id) {
      const info = item.querySelector(".info");
      const price = item.querySelector(".price");

      if (type === "check" && input.checked) {
        item.classList.add("opened");
        price.innerText = `$${pricingSettings[input.id]}`;
      } else if (type === "change" && input.value.length) {
        item.classList.add("opened");
        info.innerText = `${input.value} * $${pricingSettings[input.id]}`;
        price.innerText = `$${input.value * pricingSettings[input.id]}`;
      } else if (type === "select") {
        item.classList.add("opened");
        info.innerText = `${input.innerText}`;
        price.innerText = `$${
          pricingSettings[input.id][input.innerText.toLowerCase()]
        }`;
      } else {
        item.classList.remove("opened");
      }
    }
  });
  totalSum();
};

const validator = (input) => {
  if (input.value < 0 || input.value.includes("e")) {
    return false;
  }
  return true;
};

const handleChange = (e) => {
  const input = e.target;
  if (!validator(input)) {
    console.log("false");
  }
  calcItem(input, "change");
};

const handleCheck = (e) => {
  const input = e.target;
  calcItem(input, "check");
};

function handleSelect(e) {
  const selectItem = e.target;
  selectList.classList.toggle("active");
  this.classList.toggle("active");

  if (selectItem.classList.contains("calc__item")) {
    const packageType = selectItem.innerText;
    const selectText = this.querySelector("p");
    selectText.style.color = "black";
    selectText.innerText = packageType;
    calcItem(this, "select");
  }
}

document
  .querySelectorAll(".calc__input")
  .forEach((input) => input.addEventListener("change", handleChange));
document
  .querySelectorAll(".calc__check")
  .forEach((input) => input.addEventListener("click", handleCheck));

document
  .querySelector(".calc__options")
  .addEventListener("click", handleSelect);
