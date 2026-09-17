# Indira Jaya Aspal Landing Page

Landing page statis untuk profil jasa pengaspalan Indira Jaya Aspal. Dibangun dengan Astro dan dirancang responsif, ringan, serta SEO-friendly.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Untuk mengakses development server dari perangkat lain dalam jaringan yang sama:

```bash
npm run dev -- --host 0.0.0.0
```

## Production build

```bash
npm run build
npm run preview
```

Hasil build tersedia di folder `dist/`.

## Konfigurasi konten

Identitas perusahaan, nomor WhatsApp, area layanan, dan konten utama dapat diperbarui melalui `src/data/site.ts`.

Set `SITE_URL` saat build menggunakan domain production agar canonical URL dan sitemap menggunakan alamat yang benar.

## Dokumentasi

- Rencana implementasi: `docs/implementation-plan.md`
- Screenshot preview: `docs/previews/`
