/* Modelo da vitrine. So no link ?m=. Nao altera o app da revendedora. */
(function () {
  if (!/[?&]m=/.test(location.search)) return;
  var FONTES = [
    ["Helvetica", "'Helvetica Neue', Helvetica, Arial, sans-serif"],
    ["Georgia", "Georgia, 'Times New Roman', serif"],
    ["Garamond", "Garamond, 'Palatino Linotype', Palatino, serif"],
    ["Didot", "Didot, 'Bodoni MT', 'Times New Roman', serif"],
    ["Palatino", "Palatino, 'Palatino Linotype', Georgia, serif"],
    ["Futura", "Futura, 'Trebuchet MS', 'Helvetica Neue', sans-serif"],
    ["Optima", "Optima, Candara, 'Helvetica Neue', sans-serif"]
  ];
  var slug = (location.search.match(/[?&]m=([^&]+)/) || [])[1] || "loja";
  var chave = "luxi-fonte:" + slug;
  var css = document.createElement("style");
  css.textContent = [
    ".lona-topo{padding:32px 20px 12px;text-align:center}",
    ".lona-nome{font-size:36px;letter-spacing:.06em;font-weight:500;margin:0}",
    ".lona-frase{margin:10px auto 0;max-width:26ch;font-size:15px;line-height:1.5;opacity:.78}",
    ".lona-filete{width:36px;height:1px;margin:18px auto 0;background:currentColor;opacity:.3}",
    ".lona-rodape{margin-top:36px;padding:20px 16px 28px;text-align:center;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.62}",
    "#luxi-fontes{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:520px;margin:8px auto 28px;padding:0 16px}",
    "#luxi-fontes button{border:1px solid rgba(58,47,53,.18);background:transparent;border-radius:999px;padding:7px 10px;font-size:12px;cursor:pointer;color:inherit}"
  ].join("");
  document.head.appendChild(css);

  function aplicar(nome) {
    var fonte = FONTES.filter(function (f) { return f[0] === nome; })[0] || FONTES[0];
    var lona = document.querySelector(".lona");
    if (lona) lona.style.setProperty("--lona-fonte", fonte[1]);
    document.querySelectorAll(".lona-nome,.lona-frase,.lona-peca-nome").forEach(function (el) { el.style.fontFamily = fonte[1]; });
    try { localStorage.setItem(chave, fonte[0]); } catch (e) {}
    var nomeLoja = (document.querySelector(".lona-nome") || {}).textContent || "Loja";
    document.title = nomeLoja.trim();
  }

  function montar() {
    var lona = document.querySelector(".lona");
    if (!lona) return;
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (t === "Carrinho" || t === "Seleção") el.textContent = "Seleção";
      if (t === "Por no carrinho" || t === "Guardar na seleção") el.textContent = "Guardar na seleção";
    });
    var rodape = document.querySelector(".lona-rodape");
    if (rodape) rodape.textContent = "Peças sob consulta · entrega a combinar";
    if (!document.getElementById("luxi-fontes")) {
      var caixa = document.createElement("div");
      caixa.id = "luxi-fontes";
      caixa.setAttribute("aria-label", "Fonte da loja");
      FONTES.forEach(function (f) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = f[0];
        b.onclick = function () { aplicar(f[0]); };
        caixa.appendChild(b);
      });
      lona.appendChild(caixa);
    }
    var salva = "Georgia";
    try { salva = localStorage.getItem(chave) || "Georgia"; } catch (e) {}
    aplicar(salva);
  }
  setInterval(montar, 800);
})();
