/* Vitrine publica. Quantidade na selecao. So no link ?m=. */
(function () {
  if (!/[?&]m=/.test(location.search)) return;
  var qtd = {};
  var css = document.createElement("style");
  css.textContent = ".luxi-qtd{display:flex;align-items:center;gap:8px;margin-top:8px;font:13px 'Helvetica Neue',Arial,sans-serif}.luxi-qtd button{width:32px;height:32px;border-radius:50%;border:1px solid rgba(58,47,53,.2);background:#fff;cursor:pointer}";
  document.head.appendChild(css);
  function ajustar() {
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (t === "Carrinho" || t.indexOf("Seleção") === 0) {
        if (t.indexOf("·") < 0) el.textContent = "Seleção";
      }
      if (t === "Por no carrinho") el.textContent = "Guardar na seleção";
      if (t.indexOf("No carrinho") === 0) el.textContent = "Na seleção ✓";
    });
    document.querySelectorAll(".lona-peca").forEach(function (card, i) {
      var nome = ((card.querySelector(".lona-peca-nome") || {}).textContent || "peça " + i).trim();
      var na = /Na seleção/.test(card.innerText);
      var box = card.querySelector(".luxi-qtd");
      if (!na) { if (box) box.remove(); return; }
      if (!qtd[nome]) qtd[nome] = 1;
      if (!box) {
        box = document.createElement("div");
        box.className = "luxi-qtd";
        var menos = document.createElement("button"); menos.type = "button"; menos.textContent = "−";
        var n = document.createElement("span");
        var mais = document.createElement("button"); mais.type = "button"; mais.textContent = "+";
        menos.onclick = function (e) { e.stopPropagation(); qtd[nome] = Math.max(1, qtd[nome] - 1); n.textContent = qtd[nome] + (qtd[nome] > 1 ? " peças" : " peça"); };
        mais.onclick = function (e) { e.stopPropagation(); qtd[nome] += 1; n.textContent = qtd[nome] + " peças"; };
        box.appendChild(menos); box.appendChild(n); box.appendChild(mais);
        var acoes = card.querySelector(".lona-acoes") || card;
        acoes.appendChild(box);
      }
      box.querySelector("span").textContent = qtd[nome] + (qtd[nome] > 1 ? " peças" : " peça");
    });
    var rodape = document.querySelector(".lona-rodape");
    if (rodape && rodape.textContent.indexOf("sob consulta") < 0) rodape.textContent = "Peças sob consulta · entrega a combinar";
    var nomeLoja = (document.querySelector(".lona-nome") || {}).textContent;
    if (nomeLoja) document.title = nomeLoja.trim();
  }
  setInterval(ajustar, 800);
})();
