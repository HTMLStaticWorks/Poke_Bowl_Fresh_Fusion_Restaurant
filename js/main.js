"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     THEME MANAGEMENT (LIGHT / DARK)
     ========================================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("bowlBloomTheme", theme);
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    }
  }

  // Initialize Theme from localStorage or default to light
  const savedTheme = localStorage.getItem("bowlBloomTheme") || "light";
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* =========================================================
     RTL / LTR DIRECTION TOGGLE
     ========================================================= */
  const rtlToggle = document.getElementById("rtlToggle");

  function setDirection(direction) {
    root.setAttribute("dir", direction);
    localStorage.setItem("bowlBloomDirection", direction);
    if (rtlToggle) {
      rtlToggle.textContent = direction === "rtl" ? "LTR" : "RTL";
    }
  }

  // Initialize Direction from localStorage or default to ltr
  const savedDirection = localStorage.getItem("bowlBloomDirection") || "ltr";
  setDirection(savedDirection);

  if (rtlToggle) {
    rtlToggle.addEventListener("click", function () {
      const current = root.getAttribute("dir") || "ltr";
      setDirection(current === "rtl" ? "ltr" : "rtl");
    });
  }

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.getElementById("menuToggle");

  function closeMenu() {
    if (navMenu) {
      navMenu.classList.remove("open");
    }
    document.body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const open = navMenu.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  /* =========================================================
     BOWL BUILDER (Index / Home 1)
     ========================================================= */
  const optionButtons = document.querySelectorAll(".option");
  const summaryElement = document.getElementById("bowlSummary");
  const priceElement = document.getElementById("bowlPrice");

  if (optionButtons.length > 0 && summaryElement && priceElement) {
    const selections = {
      base: { name: "Jasmine Rice", price: 0 },
      protein: { name: "Lime Chicken", price: 3.5 },
      topping: { name: "Avocado", price: 1.5 },
      sauce: { name: "Citrus Tahini", price: 0 }
    };
    const startingPrice = 9.99;

    function updateBowl() {
      let total = startingPrice;
      Object.values(selections).forEach(function (item) {
        total += Number(item.price || 0);
      });

      const summary = [
        selections.base.name,
        selections.protein.name,
        selections.topping.name,
        selections.sauce.name
      ].join(" • ");

      summaryElement.textContent = summary;
      priceElement.textContent = "$" + total.toFixed(2);
    }

    optionButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const optionGrid = button.closest(".option-grid");
        if (!optionGrid) return;

        const group = optionGrid.dataset.group;
        optionGrid.querySelectorAll(".option").forEach(function (item) {
          item.classList.remove("selected");
        });

        button.classList.add("selected");
        selections[group] = {
          name: button.dataset.name,
          price: Number(button.dataset.price || 0)
        };
        updateBowl();
      });
    });

    updateBowl();
  }

  /* =========================================================
     MENU CATEGORY FILTER (Menu Page)
     ========================================================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  if (filterButtons.length > 0 && menuCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
          item.classList.remove("active");
        });
        button.classList.add("active");

        const filter = button.dataset.filter;
        menuCards.forEach(function (card) {
          const visible = filter === "all" || card.dataset.category === filter;
          card.style.display = visible ? "" : "none";
        });
      });
    });
  }

  /* =========================================================
     ORDER ENQUIRY FORM (Contact Page)
     ========================================================= */
  const orderForm = document.getElementById("orderForm");
  const formMessage = document.getElementById("formMessage");

  if (orderForm && formMessage) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }
      formMessage.style.display = "block";
      orderForm.reset();
      setTimeout(function () {
        formMessage.style.display = "none";
      }, 7000);
    });
  }

  /* =========================================================
     SCROLL & LOAD REVEAL ANIMATIONS
     ========================================================= */
  function animateVisibleElements() {
    const elements = document.querySelectorAll(".reveal");
    elements.forEach(function (element, index) {
      element.style.animationDelay = Math.min(index * 55, 500) + "ms";
    });
  }

  animateVisibleElements();

  /* =========================================================
     CONTINUOUS NON-STOP RUNNING MARQUEE BANNER (60 FPS)
     ========================================================= */
  const marqueeTrack = document.querySelector(".marquee-track");
  if (marqueeTrack) {
    let offset = 0;
    const speed = 1.2; // Smooth scrolling speed

    function stepMarquee() {
      offset -= speed;
      const halfWidth = marqueeTrack.scrollWidth / 2;
      if (halfWidth > 0 && Math.abs(offset) >= halfWidth) {
        offset = 0;
      }
      marqueeTrack.style.transform = "translate3d(" + offset + "px, 0, 0)";
      requestAnimationFrame(stepMarquee);
    }
    requestAnimationFrame(stepMarquee);
  }
});
