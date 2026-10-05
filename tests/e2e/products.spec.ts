import { test, expect } from '@playwright/test';

test.describe('Products Listing & Details E2E Flow', () => {
  test('should display product listing with filters', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('h1')).toContainText('ALL PRODUCTS');

    // Filter controls
    await expect(page.locator('text=CATEGORIES')).toBeVisible();
    await expect(page.locator('text=AVAILABILITY')).toBeVisible();

    // Check product cards
    const productCards = page.locator('article');
    await expect(await productCards.count()).toBeGreaterThan(0);
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/products');
    const jacquardFilter = page.locator('button:has-text("Jacquard Shirts")').first();
    if (await jacquardFilter.isVisible()) {
      await jacquardFilter.click();
      await expect(page).toHaveURL(/category=jacquard-shirts/);
    }
  });

  test('should navigate to product details and select size', async ({ page }) => {
    await page.goto('/products');
    const firstProduct = page.locator('article h3 a').first();
    const productName = await firstProduct.innerText();
    await firstProduct.click();

    // Check PDP elements
    await expect(page.locator('h1')).toContainText(productName);
    await expect(page.locator('text=৳')).toBeVisible();
    await expect(page.locator('text=SELECT SIZE')).toBeVisible();

    // Size selector: clicking size should activate it
    const sizeButton = page.locator('button:has-text("M")').first();
    if (await sizeButton.isEnabled()) {
      await sizeButton.click();
      await expect(sizeButton).toHaveClass(/border-white|bg-white/);
    }

    // Add to Bag should be enabled once size is selected
    const addToBag = page.locator('button:has-text("ADD TO BAG")');
    await expect(addToBag).toBeEnabled();
  });

  test('should disable adding to bag if required size is not selected', async ({ page }) => {
    // Open product page directly
    await page.goto('/products/retro-art-cuban-collar-shirt');
    const addToBag = page.locator('button:has-text("ADD TO BAG")');
    await addToBag.click();

    // Should display warning notification or prompt to select size
    await expect(page.locator('text=Please select a size')).toBeVisible();
  });
});
