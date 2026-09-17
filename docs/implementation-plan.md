# Landing Page Indira Jaya Aspal

## Ringkasan

Membangun landing page satu halaman untuk **Indira Jaya Aspal** menggunakan Astro, tanpa CMS, backend, atau database. Fokusnya adalah interface modern, performa cepat, responsif, SEO, dan konversi menuju WhatsApp.

## Teknologi dan Struktur

- Astro dengan TypeScript dan static output.
- CSS biasa dengan design tokens; tanpa framework UI.
- JavaScript hanya untuk menu mobile dan interaksi ringan.
- Konten perusahaan dipusatkan di `src/data/site.ts` agar mudah diganti.
- Hasil produksi berada di `dist/` dan dapat diunggah ke static hosting atau cPanel.

## Desain dan Susunan Halaman

- Gaya industrial-modern dengan merah tua, charcoal, putih, dan abu-abu hangat.
- Wordmark Indira Jaya Aspal dengan simbol jalan sederhana.
- Mobile-first, ruang kosong cukup, elemen minimal, dan animasi ringan.
- Hero memakai foto proyek sebagai background dan placeholder video 16:10 yang siap diganti dengan video asli.
- Bagian halaman: navbar, hero dengan slot video, daftar layanan, spesifikasi pekerjaan, profil, alasan memilih, galeri proyek, area layanan/CTA, dan footer.
- Konten informatif disajikan sebagai paragraf editorial, bukan kumpulan card atau checklist.
- Floating WhatsApp mudah dijangkau tanpa menutupi konten.

## Konten, Interaksi, dan SEO

- Data terpusat meliputi nama perusahaan, nomor WhatsApp, alamat, area layanan, layanan, jam operasional, dan template pesan.
- Semua CTA memakai tautan `wa.me` dan membuka tab baru dengan aman.
- SEO mencakup metadata, canonical URL, Open Graph, sitemap, robots, heading yang benar, alt text, dan schema `LocalBusiness`.
- Gambar menggunakan optimasi Astro, ukuran responsif, serta lazy loading di luar hero.
- Foto AI ditandai sebagai ilustrasi selama masih menjadi template.

## Phase Execution

### Phase 1 — Fondasi

- Inisialisasi Astro dan konfigurasi static output.
- Membuat layout, data perusahaan, global styles, favicon, sitemap, dan robots.
- Menetapkan design tokens, tipografi, container, spacing, warna, dan breakpoint.

### Phase 2 — Interface Utama

- Membangun navbar, hero, layanan, tentang, galeri, area layanan, CTA, footer, dan floating WhatsApp.
- Membuat navigasi anchor, menu mobile, dan responsive layout.

### Phase 3 — Visual dan Konten Template

- Membuat logo SVG sederhana.
- Menghasilkan dan mengoptimalkan foto ilustrasi pengaspalan.
- Menulis copy Indonesia tanpa klaim bisnis yang belum terverifikasi.

### Phase 4 — Quality Check dan Build

- Memeriksa navigasi, CTA, keyboard focus, kontras, alt text, dan reduced motion.
- Menguji layout mobile, tablet, dan desktop.
- Menjalankan Astro check dan production build.
- Memvalidasi metadata, sitemap, robots, schema, dan output `dist/`.

## Acceptance Criteria

- Tampilan modern dan konsisten pada mobile maupun desktop.
- Seluruh bagian dapat dicapai melalui navbar.
- CTA WhatsApp memakai data dari satu konfigurasi.
- Tidak ada backend, CMS, form submission, atau dependency UI berlebihan.
- Gambar tidak menyebabkan layout shift dan production build berhasil.
- Structured data tidak memuat rating atau klaim fiktif.
- Konten placeholder dapat diganti tanpa mengubah struktur komponen.

## Asumsi

- Nomor WhatsApp, alamat, domain, area layanan, dan jam operasional memakai placeholder yang jelas hingga data asli tersedia.
- Bahasa halaman hanya Bahasa Indonesia.
- Website hanya memiliki landing page dan halaman 404.
- Foto AI adalah ilustrasi template, bukan dokumentasi proyek asli.
- Deployment ditargetkan untuk static hosting.
