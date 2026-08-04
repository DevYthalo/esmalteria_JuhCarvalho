const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-track img");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const dotsContainer = document.querySelector(".carousel-dots");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

let index = 0;
let autoPlay;

// ==========================
// CRIA AS BOLINHAS
// ==========================

slides.forEach((_, i) => {

    const dot = document.createElement("span");

    dot.classList.add("dot");

    if (i === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        restartAutoPlay();
    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");

// ==========================
// ATUALIZA CARROSSEL
// ==========================

function updateCarousel() {

    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));

    dots[index].classList.add("active");

}

// ==========================
// PRÓXIMO
// ==========================

function nextSlide() {

    index++;

    if (index >= slides.length) {

        index = 0;

    }

    updateCarousel();

}

// ==========================
// ANTERIOR
// ==========================

function prevSlide() {

    index--;

    if (index < 0) {

        index = slides.length - 1;

    }

    updateCarousel();

}

// ==========================
// BOTÕES
// ==========================

nextBtn.addEventListener("click", () => {

    nextSlide();

    restartAutoPlay();

});

prevBtn.addEventListener("click", () => {

    prevSlide();

    restartAutoPlay();

});

// ==========================
// AUTOPLAY
// ==========================

function startAutoPlay() {

    autoPlay = setInterval(nextSlide, 3500);

}

function restartAutoPlay() {

    clearInterval(autoPlay);

    startAutoPlay();

}

startAutoPlay();

// ==========================
// LIGHTBOX
// ==========================

slides.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

    });

});

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }

});

// ==========================
// TECLADO
// ==========================

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextSlide();

        restartAutoPlay();

    }

    if (e.key === "ArrowLeft") {

        prevSlide();

        restartAutoPlay();

    }

});

// ==========================
// SWIPE CELULAR
// ==========================

let startX = 0;

track.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

});

track.addEventListener("touchend", (e) => {

    let endX = e.changedTouches[0].clientX;

    let distance = startX - endX;

    if (distance > 50) {

        nextSlide();

    }

    if (distance < -50) {

        prevSlide();

    }

    restartAutoPlay();

});