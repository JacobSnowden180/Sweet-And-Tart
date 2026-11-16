(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  if (toggle && nav) {
    var label = toggle.querySelector(".nav-toggle-label");
    var desktop = window.matchMedia("(min-width: 760px)");

    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? "Close" : "Menu";
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (toggle.contains(event.target) || nav.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
    });

    var onDesktop = function () {
      if (desktop.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  var shots = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  var dialog = document.querySelector("#lightbox");
  if (!shots.length || !dialog || typeof dialog.showModal !== "function") return;

  var img = dialog.querySelector("#lb-img");
  var webp = dialog.querySelector("#lb-webp");
  var cap = dialog.querySelector("#lb-cap");
  var count = dialog.querySelector("#lb-count");
  var status = dialog.querySelector("#lb-status");
  var closeBtn = dialog.querySelector(".lb-close");
  var prevBtn = dialog.querySelector(".lb-prev");
  var nextBtn = dialog.querySelector(".lb-next");
  var index = 0;
  var opener = null;
  var startX = 0;
  var startY = 0;

  var show = function (i) {
    index = (i + shots.length) % shots.length;
    var el = shots[index];
    var sourceImg = el.querySelector("img");
    var alt = sourceImg ? sourceImg.getAttribute("alt") || "" : "";
    webp.setAttribute("srcset", el.getAttribute("data-webp"));
    img.src = el.getAttribute("data-jpg");
    img.width = Number(el.getAttribute("data-w"));
    img.height = Number(el.getAttribute("data-h"));
    img.alt = alt;
    cap.textContent = alt;
    count.textContent = index + 1 + " / " + shots.length;
    status.textContent = index + 1 + " of " + shots.length + ". " + alt;
  };

  var open = function (i, trigger) {
    opener = trigger;
    show(i);
    dialog.showModal();
    closeBtn.focus();
  };

  shots.forEach(function (el, i) {
    el.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      open(i, el);
    });
  });

  prevBtn.addEventListener("click", function () { show(index - 1); });
  nextBtn.addEventListener("click", function () { show(index + 1); });
  closeBtn.addEventListener("click", function () { dialog.close(); });

  dialog.addEventListener("click", function (event) {
    var panel = dialog.querySelector(".lb-panel");
    if (event.target === dialog || event.target === panel) dialog.close();
  });

  dialog.addEventListener("close", function () {
    if (opener) opener.focus();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    }
  });

  dialog.addEventListener("touchstart", function (event) {
    if (!event.changedTouches[0]) return;
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
  }, { passive: true });

  dialog.addEventListener("touchend", function (event) {
    if (!event.changedTouches[0]) return;
    var dx = event.changedTouches[0].clientX - startX;
    var dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) show(index + 1);
    else show(index - 1);
  }, { passive: true });
})();
