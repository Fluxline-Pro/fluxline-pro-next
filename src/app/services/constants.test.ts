import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { SERVICE_CATEGORIES } from './constants';
import { SERVICE_SCROLL_MAPPING } from './scroll-mapping';
import { getScrollById } from './scrolls/scrollsData';

describe('service catalog', () => {
  const visibleServices = SERVICE_CATEGORIES.filter(
    (service) => service.id !== 'education-training'
  );

  it('contains the five current service offerings in their existing order', () => {
    expect(visibleServices.map((service) => service.title)).toEqual([
      'Brand & Experience Design',
      'Web Development & Digital Architecture',
      'Personal Training & Wellness',
      'Resonance Core Framework™',
      'Business Strategy & Systems Alignment',
    ]);
  });

  it('groups only Business Strategy & Systems Alignment under Strategy & Leadership', () => {
    expect(
      visibleServices
        .filter((service) => service.category === 'depth-strategy')
        .map((service) => service.title)
    ).toEqual(['Business Strategy & Systems Alignment']);
  });

  it('features the Identity in Motion white paper on the Resonance Core service', () => {
    const resonanceCore = SERVICE_CATEGORIES.find(
      (service) => service.id === 'resonance-core'
    );
    const programScroll = getScrollById(
      SERVICE_SCROLL_MAPPING['resonance-core']
    );

    expect(resonanceCore?.summary).toContain('Identity in Motion');
    expect(resonanceCore?.summary).toContain('$99, four-week guided program');
    expect(resonanceCore?.summary).toContain(
      'href="/scrolls/pdfs/Fluxline_RCF_4Week_Unblocking_Program_v3.pdf"'
    );
    expect(programScroll?.title).toBe(
      'Identity in Motion: A 4-Week Unblocking Program'
    );
    expect(
      existsSync(
        join(process.cwd(), 'public', programScroll?.pdfUrl.slice(1) ?? '')
      )
    ).toBe(true);
  });
});
