import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render announcement bar with live countdown', async ({ page }) => {
    const announcement = page.locator('text=STOCK CLEARANCE SALE');
    await expect(announcement).toBeVisible();

    // Verify countdown timer units are rendered
    await expect(page.locator('text=Days')).toBeVisible();
    await expect(page.locator('text=Hrs')).toBeVisible();
    await expect(page.locator('text=Min')).toBeVisible();
  });

  test('should display promotional marquee', async ({ page }) => {
    await expect(page.locator('text=NEW ARRIVALS')).toBeVisible();
    await expect(page.locator('text=FREE SHIPPING OVER')).toBeVisible();
  });

  test('should render hero section with brand typography', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('MENSWEAR');
    const ctaButton = page.locator('a:has-text("EXPLORE DROP")');
    await expect(ctaButton).toBeVisible();
  });

  test('should render best seller section and collection switcher', async ({ page }) => {
    await expect(page.locator('text=BEST SELLER')).toBeVisible();
    await expect(page.locator('text=NEW ARRIVALS')).toBeVisible();
  });

  test('should allow opening search drawer', async ({ page }) => {
    const searchButton = page.locator('button[aria-label="Search"]').first();
    await searchButton.click();
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('should allow opening cart drawer', async ({ page }) => {
    const cartButton = page.locator('button[aria-label="Shopping Cart"]').first();
    await cartButton.click();
    await expect(page.locator('text=Your Cart')).toBeVisible();
  });
});
