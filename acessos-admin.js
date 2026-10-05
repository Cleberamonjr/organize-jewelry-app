/* App da dona. Nao roda na vitrine (?m=). Nao forca recarga. */
(function () {
  if (/[?&]m=/.test(location.search) || /[?&]demo=1/.test(location.search)) return;
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
      painel.innerHTML = "<b>Atualização da loja</b><div style='margin-top:8px;line-height:1.5'>A vitrine ficou só para venda. A Seleção não passa do estoque. Fonte, cor e banner ficam em Editar loja.</div><a href='/?demo=1' target='_blank' rel='noopener' style='display:inline-block;margin-top:10px;color:#A0606D;font-weight:600'>Ver a loja de exemplo</a>";
      botao.onclick = function () { painel.hidden = !painel.hidden; };
      document.body.appendChild(botao);
      document.body.appendChild(painel);
    }
    if (/SUA LOJA \(DEMO\)/.test(document.body.innerText || "") && !document.getElementById("luxi-demo-vitrine")) {
      var ancora = document.querySelector("main") || document.body;
      var a = document.createElement("a");
      a.id = "luxi-demo-vitrine";
      a.href = "/?demo=1";
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Ver a vitrine de exemplo";
      a.style.cssText = "position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:2147483000;background:#6b3a4a;color:#fff;text-decoration:none;border-radius:999px;padding:10px 14px;font:600 13px 'Helvetica Neue',Arial,sans-serif";
      document.body.appendChild(a);
    }
  }
  setInterval(montar, 1000);
})();
