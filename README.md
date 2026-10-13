# Asisten Saya 2.1 — paket GitHub Pages / PWA

## Unggah ke GitHub Pages
Unggah **semua** file/folder ini ke root repository yang sudah dikonfigurasi untuk GitHub Pages:

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `icons/icon-192.png`
- `icons/icon-512.png`

Commit perubahan. Pastikan akses `https://USERNAME.github.io/REPO/` menampilkan aplikasi, manifest dan SW tanpa 404. Semua path relatif sehingga juga berlaku untuk `https://USERNAME.github.io/`.

## Instal di HP
Android: buka URL **HTTPS** via Chrome (bukan preview GitHub/file lokal/in-app browser); interaksikan halaman dan lihat menu ⋮ → **Instal aplikasi** / **Tambahkan ke layar utama**. Chrome dapat tidak menampilkan promosi otomatis jika syarat atau heuristik belum terpenuhi, atau aplikasi sudah terpasang. Pemeriksaan: Chrome DevTools → Application → Manifest dan Service Workers; pastikan ada ikon 192 dan 512, manifest valid, serta SW aktif. Safari iPhone: Bagikan → Tambahkan ke Layar Utama.

## Cara update setelah terpasang
Commit pembaruan GitHub Pages. Saat versi SW berubah, buka aplikasi saat tersambung internet, kemudian pilih tombol **Perbarui sekarang** jika banner tampil atau klik ⚙ → **Cek pembaruan**. Jika mengubah file di pembaruan berikutnya, **ubah konstanta CACHE di sw.js** (misal menjadi `asisten-saya-v2.0.1`) serta nomor versi di HTML. Tanpa mengganti nama cache, SW tetap dapat mengenali perubahan berkas sw.js, tetapi versi eksplisit membantu memastikan migrasi cache. Beberapa ponsel baru mengambil update setelah aplikasi ditutup/dibuka.

## Fitur baru
- Status Belum terlaksana kini tetap disimpan setelah restart, termasuk penandaan tagihan per bulan.
- Badge perhatian, donor darah (hari/bulan, lokasi, nomor berikutnya).
- **Tunda** item sampai tanggal pilihan, tanpa mengubah tanggal agenda aslinya.
- Riwayat catatan donor dan aksi baru (aksi sebelum upgrade tidak selalu ada dalam riwayat).
- **Backup** JSON lokal (tanpa token), **Restore** mengganti data lokal setelah konfirmasi.
- Total tagihan bulan berjalan dihitung terpisah dari indikator tunggakan tertua.
- Pemeriksaan update SW dan cache offline untuk berkas aplikasi.
- Permintaan izin notifikasi browser dan pengecekan waktu jatuh tempo **hanya ketika aplikasi terbuka**. Jika ingin notifikasi terjadwal saat aplikasi tertutup, diperlukan layanan push terpisah (misal Apps Script dengan Calendar reminders, atau server Web Push dengan VAPID + scheduler + endpoint subscriptions). Kode ini **belum** mengimplementasikan push background otomatis.

## Data & sinkronisasi
- LocalStorage browser menyimpan data lokal; memperbarui berkas PWA pada **URL/origin yang sama** pada umumnya tidak menghapusnya. Menghapus data situs, mengganti domain, pindah HP, atau instal ulang tertentu dapat menghilangkan data. **Backup sebelum upgrade atau migrasi**.
- `URL Apps Script` dan token tetap dapat diisi. `Code.gs` kini disertakan dan menyimpan field donor, riwayat, status serta penundaan. Setelah menempel kode backend, deploy ulang sebagai versi Web App baru. Periksa data dan backup sebelum migrasi. Menyimpan konfigurasi backend baru **tidak lagi melakukan pull agresif**. Sinkronisasi multi-perangkat secara bersamaan dan penyelesaian konflik belum dijamin aman; hindari penggunaan dua perangkat aktif tanpa backend yang menangani revisi & konflik.
- Restore lokal tidak otomatis menghapus item yang sudah terhapus di cloud. Lakukan verifikasi sebelum menyinkronkan backup dengan cloud.

## Catatan keterbatasan
- Notifikasi browser tidak sama dengan push ketika aplikasi tertutup.
- Tunggakan historis ditampilkan melalui periode tertua yang belum lunas; rekap bulanan tetap berdasar bulan berjalan. Untuk pembayaran *bulan berjalan* sementara tunggakan lama masih ada, lunasi tunggakan terdahulu atau gunakan pengelolaan data periode melalui pengembangan backend lebih lanjut.
- Ini tidak menggantikan pemeriksaan kelayakan medis donor darah.


## Migrasi Code.gs lama ke backend v2.1
1. Buat cadangan Google Sheet dan Backup JSON dari aplikasi dahulu.
2. Buka spreadsheet yang digunakan backend lama → Extensions → Apps Script.
3. Ganti kode lama dengan `Code.gs` di paket ini (jangan hapus spreadsheet `Data`).
4. Set `TOKEN` ke token lama agar konfigurasi aplikasi tetap bisa dipakai, atau ganti kedua sisi secara bersamaan. Untuk jangka panjang gunakan token acak kuat dan jangan sebarkan.
5. Atur zona waktu script pada Project Settings sesuai zona waktu agenda (contoh `Asia/Jakarta`).
6. Jalankan `authorize()` dari editor untuk memberi otorisasi Sheet dan Calendar; ini juga menambahkan kolom baru tanpa menghapus kolom lama.
7. Deploy → Manage deployments → Edit → Version: New version → Deploy. Jika menggunakan deployment yang sama, URL `/exec` biasanya tetap.
8. Pada aplikasi, buka Pengaturan, periksa sambungan dan lakukan tes menambah satu pengingat donor lalu lihat kolom baru di Sheet dan event di Calendar.

**Keterbatasan:** satu Calendar event berulang untuk tagihan/pengingat tidak secara otomatis menandai pembayaran per bulan pada Calendar. Perubahan status di satu perangkat yang dibuat serentak dengan perubahan di perangkat lain masih dapat bertabrakan, karena backend belum memakai revision/compare-and-swap. Gunakan satu HP utama. Backup JSON direkomendasikan sebelum perubahan besar. Notifikasi terjadwal saat browser sepenuhnya tertutup mengandalkan notifikasi Google Calendar, bukan Web Push dari PWA.
