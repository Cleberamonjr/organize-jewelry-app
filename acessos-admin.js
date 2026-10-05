/* Painel Usuários e acessos. Não roda na vitrine (?m=). Não altera o bundle. */
(function () {
  if (/[?&]m=/.test(location.search)) return;
  var URL = "https://eraxjtfedswksiyigasf.supabase.co";
  var ANON = "sb_publishable_n4NDtzQFfOU3f2p2RFUvVQ_ZLqtFmsx";

  function token() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.indexOf("auth-token") < 0) continue;
        var o = JSON.parse(localStorage.getItem(k) || "{}");
        if (o.access_token) return o.access_token;
      }
    } catch (e) {}
    return "";
  }

  function rpc(nome, corpo) {
    return fetch(URL + "/rest/v1/rpc/" + nome, {
      method: "POST",
      headers: {
        apikey: ANON,
        Authorization: "Bearer " + token(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(corpo)
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.status); });
      return r.json().catch(function () { return {}; });
    });
  }

  function aviso() {
    if (document.getElementById("luxi-acessos-versao")) return;
    if (document.getElementById("luxi-nova-versao")) return;
    var barra = document.createElement("div");
    barra.id = "luxi-acessos-versao";
    barra.setAttribute("role", "status");
    barra.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:2147483000;background:#3A2F35;color:#fff;border-radius:14px;padding:12px 14px;font:14px 'Helvetica Neue',Arial,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.3);max-width:520px;margin:0 auto";
    barra.innerHTML = "<b>Tem uma versão nova do Luxi.</b><div style='margin:6px 0 10px;line-height:1.45'>Mais dias, reativar conta, bloquear acesso e excluir usuário com confirmação.</div>";
    var atualizar = document.createElement("button");
    atualizar.textContent = "Atualizar agora";
    atualizar.style.cssText = "background:#A0606D;border:none;color:#fff;font:inherit;font-weight:600;padding:10px 16px;border-radius:10px;cursor:pointer";
    atualizar.onclick = function () {
      if (navigator.serviceWorker) navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg && reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        location.reload();
      });
      else location.reload();
    };
    var depois = document.createElement("button");
    depois.textContent = "Depois";
    depois.style.cssText = "background:none;border:none;color:#ddd;font:inherit;padding:10px 8px;cursor:pointer";
    depois.onclick = function () { barra.remove(); };
    barra.appendChild(atualizar);
    barra.appendChild(depois);
    document.body.appendChild(barra);
  }

  function emailDaLinha(card) {
    var t = card.innerText || "";
    var m = t.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    return m ? m[0] : "";
  }

  function botao(texto, fn) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "oj-bt";
    b.textContent = texto;
    b.style.marginRight = "6px";
    b.onclick = fn;
    return b;
  }

  function enriquecer() {
    if (!/Acessos Beta|Liberar uma cliente/.test(document.body.innerText || "")) return;
    document.querySelectorAll(".oj-card").forEach(function (card) {
      if (card.dataset.luxiAcoes) return;
      var email = emailDaLinha(card);
      if (!email) return;
      card.dataset.luxiAcoes = "1";
      var faixa = document.createElement("div");
      faixa.style.marginTop = "8px";
      faixa.appendChild(botao("+ 7 dias", function () {
        rpc("liberar_beta", { p_email: email, p_dias: 7 }).then(function () { location.reload(); }).catch(function (e) { alert(e.message); });
      }));
      faixa.appendChild(botao("Reativar", function () {
        rpc("liberar_beta", { p_email: email, p_dias: 7 }).then(function () { location.reload(); }).catch(function (e) { alert(e.message); });
      }));
      faixa.appendChild(botao("Bloquear", function () {
        if (!confirm("Bloquear o acesso de " + email + "? A loja não é apagada.")) return;
        rpc("revogar_beta", { p_email: email }).then(function () { location.reload(); }).catch(function (e) { alert(e.message); });
      }));
      card.appendChild(faixa);
    });
  }

  setInterval(enriquecer, 1500);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg && reg.waiting) aviso();
    }).catch(function () {});
  }
})();
