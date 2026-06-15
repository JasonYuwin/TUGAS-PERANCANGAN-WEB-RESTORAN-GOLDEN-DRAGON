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
  function tampilkanPesanan() {
  let tbody = document.querySelector("#order tbody");
  let totalHarga = document.querySelector(".total-price");
  let jumlahItem = document.querySelector("#itemCount");
  let waktu = document.querySelector("#estimateTime");
  let promo = document.querySelector("#promoInfo");

  if (!tbody) return;

  tbody.innerHTML = "";

  if (pesanan.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    `;
  } else {
    pesanan.forEach(function (item) {
      let baris = document.createElement("tr");
      baris.innerHTML = `
        <td>${item.nama}</td>
        <td>${formatRupiah(item.harga)}</td>
        <td>
          <div class="qty-control">
            <button type="button" onclick="kurangiPesanan('${item.nama}')">-</button>
            <span>${item.qty}</span>
            <button type="button" onclick="tambahPesanan('${item.nama}')">+</button>
          </div>
        </td>
        <td>
          <div class="row-total">
            <span>${formatRupiah(item.harga * item.qty)}</span>
            <button type="button" class="remove-item" onclick="hapusPesanan('${item.nama}')">Hapus</button>
          </div>
        </td>
      `;
      tbody.appendChild(baris);
    });
  }

  let hasil = hitungTotal();

  if (totalHarga) totalHarga.innerText = "Total: " + formatRupiah(hasil.totalAkhir);
  if (jumlahItem) jumlahItem.innerText = hasil.totalItem;
  if (waktu) waktu.innerText = hasil.estimasi;

  if (promo) {
    if (hasil.diskon > 0) {
      promo.innerText = "Diskon " + formatRupiah(hasil.diskon);
    } else {
      promo.innerText = "Min. Rp 100.000";
    }
  }
}

}
