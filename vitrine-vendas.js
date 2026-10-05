/* Vitrine publica. Quantidade nunca passa do estoque. So no link ?m=. */
(function () {
  if (!/[?&]m=/.test(location.search)) return;
  var qtd = {};
  var maximo = {};
  var css = document.createElement("style");
  css.textContent = ".luxi-qtd{display:flex;align-items:center;gap:8px;margin-top:8px;font:13px 'Helvetica Neue',Arial,sans-serif}.luxi-qtd button{width:32px;height:32px;border-radius:50%;border:1px solid rgba(58,47,53,.2);background:#fff;cursor:pointer}.luxi-qtd button:disabled{opacity:.35;cursor:default}";
  document.head.appendChild(css);
  function carregarLimite() {
    var slug = decodeURIComponent((location.search.match(/[?&]m=([^&]+)/) || [])[1] || "");
    if (!slug) return;
    fetch("https://eraxjtfedswksiyigasf.supabase.co/rest/v1/rpc/lona_publica", {
      method: "POST",
      headers: { apikey: "sb_publishable_n4NDtzQFfOU3f2p2RFUvVQ_ZLqtFmsx", "Content-Type": "application/json" },
      body: JSON.stringify({ p_slug: slug })
    }).then(function (r) { return r.json(); }).then(function (lona) {
      (lona.itens || []).forEach(function (it) {
        var n = Number(it.disponivel != null ? it.disponivel : it.qtd);
        maximo[it.nome] = n > 0 ? n : 1;
      });
    }).catch(function () {});
  }
  carregarLimite();
  function ajustar() {
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (t === "Carrinho") el.textContent = "Seleção";
      if (t === "Por no carrinho") el.textContent = "Guardar na seleção";
      if (t.indexOf("No carrinho") === 0) el.textContent = "Na seleção ✓";
    });
    document.querySelectorAll(".lona-peca").forEach(function (card, i) {
      var nome = ((card.querySelector(".lona-peca-nome") || {}).textContent || "peça " + i).trim();
      var teto = maximo[nome] > 0 ? maximo[nome] : 1;
      var na = /Na seleção/.test(card.innerText);
      var box = card.querySelector(".luxi-qtd");
      if (!na) { if (box) box.remove(); return; }
      if (!qtd[nome] || qtd[nome] > teto) qtd[nome] = Math.min(qtd[nome] || 1, teto);
      if (!box) {
        box = document.createElement("div");
        box.className = "luxi-qtd";
        var menos = document.createElement("button"); menos.type = "button"; menos.textContent = "−";
        var n = document.createElement("span");
        var mais = document.createElement("button"); mais.type = "button"; mais.textContent = "+";
        menos.onclick = function (e) { e.stopPropagation(); qtd[nome] = Math.max(1, qtd[nome] - 1); };
        mais.onclick = function (e) { e.stopPropagation(); if (qtd[nome] < teto) qtd[nome] += 1; };
        box.appendChild(menos); box.appendChild(n); box.appendChild(mais);
        (card.querySelector(".lona-acoes") || card).appendChild(box);
      }
      box.querySelector("span").textContent = qtd[nome] + (qtd[nome] > 1 ? " peças" : " peça");
      box.querySelectorAll("button")[1].disabled = qtd[nome] >= teto;
    });
    var nomeLoja = (document.querySelector(".lona-nome") || {}).textContent;
    if (nomeLoja) document.title = nomeLoja.trim();
  }
  setInterval(ajustar, 800);
})();
