let pesanan = [];

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function ambilDataMenu(card) {
  let nama = card.querySelector("h3, h4").innerText;
  let teksHarga = card.querySelector(".menu-price, p:not(.menu-desc)").innerText;
  let harga = parseInt(teksHarga.replace(/\D/g, ""));

  return {
    nama: nama,
    harga: harga
  };
}

function hitungTotal() {
  let totalItem = 0;
  let subtotal = 0;

  pesanan.forEach(function (item) {
    totalItem += item.qty;
    subtotal += item.harga * item.qty;
  });

  let diskon = 0;
  if (subtotal >= 100000) {
    diskon = subtotal * 0.1;
  }

  let totalAkhir = subtotal - diskon;
  let estimasi = totalItem > 0 ? 15 + totalItem * 3 + " menit" : "-";

  return {
    totalItem: totalItem,
    subtotal: subtotal,
    diskon: diskon,
    totalAkhir: totalAkhir,
    estimasi: estimasi
  };
}
