// ============================================================
//                  CARROSSEL - STUDIO JUHCARVALHO
// ============================================================

const track = document.querySelector(".carousel-track");
const slidesOriginais = Array.from(
    document.querySelectorAll(".carousel-track img")
);

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const dotsContainer = document.querySelector(".carousel-dots");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");


// ============================================================
// VERIFICA SE O CARROSSEL EXISTE
// ============================================================

if (
    track &&
    slidesOriginais.length > 0 &&
    nextBtn &&
    prevBtn
) {

    // ========================================================
    // CONFIGURAÇÕES
    // ========================================================

    const intervalo = 3500;

    let index = 1;

    let autoPlay;

    let isMoving = false;

    let startX = 0;


    // ========================================================
    // CLONA AS EXTREMIDADES
    //
    // Exemplo:
    //
    // original:
    // 1 2 3 4 5
    //
    // fica:
    // 5 | 1 2 3 4 5 | 1
    //
    // Isso permite criar um loop visualmente infinito.
    // ========================================================

    const primeiroClone =
        slidesOriginais[0].cloneNode(true);

    const ultimoClone =
        slidesOriginais[slidesOriginais.length - 1]
            .cloneNode(true);


    primeiroClone.classList.add("clone");

    ultimoClone.classList.add("clone");


    // Adiciona o clone da última imagem no começo

    track.insertBefore(
        ultimoClone,
        slidesOriginais[0]
    );


    // Adiciona o clone da primeira imagem no final

    track.appendChild(
        primeiroClone
    );


    // ========================================================
    // PEGA TODAS AS IMAGENS NOVAMENTE
    // ========================================================

    let slides =
        Array.from(
            track.querySelectorAll("img")
        );


    // ========================================================
    // CRIA AS BOLINHAS
    // ========================================================

    slidesOriginais.forEach((_, i) => {

        const dot =
            document.createElement("span");

        dot.classList.add("dot");

        if (i === 0) {

            dot.classList.add("active");

        }


        dot.addEventListener("click", () => {

            if (isMoving) return;

            index = i + 1;

            moverCarrossel(true);

            reiniciarAutoPlay();

        });


        dotsContainer.appendChild(dot);

    });


    const dots =
        Array.from(
            dotsContainer.querySelectorAll(".dot")
        );


    // ========================================================
    // CALCULA A POSIÇÃO DO SLIDE
    // ========================================================

    function calcularDeslocamento() {

        const slideAtivo =
            slides[index];

        const larguraContainer =
            track.parentElement.clientWidth;


        let deslocamento =
            slideAtivo.offsetLeft -
            (
                larguraContainer -
                slideAtivo.offsetWidth
            ) / 2;


        return deslocamento;

    }


    // ========================================================
    // MOVE O CARROSSEL
    // ========================================================

    function moverCarrossel(animar = true) {

        const deslocamento =
            calcularDeslocamento();


        if (animar) {

            track.style.transition =
                "transform .6s ease";

        } else {

            track.style.transition =
                "none";

        }


        track.style.transform =
            `translateX(-${deslocamento}px)`;


        // ====================================================
        // ATUALIZA INDICADOR
        // ====================================================

        let indiceReal =
            index - 1;


        if (
            indiceReal < 0
        ) {

            indiceReal =
                slidesOriginais.length - 1;

        }


        if (
            indiceReal >=
            slidesOriginais.length
        ) {

            indiceReal = 0;

        }


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        if (dots[indiceReal]) {

            dots[indiceReal]
                .classList.add("active");

        }


        // ====================================================
        // DESTACA SLIDE ATIVO
        // ====================================================

        slides.forEach(slide => {

            slide.classList.remove(
                "slide-ativo"
            );

        });


        slides[index]
            .classList.add(
                "slide-ativo"
            );

    }


    // ========================================================
    // PRÓXIMA IMAGEM
    // ========================================================

    function nextSlide() {

        if (isMoving) return;

        isMoving = true;

        index++;

        moverCarrossel(true);

        reiniciarAutoPlay();

    }


    // ========================================================
    // IMAGEM ANTERIOR
    // ========================================================

    function prevSlide() {

        if (isMoving) return;

        isMoving = true;

        index--;

        moverCarrossel(true);

        reiniciarAutoPlay();

    }


    // ========================================================
    // DETECTA FINAL DO LOOP
    //
    // Quando chega no clone:
    //
    // 10 | 1
    //
    // fazemos a troca silenciosa:
    //
    // clone 1 -> imagem real 1
    //
    // O usuário não percebe.
    // ========================================================

    track.addEventListener(
        "transitionend",
        () => {

            // ================================================
            // CHEGOU NO CLONE DA PRIMEIRA
            // ================================================

            if (
                index ===
                slides.length - 1
            ) {

                index = 1;

                moverCarrossel(false);

            }


            // ================================================
            // CHEGOU NO CLONE DA ÚLTIMA
            // ================================================

            else if (
                index === 0
            ) {

                index =
                    slides.length - 2;

                moverCarrossel(false);

            }


            isMoving = false;

        }
    );


    // ========================================================
    // BOTÃO PRÓXIMO
    // ========================================================

    nextBtn.addEventListener(
        "click",
        nextSlide
    );


    // ========================================================
    // BOTÃO ANTERIOR
    // ========================================================

    prevBtn.addEventListener(
        "click",
        prevSlide
    );


    // ========================================================
    // AUTOPLAY
    // ========================================================

    function iniciarAutoPlay() {

        autoPlay =
            setInterval(
                () => {

                    nextSlide();

                },
                intervalo
            );

    }


    function pararAutoPlay() {

        clearInterval(
            autoPlay
        );

    }


    function reiniciarAutoPlay() {

        pararAutoPlay();

        iniciarAutoPlay();

    }


    iniciarAutoPlay();


    // ========================================================
    // PAUSA AO PASSAR O MOUSE
    // ========================================================

    const carousel =
        document.querySelector(".carousel");


    carousel.addEventListener(
        "mouseenter",
        pararAutoPlay
    );


    carousel.addEventListener(
        "mouseleave",
        iniciarAutoPlay
    );


    // ========================================================
    // LIGHTBOX
    // ========================================================

    slides.forEach((img) => {

        img.addEventListener(
            "click",
            () => {

                // Ignora clones

                if (
                    img.classList.contains(
                        "clone"
                    )
                ) {

                    return;

                }


                // Só abre se for a imagem central

                if (
                    img === slides[index]
                ) {

                    lightbox.style.display =
                        "flex";

                    lightboxImg.src =
                        img.src;

                    lightboxImg.alt =
                        img.alt;

                    pararAutoPlay();

                }

                else {

                    // Se clicar em uma imagem
                    // lateral, centraliza ela

                    const novoIndex =
                        slides.indexOf(img);


                    if (
                        novoIndex !== -1
                    ) {

                        index =
                            novoIndex;

                        moverCarrossel(true);

                        reiniciarAutoPlay();

                    }

                }

            }
        );

    });


    // ========================================================
    // FECHAR LIGHTBOX
    // ========================================================

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            () => {

                lightbox.style.display =
                    "none";

                reiniciarAutoPlay();

            }
        );

    }


    // ========================================================
    // FECHAR CLICANDO FORA
    // ========================================================

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    lightbox
                ) {

                    lightbox.style.display =
                        "none";

                    reiniciarAutoPlay();

                }

            }
        );

    }


    // ========================================================
    // TECLADO
    // ========================================================

    document.addEventListener(
        "keydown",
        (event) => {

            // Se o lightbox estiver aberto

            if (
                lightbox &&
                lightbox.style.display ===
                "flex"
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    lightbox.style.display =
                        "none";

                    reiniciarAutoPlay();

                }

                return;

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextSlide();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                prevSlide();

            }

        }
    );


    // ========================================================
    // SWIPE NO CELULAR
    // ========================================================

    track.addEventListener(
        "touchstart",
        (event) => {

            startX =
                event.touches[0]
                    .clientX;

            pararAutoPlay();

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        (event) => {

            const endX =
                event.changedTouches[0]
                    .clientX;


            const distancia =
                startX - endX;


            if (
                distancia > 50
            ) {

                nextSlide();

            }


            else if (
                distancia < -50
            ) {

                prevSlide();

            }


            iniciarAutoPlay();

        },
        { passive: true }
    );


    // ========================================================
    // RECALCULA AO REDIMENSIONAR
    // ========================================================

    let resizeTimeout;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimeout
            );


            resizeTimeout =
                setTimeout(
                    () => {

                        moverCarrossel(
                            false
                        );

                    },
                    150
                );

        }
    );


    // ========================================================
    // POSICIONAMENTO INICIAL
    //
    // Começamos no slide 1 REAL.
    // O índice 0 é o clone da imagem 10.
    // ========================================================

    index = 1;

    moverCarrossel(false);

}


// ============================================================
//                  MENU MOBILE
// ============================================================

const menuToggle =
    document.getElementById(
        "menu-toggle"
    );

const navMenu =
    document.getElementById(
        "nav-menu"
    );

const navOverlay =
    document.getElementById(
        "nav-overlay"
    );


if (
    menuToggle &&
    navMenu &&
    navOverlay
) {

    const navLinks =
        navMenu.querySelectorAll(
            "a"
        );


    menuToggle.addEventListener(
        "click",
        () => {

            const aberto =
                navMenu.classList.toggle(
                    "active"
                );


            navOverlay.classList.toggle(
                "active"
            );


            menuToggle.classList.toggle(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                aberto
            );

        }
    );


    // ========================================================
    // FECHA AO CLICAR EM UM LINK
    // ========================================================

    navLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                    navOverlay.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );


    // ========================================================
    // FECHA AO CLICAR NO OVERLAY
    // ========================================================

    navOverlay.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "active"
            );

            navOverlay.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

}


// ============================================================
//                  ANIMAÇÃO DOS CARDS
// ============================================================

const cards =
    document.querySelectorAll(
        ".card"
    );


cards.forEach(
    card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "card-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "card-hover"
                );

            }
        );

    }
);


// ============================================================
//              ANIMAÇÃO AO ROLAR A PÁGINA
// ============================================================

const elementos =
    document.querySelectorAll(
        ".card, #galeria, #sobre, .footer-col"
    );


elementos.forEach(
    elemento => {

        elemento.classList.add(
            "animar"
        );

    }
);


// ============================================================
//                  INTERSECTION OBSERVER
// ============================================================

if (
    "IntersectionObserver" in window
) {

    const observador =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "aparecer"
                            );


                            observador.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    elementos.forEach(
        elemento => {

            observador.observe(
                elemento
            );

        }
    );

}