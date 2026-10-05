/* Sucesso do cliente, so no painel. Nao roda na vitrine (?m=). Nao altera o bundle. */
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

  function estiloBotao(tipo) {
    var base = "flex:1;min-height:46px;border-radius:12px;font:600 14px 'Helvetica Neue',Arial,sans-serif;cursor:pointer;padding:12px 10px;";
    if (tipo === "perigo") return base + "background:#FDF2F4;color:#A8562F;border:1px solid #E7C9C4;";
    if (tipo === "forte") return base + "background:#A0606D;color:#fff;border:none;";
    return base + "background:#fff;color:#3A2F35;border:1px solid #E4D5D8;";
  }

  function montar() {
    if (!/Ajudar uma cliente a entrar/.test(document.body.innerText || "")) return;
    if (document.getElementById("luxi-sucesso-cliente")) return;
    var ancora = Array.from(document.querySelectorAll(".oj-sec")).find(function (n) {
      return n.textContent.indexOf("Ajudar uma cliente") >= 0;
    });
    if (!ancora || !ancora.parentNode) return;

    var caixa = document.createElement("div");
    caixa.id = "luxi-sucesso-cliente";
    caixa.className = "oj-card";
    caixa.style.margin = "0 0 14px";
    caixa.innerHTML = ""
      + "<div class='oj-sec' style='margin:0 0 4px'>Sucesso do cliente</div>"
      + "<div class='oj-meta' style='margin-bottom:12px;line-height:1.5'>Vale para qualquer usuário, não só o beta. A loja não é apagada ao bloquear.</div>"
      + "<label class='oj-campo'>E-mail do usuário<input id='luxi-sc-email' type='email' placeholder='grace.l@example.com' autocomplete='off'></label>"
      + "<label class='oj-campo'>Dias<input id='luxi-sc-dias' type='number' min='1' max='365' value='7'></label>"
      + "<div id='luxi-sc-msg' class='oj-meta' style='min-height:18px;margin:4px 0 8px'></div>";

    var linha = document.createElement("div");
    linha.style.cssText = "display:flex;gap:8px;margin-bottom:8px";
    var linha2 = document.createElement("div");
    linha2.style.cssText = "display:flex;gap:8px";

    function email() {
      return (document.getElementById("luxi-sc-email").value || "").trim().toLowerCase();
    }
    function dias() {
      var n = Number(document.getElementById("luxi-sc-dias").value || 7);
      if (n < 1) n = 1;
      if (n > 365) n = 365;
      return n;
    }
    function msg(t, erro) {
      var el = document.getElementById("luxi-sc-msg");
      el.textContent = t;
      el.style.color = erro ? "#A8562F" : "#4E7C5B";
    }
    function agir(rotulo, fn) {
      var e = email();
      if (!e || e.indexOf("@") < 0) { msg("Informe o e-mail do usuário.", true); return; }
      msg(rotulo + "…");
      fn(e).then(function () { msg("Feito para " + e + "."); }).catch(function (err) { msg(err.message || "Não deu.", true); });
    }

    var mais = document.createElement("button");
    mais.textContent = "Conceder dias";
    mais.style.cssText = estiloBotao("forte");
    mais.onclick = function () { agir("Concedendo", function (e) { return rpc("liberar_beta", { p_email: e, p_dias: dias() }); }); };

    var reativar = document.createElement("button");
    reativar.textContent = "Reativar";
    reativar.style.cssText = estiloBotao("");
    reativar.onclick = function () { agir("Reativando", function (e) { return rpc("liberar_beta", { p_email: e, p_dias: dias() }); }); };

    var bloquear = document.createElement("button");
    bloquear.textContent = "Bloquear acesso";
    bloquear.style.cssText = estiloBotao("perigo");
    bloquear.onclick = function () {
      var e = email();
      if (!e) { msg("Informe o e-mail do usuário.", true); return; }
      if (!confirm("Bloquear " + e + "? A loja permanece.")) return;
      agir("Bloqueando", function (em) { return rpc("revogar_beta", { p_email: em }); });
    };

    var excluir = document.createElement("button");
    excluir.textContent = "Excluir usuário";
    excluir.style.cssText = estiloBotao("perigo");
    excluir.onclick = function () {
      var e = email();
      var campo = document.querySelector("#redefinir-senha") && document.querySelector("input[type=email]");
      var emails = Array.from(document.querySelectorAll("input"));
      var alvo = emails.find(function (i) { return /e-mail da cliente/i.test((i.previousElementSibling && i.previousElementSibling.textContent) || ""); });
      if (alvo) alvo.value = e;
      msg("Role até Excluir a conta e confirme o e-mail. A exclusão não é feita daqui.");
      var titulo = Array.from(document.querySelectorAll(".oj-sec")).find(function (n) { return /Excluir/i.test(n.textContent); });
      if (titulo) titulo.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    linha.appendChild(mais);
    linha.appendChild(reativar);
    linha2.appendChild(bloquear);
    linha2.appendChild(excluir);
    caixa.appendChild(linha);
    caixa.appendChild(linha2);
    ancora.parentNode.insertBefore(caixa, ancora);
  }

  setInterval(montar, 1200);
})();
