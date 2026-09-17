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
    if (window.innerWidth > 1024) {
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

  /* =========================================================
     SHOPPING CART MANAGEMENT & DRAWER
     ========================================================= */
  let cart = [];
  try {
    const stored = localStorage.getItem("bowlBloomCart");
    if (stored) cart = JSON.parse(stored);
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem("bowlBloomCart", JSON.stringify(cart));
    } catch (e) {}
    renderCartUI();
  }

  function injectCartMarkup() {
    if (document.getElementById("cartDrawer")) return;

    const overlay = document.createElement("div");
    overlay.className = "cart-overlay";
    overlay.id = "cartOverlay";

    const drawer = document.createElement("aside");
    drawer.className = "cart-drawer";
    drawer.id = "cartDrawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", "Shopping Cart");

    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <div class="cart-drawer-title">
          <span style="font-size: 20px;">🛒</span>
          <h3>Your Fresh Order</h3>
          <span class="cart-count-pill" id="cartDrawerCount">0 items</span>
        </div>
        <button class="cart-drawer-close" id="cartDrawerClose" type="button" aria-label="Close Cart">&times;</button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerBody"></div>
      <div class="cart-drawer-footer" id="cartDrawerFooter">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <strong id="cartSubtotal">$0.00</strong>
        </div>
        <div class="cart-summary-row">
          <span>Estimated Tax (8%)</span>
          <span id="cartTax">$0.00</span>
        </div>
        <div class="cart-summary-row cart-total-row">
          <span>Total</span>
          <span id="cartTotal">$0.00</span>
        </div>
        <div class="cart-actions">
          <button type="button" class="btn btn-primary" id="cartCheckoutBtn">
            Proceed to Order →
          </button>
          <button type="button" class="btn btn-light" id="cartClearBtn" style="font-size:13px; height:38px;">
            Clear Cart
          </button>
        </div>
      </div>
    `;

    const toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.id = "cartToast";
    toast.innerHTML = `
      <span>Item added to your order!</span>
      <button type="button" class="cart-toast-btn" id="cartToastViewBtn">View Cart</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.body.appendChild(toast);

    // Event listeners
    const closeBtn = document.getElementById("cartDrawerClose");
    if (closeBtn) closeBtn.addEventListener("click", closeCart);
    if (overlay) overlay.addEventListener("click", closeCart);

    const clearBtn = document.getElementById("cartClearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        cart = [];
        saveCart();
      });
    }

    const checkoutBtn = document.getElementById("cartCheckoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        closeCart();
        window.location.href = "contact.html";
      });
    }

    const toastViewBtn = document.getElementById("cartToastViewBtn");
    if (toastViewBtn) {
      toastViewBtn.addEventListener("click", function () {
        hideToast();
        openCart();
      });
    }
  }

  function openCart() {
    const overlay = document.getElementById("cartOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay) overlay.classList.add("open");
    if (drawer) drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    const overlay = document.getElementById("cartOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay) overlay.classList.remove("open");
    if (drawer) drawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("cartToast");
    if (!toast) return;
    if (msg) toast.querySelector("span").textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 4000);
  }

  function hideToast() {
    const toast = document.getElementById("cartToast");
    if (toast) toast.classList.remove("show");
  }

  function addToCart(item) {
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: "item-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        name: item.name,
        price: Number(item.price || 0),
        img: item.img || "assets/images/signature-salmon.jpg",
        qty: 1
      });
    }
    saveCart();
    showToast(`✓ Added "${item.name}" to cart!`);

    // Bump cart badge
    const badge = document.getElementById("cartBadge");
    if (badge) {
      badge.classList.add("bump");
      setTimeout(() => badge.classList.remove("bump"), 300);
    }
  }

  function renderCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    // Update navbar badges
    const badges = document.querySelectorAll("#cartBadge, .cart-badge");
    badges.forEach(b => {
      b.textContent = totalItems;
    });

    const drawerCount = document.getElementById("cartDrawerCount");
    if (drawerCount) {
      drawerCount.textContent = totalItems + (totalItems === 1 ? " item" : " items");
    }

    const drawerBody = document.getElementById("cartDrawerBody");
    const drawerFooter = document.getElementById("cartDrawerFooter");
    if (!drawerBody) return;

    if (cart.length === 0) {
      drawerBody.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🥗</div>
          <h4>Your cart is empty</h4>
          <p>Explore our fresh menu to build your bowl or add chef favorites!</p>
          <a href="menu.html" class="btn btn-primary" onclick="closeCart()" style="margin-top:10px;">Explore Menu</a>
        </div>
      `;
      if (drawerFooter) drawerFooter.style.display = "none";
      return;
    }

    if (drawerFooter) drawerFooter.style.display = "block";

    let subtotal = 0;
    let html = `<div class="cart-items-list">`;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      html += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/signature-salmon.jpg'">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
              <div class="cart-qty-controls">
                <button type="button" class="cart-qty-btn qty-minus" data-id="${item.id}">-</button>
                <span class="cart-qty-val">${item.qty}</span>
                <button type="button" class="cart-qty-btn qty-plus" data-id="${item.id}">+</button>
              </div>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
        </div>
      `;
    });

    html += `</div>`;
    drawerBody.innerHTML = html;

    // Attach item handlers
    drawerBody.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
          }
          saveCart();
        }
      });
    });

    drawerBody.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.qty += 1;
          saveCart();
        }
      });
    });

    drawerBody.querySelectorAll(".cart-item-remove").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id;
        cart = cart.filter(i => i.id !== id);
        saveCart();
      });
    });

    // Totals
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const subtotalEl = document.getElementById("cartSubtotal");
    const taxEl = document.getElementById("cartTax");
    const totalEl = document.getElementById("cartTotal");

    if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = "$" + tax.toFixed(2);
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
  }

  // Initialize Cart Drawer & Bind Navbar Button
  injectCartMarkup();
  renderCartUI();

  const cartBtns = document.querySelectorAll("#cartBtn, .cart-btn");
  cartBtns.forEach(btn => {
    btn.addEventListener("click", openCart);
  });

  // Delegate Add to Cart button clicks
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;
    e.preventDefault();

    const name = btn.dataset.name || "Custom Bowl";
    const price = btn.dataset.price || "14.99";
    const img = btn.dataset.img || "assets/images/signature-salmon.jpg";

    addToCart({ name, price, img });

    // Visual button animation feedback
    const originalText = btn.innerHTML;
    btn.classList.add("added");
    btn.innerHTML = "✓ Added!";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = originalText;
    }, 1500);
  });

  // Handle Custom Bowl Builder button click on Home 1
  const addCustomBowlBtn = document.getElementById("addCustomBowlBtn");
  if (addCustomBowlBtn) {
    addCustomBowlBtn.addEventListener("click", function () {
      const summaryEl = document.getElementById("bowlSummary");
      const priceEl = document.getElementById("bowlPrice");
      const summary = summaryEl ? summaryEl.textContent.trim() : "Custom Poké Bowl";
      const priceText = priceEl ? priceEl.textContent.replace("$", "").trim() : "14.99";

      addToCart({
        name: "Custom Poké Bowl (" + summary + ")",
        price: Number(priceText) || 14.99,
        img: "assets/images/signature-goddess.jpg"
      });

      const origText = addCustomBowlBtn.innerHTML;
      addCustomBowlBtn.innerHTML = "✓ Added Custom Bowl!";
      addCustomBowlBtn.style.background = "#10b981";
      setTimeout(() => {
        addCustomBowlBtn.innerHTML = origText;
        addCustomBowlBtn.style.background = "";
      }, 1500);
    });
  }
});
