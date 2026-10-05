/* Painel mestre. Nao roda na vitrine (?m=). Nao altera o bundle da cliente. */
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
  function lojas() {
    return fetch(URL + "/rest/v1/lojas?select=nome,slug&slug=not.is.null&order=nome.asc", {
      headers: { apikey: ANON, Authorization: "Bearer " + token() }
    }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }
  function link(slug) { return location.origin + "/?m=" + encodeURIComponent(slug); }
  function botaoLink(texto) {
    var a = document.createElement("a");
    a.target = "_blank"; a.rel = "noopener"; a.textContent = texto;
    a.style.cssText = "display:flex;align-items:center;justify-content:center;min-height:46px;margin-top:10px;border-radius:12px;background:#A0606D;color:#fff;text-decoration:none;font:600 14px 'Helvetica Neue',Arial,sans-serif";
    return a;
  }
  function observacao() {
    if (!/Modo observação/.test(document.body.innerText || "")) return;
    if (document.getElementById("luxi-ver-vitrine")) return;
    var ancora = Array.from(document.querySelectorAll("button")).find(function (b) { return /Redefinir a senha/.test(b.textContent); });
    if (!ancora || !ancora.parentNode) return;
    var a = botaoLink("Ver a vitrine que a cliente recebe");
    a.id = "luxi-ver-vitrine";
    a.href = location.origin + "/?m=loja-a";
    ancora.parentNode.insertBefore(a, ancora.nextSibling);
    var nome = ((document.body.innerText || "").match(/LOJA\s+([^\n]+)/) || [])[1] || "";
    lojas().then(function (lista) {
      var loja = lista.find(function (l) { return nome && l.nome && l.nome.toLowerCase() === nome.trim().toLowerCase(); }) || lista[0];
      if (loja && loja.slug) a.href = link(loja.slug);
    });
  }
  setInterval(observacao, 1000);
})();
