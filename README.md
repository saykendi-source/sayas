# SaySisten v2.4 — Perbaikan Sinkron, Layar Hari Ini, Aksesibilitas

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
