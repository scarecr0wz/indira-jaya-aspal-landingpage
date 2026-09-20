import type { ImageMetadata } from 'astro';
import parkingImage from '../assets/images/project-parking.png';
import roadImage from '../assets/images/project-road.png';
import detailImage from '../assets/images/project-detail.png';

export interface ProjectGalleryItem {
  image: ImageMetadata;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  description: string;
  heroImage: ImageMetadata;
  gallery: ProjectGalleryItem[];
  usesPlaceholder: boolean;
}

const placeholderImages = [
  { image: roadImage, label: 'Proses pengerjaan' },
  { image: parkingImage, label: 'Area proyek' },
  { image: detailImage, label: 'Hasil pekerjaan' },
];

const projectImageModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/projects/**/*.{jpeg,jpg,png,webp,avif}',
  { eager: true },
);

const imagesForProject = (slug: string, title: string): ProjectGalleryItem[] => {
  const images = Object.entries(projectImageModules)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, 'id', { numeric: true }))
    .map(([, module], index) => ({
      image: module.default,
      alt: `Dokumentasi ${index + 1} proyek ${title}`,
      caption: `${title} — Dokumentasi ${index + 1}`,
    }));

  if (images.length > 0) return images;

  return placeholderImages.map((item) => ({
    image: item.image,
    alt: `${item.label} untuk proyek ${title}`,
    caption: `${item.label} — ${title}`,
  }));
};

const projectEntries = [
  { slug: 'kawasan-industri-ciputat-tangsel', title: 'Kawasan Industri Ciputat–Tangsel', location: 'Ciputat, Tangerang Selatan' },
  { slug: 'jalan-simatupang-pasar-minggu', title: 'Jalan Simatupang Pasar Minggu', location: 'Pasar Minggu, Jakarta Selatan' },
  { slug: 'jalan-proklamasi-sukmajaya-depok', title: 'Jalan Proklamasi Sukmajaya–Depok', location: 'Sukmajaya, Depok' },
  { slug: 'jalan-pu-drunten-wetan-indramayu', title: 'Jalan PU Drunten Wetan–Indramayu', location: 'Drunten Wetan, Indramayu' },
  { slug: 'jalan-area-benhil-jakpus', title: 'Jalan & Area Benhil–Jakpus', location: 'Bendungan Hilir, Jakarta Pusat' },
  { slug: 'sma-it-icm-gunung-geulis-bogor', title: 'SMA IT ICM Gn. Geulis–Bogor', location: 'Gunung Geulis, Bogor' },
  { slug: 'mall-cianjur', title: 'Mall Cianjur', location: 'Cianjur, Jawa Barat' },
  { slug: 'kemendikbud', title: 'Kemendikbud', location: 'Jakarta' },
] as const;

const projectImageFolders: Record<string, string> = {
  'jalan-pu-drunten-wetan-indramayu': 'jalan-PU-drunten-wetan-indramayu',
  'jalan-area-benhil-jakpus': 'jalan-dan-area-benhil-jakpus',
  'sma-it-icm-gunung-geulis-bogor': 'SMA-IT-ICM-gn.geulis-bogor',
};

export const projects: Project[] = projectEntries.map((project) => {
  const imageFolder = projectImageFolders[project.slug] ?? project.slug;
  const gallery = imagesForProject(imageFolder, project.title);
  const usesPlaceholder = !Object.keys(projectImageModules).some((path) =>
    path.includes(`/projects/${imageFolder}/`),
  );

  return {
    ...project,
    description: `Dokumentasi pekerjaan Indira Jaya Aspal di ${project.location}.`,
    heroImage: gallery[0]?.image ?? roadImage,
    gallery,
    usesPlaceholder,
  };
});
