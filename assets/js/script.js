'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

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

// Formspree form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  const submitBtn = this.querySelector('[data-form-btn]');
  const originalBtnText = submitBtn.querySelector('span').textContent;
  
  // Show loading state
  submitBtn.querySelector('span').textContent = 'Sending...';
  submitBtn.setAttribute('disabled', '');
  
  // Formspree will handle the submission
  // After submission, reset the form and button
  setTimeout(() => {
    submitBtn.querySelector('span').textContent = 'Message Sent!';
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.querySelector('span').textContent = originalBtnText;
      submitBtn.removeAttribute('disabled');
    }, 3000);
  }, 1000);
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Remove active class from all navigation links
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Remove active class from all pages
    pages.forEach(page => page.classList.remove("active"));
    
    // Get the target page name from the clicked link
    const targetPage = this.getAttribute("data-nav-link").toLowerCase();
    
    // Find and activate the corresponding page
    pages.forEach(page => {
      if (page.getAttribute("data-page").toLowerCase() === targetPage) {
        page.classList.add("active");
        this.classList.add("active");
      }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  });
}

// Set initial active state
document.addEventListener("DOMContentLoaded", function() {
  const defaultPage = document.querySelector("[data-page='about']");
  const defaultNavLink = document.querySelector("[data-nav-link='about']");
  
  if (defaultPage && defaultNavLink) {
    defaultPage.classList.add("active");
    defaultNavLink.classList.add("active");
  }
});