/* ==========================================================================
   SCRIPT.JS
   Só faz duas coisas, de propósito:
   1. Entrada suave dos títulos ao fazer scroll (um único efeito, desligado se o
      visitante pediu menos movimento).
   2. Carregar o mapa do Google só quando o visitante clica no botão (privacidade).
   Não há analítica, cookies nem efeitos de cursor.
   ========================================================================== */

(function () {
  "use strict";

  // Marca o documento como "com JS" para o CSS poder esconder/mostrar os elementos .reveal.
  // Se o JS falhar, os títulos continuam visíveis.
  document.documentElement.classList.add("js");

  /* ---------- 1. Entrada suave dos títulos ---------- */
  var elementos = document.querySelectorAll(".reveal");
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduzir) {
    elementos.forEach(function (el) { el.classList.add("visivel"); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.2 });
    elementos.forEach(function (el) { observador.observe(el); });
  }

  /* ---------- 2. Mapa só ao clicar ---------- */
  var mapa = document.getElementById("mapa");
  var botao = document.getElementById("mapa-botao");

  if (mapa && botao) {
    botao.addEventListener("click", function () {
      var url = mapa.getAttribute("data-mapa");
      if (!url || url.indexOf("[") !== -1) { return; } // ainda não foi preenchido
      var iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.title = "Mapa com a localização do Arabesco";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      mapa.innerHTML = "";
      mapa.classList.add("mapa--ativo");
      mapa.appendChild(iframe);
    });
  }
})();
