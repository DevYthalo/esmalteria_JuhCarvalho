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


// ==========================================
// CRIA AS BOLINHAS
// ==========================================

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


// ==========================================
// ATUALIZA O CARROSSEL
// ==========================================

function updateCarousel() {

    track.style.transform =
        `translateX(-${index * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");

}


// ==========================================
// PRÓXIMA IMAGEM
// ==========================================

function nextSlide() {

    index++;

    if (index >= slides.length) {
        index = 0;
    }

    updateCarousel();

}


// ==========================================
// IMAGEM ANTERIOR
// ==========================================

function prevSlide() {

    index--;

    if (index < 0) {
        index = slides.length - 1;
    }

    updateCarousel();

}


// ==========================================
// BOTÃO PRÓXIMO
// ==========================================

nextBtn.addEventListener("click", () => {

    nextSlide();

    restartAutoPlay();

});


// ==========================================
// BOTÃO ANTERIOR
// ==========================================

prevBtn.addEventListener("click", () => {

    prevSlide();

    restartAutoPlay();

});


// ==========================================
// PASSAGEM AUTOMÁTICA
// ==========================================

function startAutoPlay() {

    autoPlay = setInterval(
        nextSlide,
        3500
    );

}

function restartAutoPlay() {

    clearInterval(autoPlay);

    startAutoPlay();

}

startAutoPlay();


// ==========================================
// LIGHTBOX
// ==========================================

slides.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

    });

});


// ==========================================
// FECHAR NO X
// ==========================================

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});


// ==========================================
// FECHAR CLICANDO FORA DA FOTO
// ==========================================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


// ==========================================
// TECLADO
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

        restartAutoPlay();

    }

    if (event.key === "ArrowLeft") {

        prevSlide();

        restartAutoPlay();

    }

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }

});


// ==========================================
// SWIPE NO CELULAR
// ==========================================

let startX = 0;

track.addEventListener("touchstart", (event) => {

    startX =
        event.touches[0].clientX;

});

track.addEventListener("touchend", (event) => {

    const endX =
        event.changedTouches[0].clientX;

    const distance =
        startX - endX;


    if (distance > 50) {

        nextSlide();

    }


    if (distance < -50) {

        prevSlide();

    }


    restartAutoPlay();

});


// ==========================================
// ANIMAÇÃO DOS CARDS
// ==========================================

const cards =
    document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("card-hover");

    });


    card.addEventListener("mouseleave", () => {

        card.classList.remove("card-hover");

    });

});


// ==========================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ==========================================

const elementos = document.querySelectorAll(
    ".card, #galeria, #sobre, .footer-col"
);


// Adiciona a classe que deixa o elemento
// preparado para a animação

elementos.forEach(elemento => {

    elemento.classList.add("animar");

});


// ==========================================
// OBSERVADOR
// ==========================================

const observador = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("aparecer");

                // Para de observar depois que apareceu
                observador.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


// ==========================================
// OBSERVA OS ELEMENTOS
// ==========================================

elementos.forEach(elemento => {

    observador.observe(elemento);

});