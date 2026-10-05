/* So no link da loja (?m=). Nao mexe no app da revendedora. */
(function () {
  if (!/[?&]m=/.test(location.search)) return;
  function ajustar() {
    document.querySelectorAll("button, a").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (t === "Carrinho") el.textContent = "Seleção";
      if (t === "Por no carrinho") el.textContent = "Guardar na seleção";
    });
    if (!document.getElementById("luxi-venda-foco") && document.body.innerText.indexOf("Loja") >= 0) {
      var nota = document.createElement("div");
      nota.id = "luxi-venda-foco";
      nota.setAttribute("role", "status");
      nota.style.cssText = "max-width:720px;margin:8px auto 0;padding:0 16px;font:13px 'Helvetica Neue',Arial,sans-serif;color:#746569";
      nota.textContent = "Escolha as peças e envie o pedido. O pagamento combina com a loja.";
      var root = document.getElementById("root");
      if (root && root.firstChild) root.insertBefore(nota, root.firstChild.nextSibling);
    }
  }
  setInterval(ajustar, 800);
})();
