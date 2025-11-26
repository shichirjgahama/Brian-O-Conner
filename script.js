document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("8ZhGVesEGchiLMO5y");

  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "rgba(0, 0, 0, 0.9)";
      header.style.backdropFilter = "none";
    }
  });

  const startRaceBtn = document.querySelector(".btn-primary");
  const watchTrailerBtn = document.querySelector(".btn-secondary");

  startRaceBtn.addEventListener("click", function () {
    alert("Гонка начинается! Пристегните ремни безопасности!");
  });

  if (watchTrailerBtn) {
    watchTrailerBtn.addEventListener("click", function () {
      alert("Трейлер скоро будет доступен!");
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".form-submit");
      const formMessage = document.getElementById("form-message");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "ОТПРАВКА...";
      submitBtn.disabled = true;
      formMessage.style.display = "none";

      emailjs
        .sendForm("service_t24vy4f", "template_fc0voxp", this)
        .then(function () {
          formMessage.textContent =
            "✅ Сообщение отправлено! Мы скоро ответим.";
          formMessage.className = "form-message success";
          contactForm.reset();
        })
        .catch(function (error) {
          console.error("EmailJS Error:", error);
          formMessage.textContent = "❌ Ошибка отправки. Попробуйте еще раз.";
          formMessage.className = "form-message error";
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          formMessage.style.display = "block";

          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
        });
    });
  }

  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-content");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      lightboxImg.src = imgSrc;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  const modelIframes = document.querySelectorAll(".model-iframe");

  modelIframes.forEach((iframe, index) => {
    iframe.addEventListener("load", function () {
      console.log(`Model ${index + 1} loaded successfully`);
    });

    iframe.addEventListener("error", function () {
      console.error(`Failed to load model ${index + 1}`);
    });
  });

  const modelCards = document.querySelectorAll(".model-card");

  const modelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  modelCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    modelObserver.observe(card);
  });

  const modelInfo = document.createElement("div");
  modelInfo.className = "model-info";

  modelCards.forEach((card) => {
    const clone = modelInfo.cloneNode(true);
    card.appendChild(clone);
  });

  const stats = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const targetValue = parseInt(stat.textContent);
          let currentValue = 0;

          const increment = targetValue / 50;
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              stat.textContent =
                targetValue + (stat.textContent.includes("+") ? "+" : "");
              clearInterval(timer);
            } else {
              stat.textContent =
                Math.floor(currentValue) +
                (stat.textContent.includes("+") ? "+" : "");
            }
          }, 30);

          observer.unobserve(stat);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => {
    observer.observe(stat);
  });

  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  galleryItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    galleryObserver.observe(item);
  });

  const skills = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skill = entry.target;
          const width = skill.style.width;
          skill.style.width = "0";

          setTimeout(() => {
            skill.style.transition = "width 1.5s ease-in-out";
            skill.style.width = width;
          }, 200);
        }
      });
    },
    { threshold: 0.5 }
  );

  skills.forEach((skill) => {
    skillObserver.observe(skill);
  });
});
