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

function pilihMenu(card) {
  let data = ambilDataMenu(card);
  let sudahAda = pesanan.find(function (item) {
    return item.nama === data.nama;
  });

  if (sudahAda) {
    sudahAda.qty++;
  } else {
    pesanan.push({
      nama: data.nama,
      harga: data.harga,
      qty: 1
    });
  }

  tampilkanPesanan();
  tampilkanPesan(data.nama + " berhasil ditambahkan ke pesanan.", "success");

  let bagianOrder = document.querySelector("#order");
  if (bagianOrder) {
    bagianOrder.scrollIntoView({ behavior: "smooth" });
  }
}

function tambahPesanan(nama) {
  let item = pesanan.find(function (data) {
    return data.nama === nama;
  });

  if (item) item.qty++;
  tampilkanPesanan();
}

function kurangiPesanan(nama) {
  let item = pesanan.find(function (data) {
    return data.nama === nama;
  });

  if (item) {
    item.qty--;
    if (item.qty <= 0) {
      hapusPesanan(nama);
    }
  }

  tampilkanPesanan();
}

function hapusPesanan(nama) {
  pesanan = pesanan.filter(function (item) {
    return item.nama !== nama;
  });

  tampilkanPesanan();
}

function tampilkanPesan(teks, tipe) {
  let kotakPesan = document.querySelector(".order-message");
  if (!kotakPesan) return;

  kotakPesan.innerText = teks;
  kotakPesan.className = "order-message " + tipe + " is-visible";
}
