/* Atualizacao da vitrine: foco em venda. So no link ?m=. Nao altera o app. */
(function () {
  if (!/[?&]m=/.test(location.search)) return;
  var css = document.createElement("style");
  css.textContent = [
    ".lona-topo{padding:28px 8px 18px;text-align:center}",
    ".lona-nome{font-size:34px;letter-spacing:.04em;font-weight:500;margin:0}",
    ".lona-frase{margin:8px auto 0;max-width:28ch;font-size:15px;line-height:1.45;opacity:.82}",
    ".lona-filete{width:42px;height:1px;margin:16px auto 0;background:currentColor;opacity:.35}",
    ".lona-carrinho-btn{letter-spacing:.08em;text-transform:uppercase;font-size:11px}",
    ".lona-rodape{margin-top:28px;padding:22px 8px 36px;text-align:center;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.7}",
    "#luxi-venda-foco{max-width:28ch;margin:0 auto 8px;text-align:center;font:13px 'Helvetica Neue',Arial,sans-serif;line-height:1.45;color:#746569}"
  ].join("");
  document.head.appendChild(css);

  function ajustar() {
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (t === "Carrinho" || t === "Seleção") el.textContent = "Seleção";
      if (t === "Por no carrinho" || t === "Guardar na seleção") el.textContent = "Guardar na seleção";
    });
    var rodape = document.querySelector(".lona-rodape");
    if (rodape) rodape.textContent = "Peças sob consulta · entrega a combinar";
    var topo = document.querySelector(".lona-topo");
    if (topo && !document.getElementById("luxi-venda-foco")) {
      var nota = document.createElement("p");
      nota.id = "luxi-venda-foco";
      nota.textContent = "Escolha as peças e envie o pedido.";
      topo.appendChild(nota);
    }
  }
  setInterval(ajustar, 700);
})();
