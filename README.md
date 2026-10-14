# SaySisten 2.2 – Belanja Bulanan

## Apa yang baru

Menu kelima **Rutinitas** berisi **Belanja Bulanan**. Semua menu lama (Ide, Pengingat termasuk Donor Darah, Tagihan, Tugas) tetap tersedia.

- **Daftar tetap**: catat barang rutin sekali; otomatis disalin untuk periode baru.
- **Barang tambahan**: barang yang hanya berlaku di satu bulan.
- **Checklist berbeda setiap bulan**: tidak menghapus atau mereset transaksi dari bulan sebelumnya.
- **Status Lewati bulan ini** dan **Belum terlaksana**.
- **Anggaran dan target tanggal** setiap bulan.
- **Estimasi** dan **harga aktual** (harga aktual kosong menggunakan estimasi *sementara*).
- **Selesai Belanja** untuk menyimpan sesi pembelian yang belum pernah dicatat sebelumnya.
- **Riwayat** periode dan sesi belanja.
- **Backup/Restore JSON** meliputi data belanja dan data lama.
- **Sinkronisasi belanja** ke tab Spreadsheet **Shopping** dengan `Code.gs` terbaru.

## Urutan update aman

1. Di aplikasi lama, buka Pengaturan → **Backup JSON**. Buat juga salinan Google Spreadsheet.
2. Di Apps Script yang terhubung dengan Google Sheet, ganti `Code.gs` dengan versi ini. **WAJIB mengganti `TOKEN = 'GANTI_DENGAN_TOKEN_LAMA_ANDA'` dengan token yang saat ini dipakai** (jangan taruh token di GitHub publik). Jalankan `authorize()` jika diperlukan, lalu **Deploy > Manage deployments > Edit > New version > Deploy**.
3. Pada GitHub Pages, upload/replace **`index.html`, `manifest.webmanifest`, `sw.js`, dan folder `icons`** dari paket ini pada folder yang sama seperti instalasi sebelumnya. **Jangan unggah `Code.gs` ke GitHub Pages**.
4. Buka aplikasi saat online. Gunakan Pengaturan → Cek pembaruan / Perbarui sekarang jika tersedia. Bila UI masih versi lama, refresh halaman setelah deployment selesai.
5. Masuk Rutinitas → Daftar tetap, tambah beberapa barang rutin. Buka periode belanja bulan ini dan checklist. Periode berikutnya dibuat dengan tombol **+ Periode baru** atau ketika bulan berganti dan menu dibuka.
6. Pastikan tab **Shopping** muncul di spreadsheet setelah menyimpan belanja. Sinkronisasi hanya berjalan jika backend terbaru telah di-deploy dan URL/token cocok.

## Cara memakai belanja

- **+ Barang** → nama, jumlah, kategori, harga estimasi, pilihan rutin. Edit kemudian untuk harga aktual, Lewati bulan ini, atau Belum terlaksana.
- **Daftar tetap** → menyunting barang yang akan muncul **pada periode yang baru dibuat**. Tidak mengubah riwayat yang sudah ada.
- **🎯 Anggaran & target** → tetapkan anggaran dan tanggal jatuh tempo perhatian.
- **✓ Selesai Belanja** → simpan satu sesi dari semua barang tercentang yang **belum tercatat dalam sesi sebelumnya**; tidak menghapus checklist.
- **📜 Riwayat** → melihat periode lama dan sesi yang sudah disimpan.
- **Pilih bulan** → membuka kembali bulan lalu tanpa reset. Periodenya dibuat otomatis apabila belum ada.

## Batasan

- Tidak menyediakan notifikasi push saat HP ditutup/terkunci; badge ada dalam aplikasi.
- Sinkronisasi menggunakan **last-write-wins per template/periode**. Jangan mengedit periode yang sama di dua HP secara bersamaan sampai tersedia resolusi konflik server yang lebih ketat.
- Backup harus dilakukan sebelum mengganti perangkat, menghapus instalasi/penyimpanan situs, atau update besar.
- Data riwayat sesi mempertahankan total saat sesi dicatat; daftar belanja periode masih bisa diedit. Harga aktual yang kosong dihitung dari estimasi sehingga bukan kepastian pengeluaran.
- Google Apps Script memiliki batas ukuran sel. Untuk periode sangat panjang, gunakan lebih banyak periode, bukan ribuan item dalam satu bulan.
- Validasi yang dilakukan: sintaks JavaScript dan struktur paket. Uji instalasi, sinkronisasi live, dan UI pada HP sebenarnya tetap perlu dilakukan.
