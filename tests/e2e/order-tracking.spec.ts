import { test, expect } from '@playwright/test';

test.describe('Order Tracking E2E Flow', () => {
  test('should display order tracking search input', async ({ page }) => {
    await page.goto('/checkout/track');
    await expect(page.locator('h1')).toContainText('TRACK YOUR ORDER');
    await expect(page.locator('input[placeholder*="ECOM-"]')).toBeVisible();
    await expect(page.locator('button:has-text("TRACK ORDER")')).toBeVisible();
  });

  test('should search mock order and display timeline', async ({ page }) => {
    await page.goto('/checkout/track');
    const orderInput = page.locator('input[placeholder*="ECOM-"]');
    await orderInput.fill('ECOM-20261004-9842');
    await page.locator('button:has-text("TRACK ORDER")').click();

    // Verify timeline steps
    await expect(page.locator('text=ORDER STATUS')).toBeVisible();
    await expect(page.locator('text=Order Placed')).toBeVisible();
    await expect(page.locator('text=Processing')).toBeVisible();
  });

  test('should display error message when order is not found', async ({ page }) => {
    await page.goto('/checkout/track');
    const orderInput = page.locator('input[placeholder*="ECOM-"]');
    await orderInput.fill('ECOM-00000000-0000');
    await page.locator('button:has-text("TRACK ORDER")').click();

    await expect(page.locator('text=No order found with tracking number')).toBeVisible();
  });
});
