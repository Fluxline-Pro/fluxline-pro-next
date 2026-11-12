import { getStorefrontUrl } from './config';

describe('getStorefrontUrl', () => {
  const original = process.env.NEXT_PUBLIC_STORE_URL;

  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_STORE_URL;
    else process.env.NEXT_PUBLIC_STORE_URL = original;
  });

  it('defaults to the production store with no trailing slash', () => {
    delete process.env.NEXT_PUBLIC_STORE_URL;
    expect(getStorefrontUrl()).toBe('https://store.fluxline.pro');
  });

  it('follows NEXT_PUBLIC_STORE_URL so test builds link to the test store', () => {
    process.env.NEXT_PUBLIC_STORE_URL = 'https://store-test.example.com/';
    expect(getStorefrontUrl()).toBe('https://store-test.example.com');
  });
});
