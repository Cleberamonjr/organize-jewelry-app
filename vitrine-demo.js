/* Vitrine de exemplo da demonstracao. So em ?demo=1. */
(function () {
  if (!/[?&]demo=1/.test(location.search)) return;
  document.title = "Loja exemplo";
  var root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";
  var artigo = document.createElement("article");
  artigo.style.cssText = "max-width:480px;margin:0 auto;padding:28px 20px 48px;font-family:Georgia,serif;color:#3A2F35;background:#FBF8F9;min-height:100vh";
  artigo.innerHTML = [
    "<p style='letter-spacing:.14em;font:11px Helvetica,Arial,sans-serif;text-transform:uppercase'>Seleção</p>",
    "<h1 style='font-weight:500;font-size:36px;letter-spacing:.04em;margin:18px 0 8px;text-align:center'>Loja exemplo</h1>",
    "<p style='text-align:center;max-width:26ch;margin:0 auto 18px;line-height:1.45'>Peças escolhidas para hoje. Pronta entrega.</p>",
    "<div style='width:36px;height:1px;background:#3A2F35;opacity:.3;margin:0 auto 22px'></div>",
    "<img alt='Colar Riviera' src='https://eraxjtfedswksiyigasf.supabase.co/storage/v1/object/public/fotos-pecas/c03599b8-56e1-4788-ba84-02d24b27eb3f/20b0ad14-8b3c-444e-9017-a511858197e5.jpg' style='width:100%;border-radius:16px;display:block'>" ,
    "<div style='display:flex;justify-content:space-between;align-items:baseline;margin-top:12px'><h2 style='font-size:20px;font-weight:500;margin:0'>Colar Riviera</h2><b>R$ 70,00</b></div>",
    "<p style='font:13px Helvetica,Arial,sans-serif;opacity:.7'>Banho e tamanho vêm do cadastro. A quantidade não passa do estoque.</p>",
    "<button style='width:100%;margin-top:8px;min-height:46px;border:none;border-radius:12px;background:#6b3a4a;color:#fff;font-weight:600'>Guardar na seleção</button>",
    "<p style='text-align:center;margin-top:28px;font:11px Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;opacity:.6'>Peças sob consulta · entrega a combinar</p>"
  ].join("");
  root.appendChild(artigo);
})();
