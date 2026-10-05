/* Aviso de versao: nunca no login, nunca na vitrine. Rodape, so sugestao. */
(function () {
  if (/[?&]m=/.test(location.search) || /[?&]demo=1/.test(location.search)) return;
  var css = document.createElement("style");
  css.textContent = "#luxi-aviso-rodape{position:fixed;left:0;right:0;bottom:0;z-index:40;text-align:center;padding:10px 16px calc(10px + env(safe-area-inset-bottom));background:#FBF8F9;border-top:1px solid #E4D5D8;font:13px 'Helvetica Neue',Arial,sans-serif;color:#8B505C}#luxi-aviso-rodape button{background:none;border:none;color:#8B505C;font:inherit;text-decoration:underline;cursor:pointer;min-height:40px}#luxi-sair-condicao{position:fixed;top:12px;right:12px;z-index:2147483000;background:#fff;border:1px solid #E4D5D8;border-radius:999px;padding:8px 14px;font:600 13px 'Helvetica Neue',Arial,sans-serif;cursor:pointer}";
  document.head.appendChild(css);

  function noLogin() {
    var t = document.body ? document.body.innerText : "";
    return /E-mail ou usuário/.test(t) && /Entrar/.test(t) && !/Início/.test(t);
  }
  function dentro() {
    var t = document.body ? document.body.innerText : "";
    return /Início|Peças|Vendas/.test(t) && !noLogin();
  }
  function limparLogin() {
    ["luxi-nova-versao", "luxi-aviso-rodape", "luxi-acessos-versao"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
  }
  function sugerir() {
    if (document.getElementById("luxi-aviso-rodape")) return;
    var barra = document.getElementById("luxi-nova-versao");
    if (barra) barra.remove();
    var p = document.createElement("div");
    p.id = "luxi-aviso-rodape";
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = "Há uma nova atualização";
    b.onclick = function () {
      if (navigator.serviceWorker) navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg && reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        location.reload();
      });
      else location.reload();
    };
    p.appendChild(b);
    document.body.appendChild(p);
  }
  function saida() {
    var t = document.body ? document.body.innerText : "";
    if (!/condições da informação da loja|informações da loja/.test(t)) {
      var antigo = document.getElementById("luxi-sair-condicao");
      if (antigo) antigo.remove();
      return;
    }
    if (document.getElementById("luxi-sair-condicao")) return;
    if (/Sair|Fechar|Voltar/.test(t)) return;
    var s = document.createElement("button");
    s.id = "luxi-sair-condicao";
    s.type = "button";
    s.textContent = "Sair";
    s.onclick = function () {
      if (history.length > 1) history.back();
      else location.href = location.origin + "/";
    };
    document.body.appendChild(s);
  }
  setInterval(function () {
    if (noLogin()) limparLogin();
    else if (dentro() && document.getElementById("luxi-nova-versao")) sugerir();
    saida();
  }, 700);
  window.addEventListener("luxi:nova-versao", function () {
    if (noLogin()) limparLogin();
    else if (dentro()) sugerir();
  });
})();
