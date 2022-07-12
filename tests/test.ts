import { expect, test } from '@playwright/test';

test('All of the pages are available', async ({ page }) => {
	await page.goto('/');
	await page.goto('/hot');
	await page.goto('/filter');
});
