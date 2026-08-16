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
// (efeito "peek": centraliza o slide ativo e
// deixa pedaços dos vizinhos visíveis nas laterais)
// ==========================================

function updateCarousel() {

    const slideAtivo = slides[index];

    const larguraContainer = track.parentElement.clientWidth;

    // Posição do slide ativo dentro da track,
    // calculada com base na largura real renderizada
    // (funciona em qualquer tamanho de tela, sem
    // precisar travar em porcentagens fixas no JS)
    const deslocamento =
        slideAtivo.offsetLeft -
        (larguraContainer - slideAtivo.offsetWidth) / 2;

    track.style.transform =
        `translateX(-${deslocamento}px)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");

    slides.forEach(slide => {
        slide.classList.remove("slide-ativo");
    });

    slideAtivo.classList.add("slide-ativo");

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
// RECENTRALIZA O CARROSSEL AO REDIMENSIONAR
// (o peek depende da largura real da tela)
// ==========================================

let resizeTimeout;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(updateCarousel, 150);

});


// Garante que o primeiro slide já nasça
// centralizado corretamente
updateCarousel();


// ==========================================
// LIGHTBOX
// ==========================================

slides.forEach((img, i) => {

    img.addEventListener("click", () => {

        if (i === index) {

            // clicou na foto central -> amplia
            lightbox.style.display = "flex";

            lightboxImg.src = img.src;

        } else {

            // clicou numa foto lateral (peek) -> centraliza ela
            index = i;

            updateCarousel();

            restartAutoPlay();

        }

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
// MENU MOBILE (hambúrguer)
// ==========================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navOverlay = document.getElementById("nav-overlay");
const navLinks = navMenu.querySelectorAll("a");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");
    navOverlay.classList.toggle("active");
    menuToggle.classList.toggle("active");

});

// Fecha o menu ao clicar em qualquer link

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        navOverlay.classList.remove("active");
        menuToggle.classList.remove("active");

    });

});

// Fecha o menu clicando fora (no overlay escuro)

navOverlay.addEventListener("click", () => {

    navMenu.classList.remove("active");
    navOverlay.classList.remove("active");
    menuToggle.classList.remove("active");

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