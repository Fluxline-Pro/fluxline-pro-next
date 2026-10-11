import { SERVICE_CATEGORIES } from './constants';

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
});
