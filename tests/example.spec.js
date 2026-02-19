import { test, expect } from '@playwright/test';

test.describe('Weather App E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  // 1️⃣ Valid City Test
  test('should display weather for a valid city', async ({ page }) => {

    await page.fill('input', 'Jaipur');
    await page.click('button');

    await expect(page.locator('text=Jaipur')).toBeVisible();
  });

  // 2️⃣ Invalid City Test
  test('should show error for invalid city', async ({ page }) => {

    await page.fill('input', 'InvalidCity123');
    await page.click('button');

    await expect(page.locator('text=City not found')).toBeVisible();
  });

  // 3️⃣ Empty Input Test
  test('should not allow empty search', async ({ page }) => {

    await page.click('button');

    await expect(page.locator('text=Please enter a city')).toBeVisible();
  });

  // 4️⃣ API Call Status Check
  test('should successfully call weather API', async ({ page }) => {

    const responsePromise = page.waitForResponse(
      response => response.url().includes('weather') && response.status() === 200
    );

    await page.fill('input', 'Delhi');
    await page.click('button');

    await responsePromise;
  });

});
