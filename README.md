# SaySisten v2.3 — Belanja Bulanan + Servis Kendaraan

## Instalasi
1. Cadangkan data lewat menu Backup JSON dan salin Google Spreadsheet.
2. Di Apps Script (Spreadsheet terhubung), ganti Code.gs dengan file ini; pertahankan token rahasia lama. Jalankan `authorize()` dan deploy **New version** pada deployment Web App yang sama.
3. Unggah `index.html`, `sw.js`, `manifest.webmanifest`, dan folder `icons/` ke folder publikasi GitHub Pages.
4. Buka melalui HTTPS, tunggu pembaruan terdeteksi. Bila versi lama tertahan cache, tutup dan buka kembali aplikasi.
5. Masuk Rutinitas → Servis Kendaraan → + Kendaraan, lalu + Catat servis.

## Fitur
- Kendaraan motor atau mobil (lebih dari satu) dan nomor polisi opsional.
- Catat tanggal servis, odometer, bengkel, tindakan, dan biaya.
- Rekomendasi jadwal servis berikutnya berdasarkan interval hari/bulan **atau** batas odometer, mana yang tercapai dahulu. Jadwal diperkirakan dari data servis aktual terakhir.
- Update odometer manual, status Belum terlaksana, badge perhatian, daftar riwayat.
- Backup/restore JSON meliputi kendaraan. Cloud Apps Script menyimpan payload di sheet `Vehicles` terpisah.
- Semua fitur SaySisten v2.2 dan Belanja Bulanan dipertahankan.

## Batasan
- Notifikasi kendaraan adalah badge dalam aplikasi, bukan push saat aplikasi ditutup.
- Data kendaraan tersinkron saat online; konflik perubahan dari beberapa HP secara bersamaan belum menggunakan mekanisme server revision. Gunakan satu HP utama.
- Kilometer kendaraan tidak dapat terpantau otomatis dan harus dimasukkan manual.
- Jadwal servis harus mengacu rekomendasi pabrikan/buku servis.
- Penghapusan kendaraan dilakukan sebagai soft delete pada backend.
