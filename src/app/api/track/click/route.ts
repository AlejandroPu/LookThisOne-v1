import { after } from 'next/server';
import type { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { hasConsent } from '@/lib/consent/cookie';

export async function POST(request: NextRequest) {
  let linkId: string;
  try {
    const data = await request.formData();
    const raw = data.get('linkId');
    if (!raw || typeof raw !== 'string')
      return new Response(null, { status: 204 });
    linkId = raw;
  } catch {
    return new Response(null, { status: 204 });
  }

  after(async () => {
    if (!(await hasConsent())) return;

    const link = await prisma.link.findFirst({
      where: { id: linkId, enabled: true, page: { published: true } },
      select: { pageId: true },
    });

    if (!link) return;

    await prisma.analyticsEvent
      .create({
        data: {
          pageId: link.pageId,
          linkId,
          type: 'click',
          userAgent: request.headers.get('user-agent'),
          referrer: request.headers.get('referer'),
        },
      })
      .catch(() => {});
  });

  return new Response(null, { status: 204 });
}
