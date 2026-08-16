const menu = document.getElementById("menu");
const blocos = document.querySelectorAll(".aparecer");
const video = document.querySelector(".capa-video");

gsap.registerPlugin(ScrollTrigger);

const observerOptions = {
  threshold: 0.15,
};

function atualizarMenu() {
  menu.classList.toggle("menu-rolado", window.scrollY > 50);
}

window.addEventListener("scroll", atualizarMenu);

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;

    entrada.target.classList.add("visivel");
    observador.unobserve(entrada.target);
  });
}, observerOptions);

blocos.forEach((bloco) => {
  observador.observe(bloco);
});

function animarCapa() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".capa",
      start: "top top",
      end: "+=2500",
      scrub: 1,
      pin: true,
    },
  });

  timeline.to(
    ".capa-conteudo, .capa-barra, .capa-seta",
    {
      opacity: 0,
      scale: 0.6,
      duration: 0.1,
    },
    0,
  );

  timeline.to(
    video,
    {
      opacity: 1,
      duration: 0.8,
    },
    0,
  );

  timeline.to(
    video,
    {
      currentTime: video.duration,
      duration: 1,
      ease: "none",
    },
    0,
  );
}

if (video.readyState >= 1) {
  animarCapa();
} else {
  video.addEventListener("loadedmetadata", animarCapa, { once: true });
}