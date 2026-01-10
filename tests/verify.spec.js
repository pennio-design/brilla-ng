
const { test, expect } = require('@playwright/test');

test('homepage has a new instagram section', async ({ page }) => {
  await page.goto('http://localhost:8000');

  const instagramSection = await page.locator('#instagram-reels');
  await instagramSection.scrollIntoViewIfNeeded();

  // Wait for the first Instagram embed to load
  await page.waitForSelector('#instagram-reels iframe', { timeout: 60000 });

  await page.screenshot({ path: 'test-results/screenshot.png' });
});
