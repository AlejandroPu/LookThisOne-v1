/**
 * Seed demo profiles for the public Catalog.
 *
 * Usage:
 *   npm run seed:demo
 *
 * The script is idempotent: it upserts by email, so running it again after
 * changes to the DEMO_PROFILES array will update existing rows rather than
 * creating duplicates.
 *
 * All rows are tagged with is_demo=true so they can be cleanly removed when
 * real user profiles fill the catalog in v2.
 *
 * Avatars are served from public/avatars/. Each profile declares its own
 * filename in the `avatar` field — explicit mapping, safe to reorder.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function demoEmail(slug: string) {
  return `demo+${slug}@lookthis.one`;
}

const DEMO_PROFILES = [
  {
    username: 'ana.creates',
    avatar: '01.png',
    title: 'Ana García',
    bio: 'Creadora de contenido ✨ · Madrid',
    links: [
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'TikTok', url: 'https://tiktok.com' },
      { title: 'Newsletter', url: 'https://substack.com' },
    ],
  },
  {
    username: 'marcos.dev',
    avatar: '02.png',
    title: 'Marcos López',
    bio: 'Desarrollador full-stack · freelance',
    links: [
      { title: 'GitHub', url: 'https://github.com' },
      { title: 'Portfolio', url: 'https://example.com' },
      { title: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  },
  {
    username: 'laurafit',
    avatar: '03.png',
    title: 'Laura Fitness',
    bio: 'Entrenadora personal 💪 · online',
    links: [
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'Programa de entrenamiento', url: 'https://example.com' },
      { title: 'YouTube', url: 'https://youtube.com' },
    ],
  },
  {
    username: 'djnova',
    avatar: '04.png',
    title: 'DJ Nova',
    bio: 'Música electrónica 🎶 · Ibiza',
    links: [
      { title: 'SoundCloud', url: 'https://soundcloud.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'Booking', url: 'https://example.com' },
      { title: 'Spotify', url: 'https://spotify.com' },
    ],
  },
  {
    username: 'foto.mx',
    avatar: '05.png',
    title: 'Carlos Foto',
    bio: 'Fotógrafo profesional 📷 · México',
    links: [
      { title: 'Portfolio', url: 'https://example.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'Contrataciones', url: 'https://example.com' },
    ],
  },
  {
    username: 'chef.ramon',
    avatar: '06.png',
    title: 'Ramón Cocina',
    bio: 'Chef y foodie 🍳 · Barcelona',
    links: [
      { title: 'Recetas', url: 'https://example.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'Reservas', url: 'https://example.com' },
    ],
  },
  {
    username: 'mia.designs',
    avatar: '07.png',
    title: 'Mía Rodríguez',
    bio: 'Diseñadora gráfica 🎨 · remota',
    links: [
      { title: 'Behance', url: 'https://behance.net' },
      { title: 'Dribbble', url: 'https://dribbble.com' },
      { title: 'Contratar', url: 'https://example.com' },
    ],
  },
  {
    username: 'viajes.carlos',
    avatar: '08.png',
    title: 'Carlos Viaja',
    bio: 'Nómada digital ✈️ · en movimiento',
    links: [
      { title: 'Blog', url: 'https://example.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'Guías de viaje', url: 'https://example.com' },
    ],
  },
  {
    username: 'yoga.sofia',
    avatar: '09.png',
    title: 'Sofía Yoga',
    bio: 'Bienestar y meditación 🧘 · online',
    links: [
      { title: 'Clases online', url: 'https://example.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'Podcast', url: 'https://example.com' },
    ],
  },
  {
    username: 'el_poeta',
    avatar: '10.png',
    title: 'Juan Poemas',
    bio: 'Escritor y poeta 📖 · Buenos Aires',
    links: [
      { title: 'Blog', url: 'https://example.com' },
      { title: 'Libro', url: 'https://example.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
    ],
  },
  {
    username: 'startup.alba',
    avatar: '11.png',
    title: 'Alba Emprende',
    bio: 'Fundadora de startups 🚀 · Madrid',
    links: [
      { title: 'LinkedIn', url: 'https://linkedin.com' },
      { title: 'Newsletter', url: 'https://substack.com' },
      { title: 'Asesoría', url: 'https://example.com' },
      { title: 'Podcast', url: 'https://example.com' },
    ],
  },
  {
    username: 'gamer.leo',
    avatar: '12.png',
    title: 'Leo Games',
    bio: 'Streamer y gamer 🎮 · online',
    links: [
      { title: 'Twitch', url: 'https://twitch.tv' },
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'Discord', url: 'https://discord.com' },
      { title: 'Merch', url: 'https://example.com' },
    ],
  },
  {
    username: 'podcast.elena',
    avatar: '13.png',
    title: 'Elena Ondas',
    bio: 'Podcaster · tecnología y cultura 🎙️',
    links: [
      { title: 'Spotify', url: 'https://spotify.com' },
      { title: 'Apple Podcasts', url: 'https://podcasts.apple.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
    ],
  },
  {
    username: 'arte.miguel',
    avatar: '14.png',
    title: 'Miguel Arte',
    bio: 'Artista visual y muralista 🖌️ · Valencia',
    links: [
      { title: 'Galería', url: 'https://example.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'Prints', url: 'https://example.com' },
      { title: 'Comisiones', url: 'https://example.com' },
    ],
  },
  {
    username: 'finance.cris',
    avatar: '15.png',
    title: 'Cristina Finanzas',
    bio: 'Educación financiera 💰 · online',
    links: [
      { title: 'Curso', url: 'https://example.com' },
      { title: 'Newsletter', url: 'https://substack.com' },
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'TikTok', url: 'https://tiktok.com' },
    ],
  },
];

async function nextAcquisitionNumber(
  tx: Omit<
    PrismaClient,
    '$transaction' | '$connect' | '$disconnect' | '$on' | '$use' | '$extends'
  >,
): Promise<number> {
  const [row] = await tx.$queryRaw<{ next: bigint }[]>`
    SELECT nextval('acquisition_number_seq') AS next
  `;
  return Number(row.next);
}

async function main() {
  console.log(`Seeding ${DEMO_PROFILES.length} demo profiles…`);

  for (const profile of DEMO_PROFILES) {
    const email = demoEmail(profile.username);
    const avatarUrl = `/avatars/${profile.avatar}`;

    await prisma.$transaction(async (tx) => {
      // Upsert user (no auth.users row — demo accounts can't log in)
      const user = await tx.user.upsert({
        where: { email },
        create: {
          id: crypto.randomUUID(),
          email,
        },
        update: {},
      });

      // Upsert workspace
      const workspaceSlug = profile.username;
      let workspace = await tx.workspace.findUnique({
        where: { slug: workspaceSlug },
      });
      if (!workspace) {
        workspace = await tx.workspace.create({
          data: {
            slug: workspaceSlug,
            name: profile.title,
          },
        });
        await tx.workspaceMember.create({
          data: { workspaceId: workspace.id, userId: user.id },
        });
      }

      // Upsert page
      const existingPage = await tx.page.findUnique({
        where: { username: profile.username },
      });

      let pageId: string;
      if (existingPage) {
        await tx.page.update({
          where: { id: existingPage.id },
          data: {
            title: profile.title,
            bio: profile.bio,
            avatarUrl,
            isDemo: true,
          },
        });
        pageId = existingPage.id;
        console.log(`  updated  ${profile.username}`);
      } else {
        const acquisitionNumber = await nextAcquisitionNumber(tx);
        const page = await tx.page.create({
          data: {
            workspaceId: workspace.id,
            username: profile.username,
            title: profile.title,
            bio: profile.bio,
            avatarUrl,
            published: true,
            acquisitionNumber,
            isDemo: true,
          },
        });
        pageId = page.id;
        console.log(`  created  ${profile.username}  (#${acquisitionNumber})`);
      }

      // Replace links on every run (keeps them in sync with DEMO_PROFILES)
      await tx.link.deleteMany({ where: { pageId } });
      await tx.link.createMany({
        data: profile.links.map((l, i) => ({
          pageId,
          title: l.title,
          url: l.url,
          position: i,
          enabled: true,
        })),
      });
    });
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
