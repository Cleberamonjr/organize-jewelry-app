/* Painel. Nao roda na vitrine (?m=). Nao forca recarregar quem ja esta usando. */
(function () {
  if (/[?&]m=/.test(location.search)) return;
  function aviso() {
    if (document.getElementById("luxi-atualizacao")) return;
    try { if (sessionStorage.getItem("luxi-atualizacao-vitrine") === "1") return; } catch (e) {}
    if (!document.body) return;
    var barra = document.createElement("div");
    barra.id = "luxi-atualizacao";
    barra.setAttribute("role", "status");
    barra.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:2147483000;background:#3A2F35;color:#fff;border-radius:14px;padding:12px 14px;font:14px 'Helvetica Neue',Arial,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.3);max-width:520px;margin:0 auto";
    barra.innerHTML = "<b>Atualização da loja</b><div style='margin:6px 0 10px;line-height:1.45'>A vitrine ficou só para venda. A Seleção não passa do estoque. Fonte, cor e banner continuam em Editar loja.</div>";
    var ok = document.createElement("button");
    ok.textContent = "Entendi";
    ok.style.cssText = "background:#A0606D;border:none;color:#fff;font:inherit;font-weight:600;padding:10px 16px;border-radius:10px;cursor:pointer";
    ok.onclick = function () {
      try { sessionStorage.setItem("luxi-atualizacao-vitrine", "1"); } catch (e) {}
      barra.remove();
    };
    barra.appendChild(ok);
    document.body.appendChild(barra);
  }
  setTimeout(aviso, 1200);
})();
