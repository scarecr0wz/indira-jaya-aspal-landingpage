export const site = {
  name: 'Indira Jaya Aspal',
  shortName: 'IJA',
  title: 'Jasa Pengaspalan Jalan Profesional | Indira Jaya Aspal',
  description:
    'Layanan pengaspalan hotmix untuk jalan lingkungan, area usaha, halaman, dan perbaikan permukaan. Konsultasikan kebutuhan lokasi Anda bersama Indira Jaya Aspal.',
  phoneDisplay: '08xx-xxxx-xxxx',
  phoneInternational: '6280000000000',
  address: 'Alamat kantor akan diperbarui',
  serviceArea: 'Area layanan akan diperbarui',
  hours: 'Senin–Sabtu, 08.00–17.00',
  whatsappMessage:
    'Halo Indira Jaya Aspal, saya ingin berkonsultasi mengenai kebutuhan pengaspalan.',
  services: [
    {
      number: '01',
      title: 'Pengaspalan Hotmix',
      description: 'Pengerjaan lapisan aspal untuk jalan lingkungan, akses usaha, dan kawasan properti.',
    },
    {
      number: '02',
      title: 'Perbaikan Jalan',
      description: 'Penanganan permukaan rusak dan pelapisan ulang agar akses kembali nyaman digunakan.',
    },
    {
      number: '03',
      title: 'Pemadatan Lahan',
      description: 'Persiapan dan pemadatan permukaan sebagai fondasi pekerjaan yang lebih stabil.',
    },
    {
      number: '04',
      title: 'Area Parkir & Halaman',
      description: 'Pengaspalan area komersial, gudang, halaman, dan lahan parkir sesuai kebutuhan.',
    },
  ],
  specifications: [
    {
      title: 'Persiapan permukaan',
      description:
        'Kondisi area diperiksa sebelum pekerjaan dimulai. Pembersihan, perataan, dan pemadatan dilakukan menyesuaikan keadaan permukaan agar lapisan berikutnya memiliki dasar yang stabil.',
    },
    {
      title: 'Material dan ketebalan',
      description:
        'Jenis material serta ketebalan lapisan ditentukan berdasarkan fungsi area, kondisi tanah, dan intensitas kendaraan. Rekomendasi final diberikan setelah kebutuhan lokasi dipahami.',
    },
    {
      title: 'Penghamparan dan finishing',
      description:
        'Material dihamparkan secara merata, kemudian dipadatkan hingga menghasilkan permukaan yang rapi. Bagian tepi dan sambungan turut diperhatikan pada tahap penyelesaian.',
    },
  ],
  reasons: [
    {
      title: 'Perencanaan sesuai lokasi',
      description:
        'Setiap lokasi memiliki kondisi dan kebutuhan berbeda. Karena itu, pendekatan pekerjaan tidak disamaratakan dan dimulai dari pemahaman terhadap area yang akan dikerjakan.',
    },
    {
      title: 'Proses yang mudah dipahami',
      description:
        'Ruang lingkup, tahapan, dan kebutuhan pekerjaan dikomunikasikan secara jelas agar proses pengaspalan lebih terarah sejak awal hingga selesai.',
    },
    {
      title: 'Fokus pada hasil yang fungsional',
      description:
        'Pekerjaan diarahkan untuk menghasilkan permukaan yang rapi, nyaman digunakan, dan sesuai dengan fungsi jalan, halaman, maupun area usaha.',
    },
  ],
} as const;

export const whatsappUrl = `https://wa.me/${site.phoneInternational}?text=${encodeURIComponent(site.whatsappMessage)}`;
