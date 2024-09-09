function load(selector, path) {
  const cached = localStorage.getItem(path);
  if (cached) {
    document.querySelector(selector).innerHTML = cached;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        document.querySelector(selector).innerHTML = html;
        localStorage.setItem(path, html);
      }
    });
}

function isHidden(element) {
  if (!element) return true;

  if (window.getComputedStyle(element).display === "none") {
    return true;
  }

  let parent = element.parentElement;
  while (parent) {
    if (window.getComputedStyle(parent).display === "none") {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const calArrowPos = debounce(() => {
  if (isHidden(document.querySelector(".js-dropdown-list"))) return;
  const item = document.querySelectorAll(".js-dropdown-list > li ");
  item.forEach((item) => {
    const arrowPos = item.offsetLeft + item.offsetWidth / 2;
    item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
  });
});

function handleHoverItem() {
  const items = document.querySelectorAll(".menu__content--item");
  items.forEach((item) => {
    item.addEventListener("mouseover", function () {
      if (window.innerWidth < 991.08) {
        return;
      } else {
        items.forEach((item) => {
          item.classList.remove("menu__content--item--active");
        });
        item.classList.add("menu__content--item--active");
      }
    });

    item.addEventListener("click", function () {
      if (window.innerWidth >= 991.08) return;
      item.classList.toggle("menu__content--item--active");
    });
  });
}

function showHideNavbar() {
  const navbar = document.querySelector(".navbar");
  const overlay = document.querySelector(".navbar__overlay");
  const button = document.querySelector(".navbar__close-btn");
  const more = document.querySelector(".more");
  more.addEventListener("click", function () {
    navbar.classList.toggle("hide");
    navbar.classList.toggle("show");
  });
  overlay.addEventListener("click", function () {
    navbar.classList.toggle("hide");
    navbar.classList.toggle("show");
  });
  button.addEventListener("click", function () {
    navbar.classList.toggle("hide");
    navbar.classList.toggle("show");
  });
}

function enableATag() {
  const aTags = document.querySelectorAll("a");
  aTags.forEach((aTag) => {
    aTag.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
}

function showSubNav() {
  const navbarItem = document.querySelectorAll(".navbar__item");
  navbarItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (item.contains(e.target) && !e.target.matches(".navbar__link")) {
        return;
      } else {
        item.classList.toggle("navbar__item--active");
      }
    });
    item.addEventListener("mouseover", function () {
      if (window.innerWidth < 991.08) {
        return;
      }
      item.classList.add("navbar__item--active");
    });
    item.addEventListener("mouseout", function () {
      if (window.innerWidth < 991.08) {
        return;
      }
      item.classList.remove("navbar__item--active");
    });
  });
}

function showFilter() {
  const filter = document.querySelector(".filter");
  const filterButton = document.querySelector(".filter__btn");
  document.addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target.matches(".filter__btn") || filterButton.contains(e.target)) {
      filter.classList.toggle("filter--active");
    } else if (!e.target.closest(".filter")) {
      filter.classList.remove("filter--active");
    }
  });
}

function SliderSignup() {
  const authContent = document.querySelector(".auth__content");
  const button = document.querySelector(".auth__intro--next-img");
  button.addEventListener("click", function () {
    authContent.classList.toggle("auth__content--active");
  });
}

function ChangeDetailTab() {
  const tabItem = document.querySelectorAll(".product__tab--item");
  const contentItem = document.querySelectorAll(".product__tab--content");
  tabItem.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      tabItem.forEach((tab) => {
        tab.classList.remove("product__tab--item-active");
      });
      item.classList.add("product__tab--item-active");
      contentItem.forEach((content) => {
        content.classList.remove("product__tab--content-current");
      });
      contentItem[index].classList.add("product__tab--content-current");
    });
  });
}
window.addEventListener("DOMContentLoaded", handleHoverItem);
window.addEventListener("DOMContentLoaded", showHideNavbar);
window.addEventListener("DOMContentLoaded", enableATag);
window.addEventListener("resize", calArrowPos);

window.addEventListener("DOMContentLoaded", calArrowPos);
window.addEventListener("DOMContentLoaded", showSubNav);
window.addEventListener("DOMContentLoaded", showFilter);
window.addEventListener("DOMContentLoaded", SliderSignup);
window.addEventListener("DOMContentLoaded", ChangeDetailTab);
