/* Vitrine publica. Sem edicao. So no link ?m=. */
(function () {
  if (!/[?&]m=/.test(location.search)) return;
  var css = document.createElement("style");
  css.textContent = [
    ".lona-topo{padding:32px 20px 12px;text-align:center}",
    ".lona-nome{font-size:36px;letter-spacing:.06em;font-weight:500;margin:0}",
    ".lona-frase{margin:10px auto 0;max-width:26ch;font-size:15px;line-height:1.5;opacity:.78}",
    ".lona-filete{width:36px;height:1px;margin:18px auto 0;background:currentColor;opacity:.3}",
    ".lona-rodape{margin-top:36px;padding:20px 16px 28px;text-align:center;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.62}"
  ].join("");
  document.head.appendChild(css);
  function ajustar() {
    var antiga = document.getElementById("luxi-fontes");
    if (antiga) antiga.remove();
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (t === "Carrinho") el.textContent = "Seleção";
      if (t === "Por no carrinho") el.textContent = "Guardar na seleção";
    });
    var rodape = document.querySelector(".lona-rodape");
    if (rodape && rodape.textContent.indexOf("sob consulta") < 0) rodape.textContent = "Peças sob consulta · entrega a combinar";
    var nome = (document.querySelector(".lona-nome") || {}).textContent;
    if (nome) document.title = nome.trim();
  }
  setInterval(ajustar, 800);
})();
