// Bouton toogle Light/Dark
const toggleBtn = document.getElementById('toggleTheme');
// Selectionneur d'images
const themeImages = document.querySelectorAll('img[data-light][data-dark]');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    // Basculer le dark-mode sur le body
    document.body.classList.toggle('dark-mode');
  
    // Pour chaque image qui possède des versions light et dark, échanger la source
     themeImages.forEach(img => {
        if (document.body.classList.contains('dark-mode')) {
          img.src = img.getAttribute('data-dark');
        } else {
          img.src = img.getAttribute('data-light');
        }
      });
  });
}  

// Selectionneur de CV
document.addEventListener("DOMContentLoaded", function () {
  const cvLink = document.getElementById("cv-link");

  if (cvLink) {  

    //Basculer vers le dark-mode
    function updateCVLink() {
      const isDarkMode = document.body.classList.contains("dark-mode");
      cvLink.href = isDarkMode ? cvLink.dataset.dark : cvLink.dataset.light;
    }

    // Vérifier au chargement
    updateCVLink();

    // Écouter les changements de mode
    const observer = new MutationObserver(updateCVLink);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }
});

// Activer ScrollTrigger (GSAP)
gsap.registerPlugin(ScrollTrigger);

//Animation Photo Portfolio
gsap.fromTo(".accueil-photo",
    { 
      y: 200, // Position au démarrage
      opacity: 0 
    },
    { 
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".accueil",
        start: "top top",
        end: "+=600",    // distance de scroll
        scrub: true,
        pin: true        // épingle
      }
    }
  );

//Animation Présentation
ScrollReveal().reveal('.presentation-container', {
  delay: 200,
  distance: '50px',
  duration: 800,
  easing: 'ease-in-out',
  origin: 'bottom'
});

// Animation des flammes
const flames = document.querySelectorAll(".flame");

flames.forEach(flame => {
  flame.addEventListener("mouseenter", () => {
    gsap.to(flame, { y: -5, rotation: 3, duration: 0.5 });
  });
  flame.addEventListener("mouseleave", () => {
    gsap.to(flame, { y: 0, rotation: 0, duration: 0.5 });
  });
});

// Retour haut de page
function topFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
} 

// Carrousel Modal
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  const modal = document.getElementById('mediaModal');
  const modalText = document.getElementById('modalText');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const description = item.getAttribute('data-description');
      modalText.textContent = description;
      modal.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // expose closeModal to global scope
  window.closeModal = closeModal;
});

// Envoi du formulaire de contact via Formspree (AJAX, sans recharger la page)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formStatus.textContent = "Message envoyé, merci !";
        contactForm.reset();
      } else {
        formStatus.textContent = "Une erreur est survenue, réessaie plus tard.";
      }
    } catch (error) {
      formStatus.textContent = "Une erreur est survenue, réessaie plus tard.";
    }
  });
}