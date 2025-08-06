import { createCarousel } from "./carousel.js";
import { createForm } from "./form.js";

// Import images
import exPic01 from "./assets/images/ex-pic01.webp";
import exPic05 from "./assets/images/ex-pic05.webp";
import exPic07 from "./assets/images/ex-pic07.webp";

export function initializeCarousel(selector) {
  const images = [exPic01, exPic05, exPic07];
  const carousel = createCarousel(images);

  const container = document.querySelector(selector);
  if (!container) {
    console.error(`Carousel container not found: ${selector}`);
    return;
  }

  // Clear container and set up structure
  container.innerHTML = `
    <div class="carousel-inner"></div>
    <button class="carousel-button prev">&lt;</button>
    <button class="carousel-button next">&gt;</button>
    <div class="carousel-indicators"></div>
  `;

  const inner = container.querySelector(".carousel-inner");
  const indicators = container.querySelector(".carousel-indicators");

  // Create slides
  images.forEach((image, index) => {
    // Create slide
    const slide = document.createElement("div");
    slide.className = `carousel-slide ${index === 0 ? "active" : ""}`;

    const img = document.createElement("img");
    img.src = image;
    img.alt = `Slide ${index + 1}`;

    slide.appendChild(img);
    inner.appendChild(slide);

    // Create indicator
    const indicator = document.createElement("button");
    indicator.className = `carousel-indicator ${index === 0 ? "active" : ""}`;
    indicator.dataset.index = index;
    indicators.appendChild(indicator);
  });

  // Add event listeners
  container
    .querySelector(".carousel-button.prev")
    .addEventListener("click", carousel.prevSlide);
  container
    .querySelector(".carousel-button.next")
    .addEventListener("click", carousel.nextSlide);

  indicators.addEventListener("click", (e) => {
    const indicator = e.target.closest(".carousel-indicator");
    if (indicator) {
      carousel.goToSlide(parseInt(indicator.dataset.index));
    }
  });

  // Pause on hover
  container.addEventListener("mouseenter", carousel.stopCarousel);
  container.addEventListener("mouseleave", () => carousel.startCarousel());

  // Update display on slide change
  carousel.on("slideChange", (index) => {
    // Update active slide
    container.querySelectorAll(".carousel-slide").forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // Update active indicator
    container
      .querySelectorAll(".carousel-indicator")
      .forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
  });

  // Start carousel
  carousel.startCarousel();

  return carousel;
}

const fields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Message", name: "message", type: "textarea", required: true },
];

export function renderForm() {
  const formContainer = document.querySelector(".form-container");
  if (formContainer) {
    const form = createForm(fields);
    formContainer.appendChild(form);
  }
}
