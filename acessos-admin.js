/* App da dona. Nao roda na vitrine (?m=). Nao forca recarga. */
(function () {
  if (/[?&]m=/.test(location.search)) return;
  function montar() {
    if (!document.getElementById("luxi-atualizacao") && document.body) {
      var botao = document.createElement("button");
      botao.id = "luxi-atualizacao";
      botao.type = "button";
      botao.textContent = "Atualização";
      botao.style.cssText = "position:fixed;top:calc(10px + env(safe-area-inset-top));right:12px;z-index:2147483000;background:#3A2F35;color:#fff;border:none;border-radius:999px;padding:8px 12px;font:600 12px 'Helvetica Neue',Arial,sans-serif;cursor:pointer";
      var painel = document.createElement("div");
      painel.id = "luxi-atualizacao-painel";
      painel.hidden = true;
      painel.style.cssText = "position:fixed;top:calc(48px + env(safe-area-inset-top));right:12px;z-index:2147483000;width:min(320px,calc(100% - 24px));background:#fff;color:#3A2F35;border-radius:14px;padding:14px;font:14px 'Helvetica Neue',Arial,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.18)";
      painel.innerHTML = "<b>Atualização da loja</b><div style='margin-top:8px;line-height:1.5'>A vitrine ficou só para venda. A Seleção não passa do estoque. Fonte, cor e banner ficam em Editar loja.</div>";
      botao.onclick = function () { painel.hidden = !painel.hidden; };
      document.body.appendChild(botao);
      document.body.appendChild(painel);
    }
    if (/Modo observação/.test(document.body.innerText || "") && !document.getElementById("luxi-ver-vitrine")) {
      var ancora = Array.from(document.querySelectorAll("button")).find(function (b) { return /Redefinir a senha/.test(b.textContent); });
      if (ancora && ancora.parentNode) {
        var a = document.createElement("a");
        a.id = "luxi-ver-vitrine"; a.target = "_blank"; a.rel = "noopener"; a.href = location.origin + "/?m=loja-a";
        a.textContent = "Ver a vitrine que a cliente recebe";
        a.style.cssText = "display:flex;align-items:center;justify-content:center;min-height:46px;margin-top:10px;border-radius:12px;background:#A0606D;color:#fff;text-decoration:none;font:600 14px 'Helvetica Neue',Arial,sans-serif";
        ancora.parentNode.insertBefore(a, ancora.nextSibling);
      }
    }
  }
  setInterval(montar, 1000);
})();
