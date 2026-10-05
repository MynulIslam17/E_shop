import { test, expect } from '@playwright/test';

test.describe('Shopping Cart E2E Flow', () => {
  test('should show empty cart state when no items are added', async ({ page }) => {
    await page.goto('/');
    const cartButton = page.locator('button[aria-label="Shopping Cart"]').first();
    await cartButton.click();

    await expect(page.locator('text=Your Bag is Empty')).toBeVisible();
    await expect(page.locator('a:has-text("EXPLORE PRODUCTS")')).toBeVisible();
  });

  test('should add product to cart and adjust quantity', async ({ page }) => {
    await page.goto('/products/retro-art-cuban-collar-shirt');
    
    // Select size M
    const sizeM = page.locator('button:has-text("M")').first();
    await sizeM.click();

    // Click Add to Bag
    const addToBag = page.locator('button:has-text("ADD TO BAG")');
    await addToBag.click();

    // Verify Cart Drawer opens automatically
    await expect(page.locator('text=YOUR BAG')).toBeVisible();
    await expect(page.locator('text=Retro Art Cuban Collar Shirt')).toBeVisible();
    await expect(page.locator('text=Size: M')).toBeVisible();

    // Increment quantity
    const plusButton = page.locator('button[aria-label="Increase quantity"]').first();
    await plusButton.click();

    // Subtotal should update
    await expect(page.locator('text=SUBTOTAL')).toBeVisible();

    // Free shipping threshold indicator should be present
    await expect(page.locator('text=Free Express Delivery')).toBeVisible();
  });

  test('should persist cart items across page refreshes', async ({ page }) => {
    await page.goto('/products/retro-art-cuban-collar-shirt');
    await page.locator('button:has-text("M")').first().click();
    await page.locator('button:has-text("ADD TO BAG")').click();

    // Refresh page
    await page.reload();

    // Verify cart count badge
    const cartBadge = page.locator('button[aria-label="Shopping Cart"] span');
    await expect(cartBadge).toHaveText('1');
  });
});
