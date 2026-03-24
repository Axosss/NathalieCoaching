// Smooth scroll sur les ancres
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Nav mobile
var hamburger = document.querySelector(".nav-hamburger");
var navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Scroll animations (process steps — progressive fill)
(function () {
  var container = document.querySelector(".process-steps");
  if (!container) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        container.classList.add("animated");
        observer.unobserve(container);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
})();

// Cookie banner
(function () {
  var banner = document.getElementById("cookieBanner");
  var acceptBtn = document.getElementById("cookieAccept");
  var refuseBtn = document.getElementById("cookieRefuse");

  if (!banner) return;

  var consent = localStorage.getItem("cookie_consent");

  if (!consent) {
    setTimeout(function () {
      banner.classList.add("visible");
    }, 800);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookie_consent", "accepted");
      banner.classList.remove("visible");
    });
  }

  if (refuseBtn) {
    refuseBtn.addEventListener("click", function () {
      localStorage.setItem("cookie_consent", "refused");
      banner.classList.remove("visible");
    });
  }
})();
