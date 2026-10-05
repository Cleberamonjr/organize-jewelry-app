/* Painel. Nao roda na vitrine (?m=). Nao forca recarregar quem ja esta usando. */
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
    ok.onclick = function () { try { sessionStorage.setItem("luxi-atualizacao-vitrine", "1"); } catch (e) {} barra.remove(); };
    barra.appendChild(ok);
    document.body.appendChild(barra);
  }
  function observacao() {
    if (!/Modo observação/.test(document.body.innerText || "")) return;
    if (document.getElementById("luxi-ver-vitrine")) return;
    var ancora = Array.from(document.querySelectorAll("button")).find(function (b) { return /Redefinir a senha/.test(b.textContent); });
    if (!ancora || !ancora.parentNode) return;
    var a = document.createElement("a");
    a.id = "luxi-ver-vitrine"; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Ver a vitrine que a cliente recebe";
    a.style.cssText = "display:flex;align-items:center;justify-content:center;min-height:46px;margin-top:10px;border-radius:12px;background:#A0606D;color:#fff;text-decoration:none;font:600 14px 'Helvetica Neue',Arial,sans-serif";
    a.href = location.origin + "/?m=loja-a";
    ancora.parentNode.insertBefore(a, ancora.nextSibling);
    var nome = ((document.body.innerText || "").match(/LOJA\s+([^\n]+)/) || [])[1] || "";
    lojas().then(function (lista) {
      var loja = lista.find(function (l) { return nome && l.nome && l.nome.toLowerCase() === nome.trim().toLowerCase(); }) || lista[0];
      if (loja && loja.slug) a.href = link(loja.slug);
    });
  }
  setTimeout(aviso, 1200);
  setInterval(observacao, 1000);
})();
