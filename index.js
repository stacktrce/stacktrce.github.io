document.addEventListener("DOMContentLoaded", function () {
  setFooterYear();
  initNavToggle();
  initActiveNavHighlight();
  initScrollReveal();
  logConsoleMessage();
});


function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!toggle || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
}


function initActiveNavHighlight() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("[data-nav]");
  if (
    !sections.length ||
    !navLinks.length ||
    !("IntersectionObserver" in window)
  )
    return;

  const linkById = {};
  navLinks.forEach(function (link) {
    const id = link.getAttribute("href").replace("#", "");
    linkById[id] = link;
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const link = linkById[entry.target.id];
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach(function (l) {
            l.classList.remove("active");
          });
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
}


function logConsoleMessage() {
  console.log(
    "% Unfortunately, no one can be told what the Matrix is. You have to see it for yourself. — Morpheus",
    "font-family: monospace; font-size: 14px; font-weight: bold;",
  );
  console.log(
    "%c PS: Mein schlechter src code ist nicht so interessant, wie du denkst. Claude kann das besser ",
    "font-family: monospace; font-size: 12px;",
  );
}
