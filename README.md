# SaySisten v3.1.2 — Ikon & Emoji Gaya iOS

## Instalasi
Hanya frontend; backend (`Code.txt`) tidak berubah. Unggah ke GitHub Pages:
`index.html`, `sw.js`, dan **folder baru `em/`** (31 gambar PNG, ±240 KB). Buka aplikasi, ketuk **Perbarui sekarang**. Cek ⚙: versi **3.1.2**.
Folder `em/` wajib ikut diunggah; tanpa folder ini emoji akan tampil sebagai gambar rusak.

## Yang berubah (tampilan saja)
- **Ikon Ionicons** (lisensi MIT) bergaya iOS untuk navigasi bawah, ⚙, +, tema, centang, dan sematkan.
  Tab yang sedang dibuka memakai ikon bentuk penuh, tab lain bentuk garis, seperti tab bar iPhone.
- **Fluent Emoji 3D** (lisensi MIT, Microsoft) menggantikan emoji di tampilan aplikasi: sapaan, kartu Rutinitas, kendaraan, pajak,
  banner perhatian, tombol, notifikasi toast, dan sheet. Tampil sama di semua HP (Android maupun iPhone).
- Gambar emoji disimpan di cache aplikasi, jadi tetap tampil saat offline.
- Emoji yang diketik sendiri di judul item dan judul event Google Calendar tetap memakai emoji bawaan HP.

---
# SaySisten v3.0 — Tampilan Liquid Glass (gaya iOS)

## Instalasi
Perubahan hanya di sisi tampilan; **backend (`Code.txt`) tidak berubah dari v2.5**, jadi tidak perlu deploy ulang Apps Script.
1. Cadangkan data (⚙ → Backup JSON), lalu timpa `index.html`, `sw.js`, `manifest.webmanifest`, dan folder `icons/` di GitHub Pages.
2. Buka aplikasi (HTTPS), ketuk **Perbarui sekarang** pada banner. Cek ⚙: versi **3.0.0**.
   Bila tampilan lama masih muncul, tutup aplikasi sepenuhnya lalu buka lagi.

## Yang berubah
- **Material kaca**: kartu, statistik, kolom ide, tombol kecil, dan sheet memakai kaca tembus pandang dengan pantulan cahaya di tepi (highlight spekuler) di atas latar warna yang bergerak pelan.
- **Navigasi bawah**: lensa kaca yang meluncur dan sedikit melentur (squish) saat berpindah tab.
- **Tombol + cair**: saat ditekan, sheet formulir "membesar" dari posisi tombol dengan pegas (spring), tombol menghilang, dan layar belakang memburam.
- **Morphing antar tab**: transisi blur + geser memakai View Transitions API (Chrome/Safari terbaru), dengan kartu muncul bertahap. Peramban lama otomatis memakai animasi kartu saja.
- **Judul besar ala iOS**: judul mengecil menjadi bar kaca saat halaman digulir; banner dan status sinkron ikut menyusut.
- **Umpan balik sentuh**: semua tombol dan kartu menekan dengan efek pegas.
- Font memakai SF Pro (otomatis di iPhone); di perangkat lain memakai Plus Jakarta Sans.
- Pilihan jenis di form kini muat dalam satu baris; tombol aksi kartu tidak lagi terhimpit.
- Mode gelap mengikuti pengaturan HP. Warna status bar mengikuti tema.

## Aksesibilitas dan performa
- Menghormati *Reduce Motion* (semua animasi dimatikan) dan *Reduce Transparency* (kaca diganti latar solid).
- Blur sungguhan hanya dipakai pada elemen yang menimpa konten (navigasi, sheet, tombol, toast, header saat digulir); kartu memakai kaca ringan tanpa blur agar daftar panjang tetap lancar di HP menengah.

## Catatan
- Efek kaca di sini adalah pendekatan CSS (blur, saturasi, highlight). Pembiasan cahaya sungguhan seperti iOS 26 tidak tersedia di web.
- Dicoba di Chromium (layar 390 px, terang dan gelap) tanpa error. Belum dicoba di Safari iPhone; bila ada elemen yang terasa berat, kabari agar efeknya bisa dikurangi.

---
# Riwayat: v2.5 — Pajak Kendaraan, Pajak & Dokumen (PPh dll)

## Instalasi (urutan penting)
1. **Cadangkan dulu**: ⚙ → Backup JSON, dan salin Spreadsheet (File → Make a copy).
2. **Backend**: Apps Script → ganti seluruh isi `Code.gs` dengan isi `Code.txt` (TOKEN lama sudah ada di file; sesuaikan bila berbeda).
   Jalankan `authorize` sekali bila diminta izin ulang.
3. **Deploy**: Deploy → Manage deployments → pensil → Version **New version** → Deploy (URL tetap sama).
   Kolom baru `taxPreset`, `taxEvery`, `taxLast` ditambahkan otomatis ke sheet `Data`; data lama aman.
4. **Frontend**: timpa `index.html`, `sw.js`, `manifest.webmanifest`, dan folder `icons/` di GitHub Pages.
5. Buka aplikasi (HTTPS), ketuk **Perbarui sekarang** pada banner. Cek ⚙: versi **2.5.0**.

## Fitur baru
### Pajak kendaraan (di Rutinitas → Servis Kendaraan)
- Ubah kendaraan → isi **Pajak tahunan jatuh tempo**, **Ganti plat 5 tahunan**, dan estimasi nominal (tanggal ada di STNK).
- Kartu kendaraan menampilkan sisa waktu. Tombol **💳 Catat bayar pajak tahunan** memajukan jatuh tempo 1 tahun;
  **🪪 Catat ganti plat 5 th** memajukan 5 tahun dan menggeser pajak tahunan bila sudah dekat jatuh tempo (tidak dobel).
- Riwayat pajak muncul di tombol Riwayat.
- Google Calendar: event 🧾 pajak tahunan (alarm 2 minggu dan 1 hari sebelum) dan 🪪 ganti plat (4 minggu, 1 minggu, 1 hari), selain 🔧 servis.
- Perhatian merah muncul 30 hari (pajak) atau 60 hari (plat) sebelum jatuh tempo.

### Pajak & Dokumen (di Rutinitas, kartu baru)
- Preset: SPT Tahunan PPh OP (31 Maret), Bayar PPh bulanan (tanggal 15), PBB, Perpanjang SIM (60 bulan), Asuransi/BPJS, Lainnya.
  Preset mengisi judul, interval, tanggal berikutnya, dan alarm; semua bisa diubah. Teks bantuan pada preset PPh bersifat umum:
  pastikan sesuai ketentuan DJP dan jenis pajakmu.
- **Catat sudah dibayar / dilapor**: jatuh tempo otomatis maju sesuai interval (interval 0 = selesai). Riwayat tercatat.
- Ringkasan pajak kendaraan tampil di bagian yang sama. Muncul juga di tab **Hari ini** dan badge perhatian (14 hari sebelum jatuh tempo).
- Tidak muncul di tab Pengingat supaya tidak ganda.

## Catatan teknis
- Pajak disimpan sebagai pengingat berjenis `tax`; pajak kendaraan disimpan dalam data kendaraan. Backup JSON dan Restore tetap mencakup semuanya.
- `calId` kendaraan kini menyimpan JSON per jenis event; format lama terbaca otomatis.
- Pembayaran pajak kendaraan terlambat melebihi satu periode melompat ke jatuh tempo mendatang terdekat.

---
# Riwayat: v2.4 — Perbaikan Sinkron, Layar Hari Ini, Aksesibilitas

## Instalasi (urutan penting)
1. **Cadangkan dulu**: di aplikasi buka ⚙ → Backup JSON. Lalu di Google Drive buat salinan Spreadsheet (File → Make a copy).
2. **Backend**: buka Spreadsheet → Extensions → Apps Script. Ganti seluruh isi `Code.gs` dengan isi `Code.txt`
   (TOKEN lama kamu sudah ada di file ini; sesuaikan bila berbeda). Jalankan fungsi `authorize` sekali dan setujui izin.
3. **Deploy**: Deploy → Manage deployments → ikon pensil pada deployment Web App yang sama → Version: **New version** → Deploy.
   (Jangan buat deployment baru supaya URL tidak berubah.)
4. **Frontend**: unggah `index.html`, `sw.js`, `manifest.webmanifest`, dan folder `icons/` (berisi 3 PNG) ke GitHub Pages, timpa file lama.
5. **Buka aplikasi lewat HTTPS**, tunggu banner "Versi baru tersedia" lalu ketuk **Perbarui sekarang**.
   Bila banner tidak muncul: tutup aplikasi sepenuhnya dan buka lagi. Cek ⚙ → versi harus **2.4.0**.
6. Pasang ulang ikon di layar utama bila ingin memakai ikon maskable baru (opsional; Android memotong ikon sesuai bentuk tema).

## Perubahan
### Sistem
- **Antrean sinkron tidak lagi macet.** Operasi yang ditolak server (data tidak valid, sel terlalu besar) dicatat di `a.failed`,
  dilewati, dan antrean berlanjut. Error jaringan, token salah, atau backend lama tetap membuat antrean menunggu (data tidak hilang).
- **Dialog "Data belum sama".** Bila ada item lokal yang tidak ada di server, kamu memilih: *Gabungkan* (kirim ke server) atau
  *Pakai data server*. Sebelumnya sinkron terkunci permanen. Koneksi pertama ke backend kosong kini juga ditangani.
- **Throttle sinkron** 45 detik saat aplikasi dibuka kembali. Ketuk status sinkron di header untuk sinkron paksa.
- **Status sinkron berteks** di header: Tersinkron HH:MM / n perubahan menunggu / Menyinkronkan / Gagal.
- **Batas ukuran sel.** `history` dan `donorHistory` dipangkas otomatis (klien 50 entri; server menjaga di bawah 40.000 karakter).
- **Servis kendaraan kini membuat event Google Calendar** pada tanggal servis berikutnya (09:00; alarm 1 hari sebelum dan tepat waktu).
  Event dibuat ulang hanya bila tanggal atau judul berubah. Sheet `Vehicles` mendapat 2 kolom baru (`calId`, `calSig`) otomatis.
  Jadwal berbasis kilometer tetap berupa badge karena kilometer tidak terpantau otomatis.
- **Peringatan dalam aplikasi.** `localAlert` kini memunculkan toast saat aplikasi terbuka (notifikasi sistem hanya tambahan bila diizinkan).
  Notifikasi utama tetap dari Google Calendar.
- Versi aplikasi tampil dari satu konstanta (`APP_VERSION`); cache service worker `saysisten-v2.4.0`.

### Tampilan
- **Tab baru "Hari ini"** (default saat dibuka): Perlu perhatian, Hari ini, 7 hari ke depan, plus ringkasan Rutinitas.
- Tombol kecil (`.mini`) lebih besar (tinggi 34 px, teks 12 px). Warna teks sekunder lebih kontras. Mendukung `prefers-reduced-motion`.
- Ikon Rutinitas kini keranjang (sebelumnya sama dengan Tagihan). Navigasi 6 tab dirapatkan.
- Tombol **Back** Android menutup sheet, bukan menutup aplikasi.
- `prompt()` untuk tanggal donor dan tunda diganti dialog tanggal bawaan aplikasi.
- `aria-label` dan `aria-pressed` pada tombol centang dan tombol simpan ide.
- Ikon maskable terpisah, `id` pada manifest.

## Tidak diubah / batasan
- TOKEN tetap statis (keputusan pemilik). `confirm()` untuk hapus dan restore, serta `prompt()` odometer, masih memakai dialog bawaan.
- Konflik dari beberapa HP sekaligus tetap belum memakai revisi server; gunakan satu HP utama.
- Tidak ada Web Push saat aplikasi tertutup; andalkan Google Calendar.
- Event Calendar tagihan bulanan tetap berbunyi pada bulan yang sudah ditandai lunas (seri berulang).
