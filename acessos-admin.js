/* Painel admin. Nao roda na vitrine (?m=). Nao altera o bundle da cliente. */
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
      headers: { apikey: ANON, Authorization: "Bearer " + token(), "Content-Type": "application/json" },
      body: JSON.stringify(corpo)
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.status); });
      return r.json().catch(function () { return {}; });
    });
  }

  function lojas() {
    return fetch(URL + "/rest/v1/lojas?select=nome,slug&slug=not.is.null&order=nome.asc", {
      headers: { apikey: ANON, Authorization: "Bearer " + token() }
    }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }

  function estilo(tipo) {
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
    caixa.innerHTML = "<div class='oj-sec' style='margin:0 0 4px'>Sucesso do cliente</div>"
      + "<div class='oj-meta' style='margin-bottom:12px;line-height:1.5'>Ações para qualquer usuário. Bloquear não apaga a loja.</div>"
      + "<label class='oj-campo'>E-mail do usuário<input id='luxi-sc-email' type='email' placeholder='grace.l@example.com' autocomplete='off'></label>"
      + "<label class='oj-campo'>Dias<input id='luxi-sc-dias' type='number' min='1' max='365' value='7'></label>"
      + "<div id='luxi-sc-msg' class='oj-meta' style='min-height:18px;margin:4px 0 8px'></div>";
    var linha = document.createElement("div");
    linha.style.cssText = "display:flex;gap:8px;margin-bottom:8px";
    var linha2 = document.createElement("div");
    linha2.style.cssText = "display:flex;gap:8px";
    function email() { return (document.getElementById("luxi-sc-email").value || "").trim().toLowerCase(); }
    function dias() { var n = Number(document.getElementById("luxi-sc-dias").value || 7); return Math.max(1, Math.min(365, n)); }
    function msg(t, erro) { var el = document.getElementById("luxi-sc-msg"); el.textContent = t; el.style.color = erro ? "#A8562F" : "#4E7C5B"; }
    function agir(rotulo, fn) {
      var e = email();
      if (!e || e.indexOf("@") < 0) { msg("Informe o e-mail do usuário.", true); return; }
      msg(rotulo + "…");
      fn(e).then(function () { msg("Feito para " + e + "."); }).catch(function (err) { msg(err.message || "Não deu.", true); });
    }
    var mais = document.createElement("button");
    mais.textContent = "Conceder dias"; mais.style.cssText = estilo("forte");
    mais.onclick = function () { agir("Concedendo", function (e) { return rpc("liberar_beta", { p_email: e, p_dias: dias() }); }); };
    var reativar = document.createElement("button");
    reativar.textContent = "Reativar"; reativar.style.cssText = estilo("");
    reativar.onclick = function () { agir("Reativando", function (e) { return rpc("liberar_beta", { p_email: e, p_dias: dias() }); }); };
    var bloquear = document.createElement("button");
    bloquear.textContent = "Bloquear acesso"; bloquear.style.cssText = estilo("perigo");
    bloquear.onclick = function () {
      var e = email();
      if (!e || !confirm("Bloquear " + e + "? A loja permanece.")) return;
      agir("Bloqueando", function (em) { return rpc("revogar_beta", { p_email: em }); });
    };
    linha.appendChild(mais); linha.appendChild(reativar); linha2.appendChild(bloquear);
    caixa.appendChild(linha); caixa.appendChild(linha2);

    var vitrines = document.createElement("div");
    vitrines.className = "oj-card";
    vitrines.style.margin = "0 0 14px";
    vitrines.innerHTML = "<div class='oj-sec' style='margin:0 0 4px'>Vitrines enviadas às clientes</div>"
      + "<div class='oj-meta' style='margin-bottom:10px;line-height:1.5'>O link que a loja manda no WhatsApp. Abre em outra aba, só leitura.</div>"
      + "<div id='luxi-vitrines-lista'>Carregando…</div>";

    ancora.parentNode.insertBefore(vitrines, ancora);
    ancora.parentNode.insertBefore(caixa, vitrines);

    lojas().then(function (lista) {
      var box = document.getElementById("luxi-vitrines-lista");
      if (!box) return;
      if (!lista.length) { box.textContent = "Nenhuma vitrine publicada ainda."; return; }
      box.innerHTML = "";
      lista.forEach(function (loja) {
        if (!loja.slug) return;
        var href = location.origin + "/?m=" + encodeURIComponent(loja.slug);
        var row = document.createElement("div");
        row.style.cssText = "display:flex;gap:8px;align-items:center;margin-top:8px";
        var nome = document.createElement("div");
        nome.style.cssText = "flex:1;font-size:14px";
        nome.textContent = (loja.nome || loja.slug) + " · " + loja.slug;
        var abrir = document.createElement("a");
        abrir.href = href; abrir.target = "_blank"; abrir.rel = "noopener";
        abrir.textContent = "Ver como a cliente vê";
        abrir.style.cssText = "min-height:42px;display:inline-flex;align-items:center;padding:0 14px;border-radius:12px;background:#A0606D;color:#fff;text-decoration:none;font-weight:600;font-size:14px";
        row.appendChild(nome); row.appendChild(abrir); box.appendChild(row);
      });
    });
  }

  setInterval(montar, 1200);
})();
