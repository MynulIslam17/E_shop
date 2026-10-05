import { test, expect } from '@playwright/test';

test.describe('Checkout E2E Flow', () => {
  test('should validate required delivery fields with Zod', async ({ page }) => {
    // Add item first
    await page.goto('/products/retro-art-cuban-collar-shirt');
    await page.locator('button:has-text("M")').first().click();
    await page.locator('button:has-text("ADD TO BAG")').click();

    // Click Proceed to Checkout
    await page.locator('a:has-text("PROCEED TO CHECKOUT")').click();
    await expect(page).toHaveURL(/\/checkout/);

    // Try submitting without filling required fields
    const placeOrderBtn = page.locator('button:has-text("PLACE ORDER")');
    await placeOrderBtn.click();

    // Verify validation errors appear
    await expect(page.locator('text=Full name is required')).toBeVisible();
    await expect(page.locator('text=Invalid Bangladeshi mobile number')).toBeVisible();
    await expect(page.locator('text=Street address is required')).toBeVisible();
  });

  test('should apply coupon and recalculate total', async ({ page }) => {
    await page.goto('/products/retro-art-cuban-collar-shirt');
    await page.locator('button:has-text("M")').first().click();
    await page.locator('button:has-text("ADD TO BAG")').click();
    await page.locator('a:has-text("PROCEED TO CHECKOUT")').click();

    // Apply Coupon HEEMS10
    const couponInput = page.locator('input[placeholder*="Coupon"]');
    await couponInput.fill('HEEMS10');
    await page.locator('button:has-text("APPLY")').click();

    // Verify feedback
    await expect(page.locator('text=Coupon applied')).toBeVisible();
    await expect(page.locator('text=DISCOUNT')).toBeVisible();
  });

  test('should complete guest checkout order and navigate to success', async ({ page }) => {
    await page.goto('/products/retro-art-cuban-collar-shirt');
    await page.locator('button:has-text("M")').first().click();
    await page.locator('button:has-text("ADD TO BAG")').click();
    await page.locator('a:has-text("PROCEED TO CHECKOUT")').click();

    // Fill valid form
    await page.locator('input[name="fullName"]').fill('Ahmed Rayhan');
    await page.locator('input[name="phone"]').fill('01712345678');
    await page.locator('input[name="address"]').fill('House 42, Road 11, Banani');
    await page.locator('select[name="district"]').selectOption('Dhaka');
    await page.locator('input[name="thana"]').fill('Banani');

    // Select Cash on Delivery
    await page.locator('label:has-text("Cash on Delivery")').click();

    // Submit Order
    await page.locator('button:has-text("PLACE ORDER")').click();

    // Verify redirected to /checkout/success
    await expect(page).toHaveURL(/\/checkout\/success/);
    await expect(page.locator('text=ORDER CONFIRMED')).toBeVisible();
    await expect(page.locator('text=ECOM-')).toBeVisible();
  });
});
