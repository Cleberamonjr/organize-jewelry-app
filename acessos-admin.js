/* Botao Atualizacao sempre visivel no app. Nao roda na vitrine (?m=). Nao forca recarga. */
(function () {
  if (/[?&]m=/.test(location.search)) return;
  function montar() {
    if (document.getElementById("luxi-atualizacao")) return;
    if (!document.body) return;
    var botao = document.createElement("button");
    botao.id = "luxi-atualizacao";
    botao.type = "button";
    botao.textContent = "Atualização";
    botao.style.cssText = "position:fixed;top:calc(10px + env(safe-area-inset-top));right:12px;z-index:2147483000;background:#3A2F35;color:#fff;border:none;border-radius:999px;padding:8px 12px;font:600 12px 'Helvetica Neue',Arial,sans-serif;letter-spacing:.04em;cursor:pointer";
    var painel = document.createElement("div");
    painel.id = "luxi-atualizacao-painel";
    painel.hidden = true;
    painel.style.cssText = "position:fixed;top:calc(48px + env(safe-area-inset-top));right:12px;z-index:2147483000;width:min(320px,calc(100% - 24px));background:#fff;color:#3A2F35;border-radius:14px;padding:14px;font:14px 'Helvetica Neue',Arial,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.18)";
    painel.innerHTML = "<b>Atualização da loja</b><div style='margin-top:8px;line-height:1.5'>A vitrine ficou só para venda. A Seleção não passa do estoque. Fonte, cor e banner ficam em Editar loja.</div>";
    botao.onclick = function () { painel.hidden = !painel.hidden; };
    document.body.appendChild(botao);
    document.body.appendChild(painel);
  }
  setInterval(montar, 1000);
})();
