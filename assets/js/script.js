'use strict';

// Canvas Background Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 3;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }
}

window.addEventListener('mousemove', function(e) {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.getElementById('sendEmail').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default action

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent('Contact from Website');
  const body = encodeURIComponent(`Hello Angga,\n\nI would like to get in touch with you.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

  const mailtoLink = `mailto:anggasulistiangga@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
});

// DropdownCV
document.addEventListener('DOMContentLoaded', function () {
  const cvBtn = document.getElementById('cvDropdownBtn');
  const cvModal = document.getElementById('cvModal');
  const cvModalClose = document.getElementById('cvModalClose');
  const cvForm = document.getElementById('cvForm');

  // Show modal for both desktop and mobile
  cvBtn.addEventListener('click', function (e) {
    cvModal.style.display = 'flex';
    e.stopPropagation();
  });

  // Hide modal when clicking outside the modal content
  window.addEventListener('click', function (e) {
    if (cvModal.style.display === 'flex' && !cvModal.contains(e.target) && e.target !== cvBtn) {
      cvModal.style.display = 'none';
    }
  });

  cvModalClose.onclick = function () {
    cvModal.style.display = 'none';
  };

  cvForm.onsubmit = function (e) {
    e.preventDefault();
    const lang = document.querySelector('input[name="cvLang"]:checked').value;
    window.open(
      lang === 'cv'
        ? './assets/document/Angga Sulistiangga_CV.pdf'
        : (lang === 'id'
            ? './assets/document/Angga Sulistiangga_ID.pdf'
            : './assets/document/Angga Sulistiangga_EN.pdf'),
      '_blank'
    );
    cvModal.style.display = 'none';
  };
});
