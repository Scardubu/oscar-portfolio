import { test, expect } from '@playwright/test';

test.describe('User Journey - Recruiter Flow', () => {
  test('should navigate from hero to projects to contact', async ({ page }) => {
    await page.goto('/');

    // Hero section should be visible
    await expect(page.getByRole('heading', { name: /Oscar Ndugbu/i })).toBeVisible();
    await expect(page.getByText(/Full-Stack Machine Learning Engineer/i)).toBeVisible();

    // Metrics should be visible
    await expect(page.getByText(/8,300/i)).toBeVisible();
    await expect(page.getByText(/73.7%/i)).toBeVisible();

    // Click "View My Work" CTA
    await page.getByRole('button', { name: /View My Work/i }).click();

    // Should scroll to projects section
    await expect(page.locator('#projects')).toBeInViewport();
    await expect(page.getByRole('heading', { name: /Featured Projects/i })).toBeVisible();

    // SabiScore project should be visible
    await expect(page.getByText(/SabiScore/i)).toBeVisible();
    await expect(page.getByText(/8,300\+ users/i)).toBeVisible();

    // Click "Let's Talk" CTA
    await page.getByRole('link', { name: /Let's Talk/i }).first().click();

    // Should scroll to contact section
    await expect(page.locator('#contact')).toBeInViewport();
    await expect(page.getByRole('heading', { name: /Collaborate/i })).toBeVisible();
  });

  test('should display all project cards with metrics', async ({ page }) => {
    await page.goto('/');

    // Navigate to projects
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Check SabiScore project
    const sabiScore = page.locator('text=SabiScore').first();
    await expect(sabiScore).toBeVisible();
    await expect(page.getByText(/73.7%/i).first()).toBeVisible();

    // Check Hashablanca project
    const hashablanca = page.locator('text=Hashablanca').first();
    await expect(hashablanca).toBeVisible();

    // Check AI Consulting project
    const aiConsulting = page.locator('text=AI Consulting').first();
    await expect(aiConsulting).toBeVisible();
  });

  test('should expand and interact with SabiScore demo', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Find and click "View Interactive Demo" button for SabiScore
    const demoButton = page.getByRole('button', { name: /View Interactive Demo/i }).first();
    await demoButton.click();

    // Demo should be visible
    await expect(page.getByText(/Prediction Accuracy Over Time/i)).toBeVisible();
    await expect(page.getByText(/Recent Predictions/i)).toBeVisible();

    // Expand "How It Works" accordion
    const accordionButton = page.getByRole('button', { name: /How It Works/i });
    await accordionButton.click();

    // Accordion content should be visible
    await expect(page.getByText(/Model Architecture/i)).toBeVisible();
    await expect(page.getByText(/Feature Engineering/i)).toBeVisible();
  });

  test('should navigate through skills section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#skills').scrollIntoViewIfNeeded();

    // Skills section header should be visible
    await expect(page.getByRole('heading', { name: /Technical Expertise/i })).toBeVisible();

    // Category filters should be visible
    await expect(page.getByText(/All/i)).toBeVisible();
    await expect(page.getByText(/ML & AI/i)).toBeVisible();

    // Certifications should be visible
    await expect(page.getByText(/Certifications & Training/i)).toBeVisible();
  });

  test('should display performance dashboard metrics', async ({ page }) => {
    await page.goto('/');

    // Scroll to performance dashboard
    const dashboard = page.locator('text=Portfolio Performance').first();
    await dashboard.scrollIntoViewIfNeeded();

    // Check for uptime metric
    await expect(page.getByText(/99.94%/i)).toBeVisible();

    // Check for Core Web Vitals
    await expect(page.getByText(/FCP/i)).toBeVisible();
    await expect(page.getByText(/LCP/i)).toBeVisible();

    // Check for traffic metrics
    await expect(page.getByText(/monthly visitors/i)).toBeVisible();
  });

  test('should validate contact form fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Try to submit empty form
    await page.getByRole('button', { name: /Send message/i }).click();

    // Form should show validation errors (HTML5 validation will prevent submission)
    const nameInput = page.getByLabel(/Name/i);
    await expect(nameInput).toBeVisible();

    // Fill out form with valid data
    await nameInput.fill('Test User');
    await page.getByLabel(/Email/i).fill('test@example.com');
    await page.getByLabel(/Inquiry type/i).selectOption('job');
    await page.getByLabel(/How can Oscar help/i).fill('I am interested in discussing ML engineering opportunities.');

    // Submit button should be enabled
    const submitButton = page.getByRole('button', { name: /Send message/i });
    await expect(submitButton).toBeEnabled();
  });

  test('should have accessible navigation and keyboard support', async ({ page }) => {
    await page.goto('/');

    // Tab through hero CTAs
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Test smooth scroll with keyboard
    await page.keyboard.press('Enter');

    // Should navigate to projects
    await expect(page.locator('#projects')).toBeInViewport({ timeout: 2000 });
  });

  test('should display footer with social links', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer content
    await expect(page.getByText(/Oscar Ndugbu/i).last()).toBeVisible();
    await expect(page.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Email/i })).toBeVisible();

    // Check performance targets text
    await expect(page.getByText(/<150ms FCP/i)).toBeVisible();
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check h1 exists and is unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check h2 headings for sections
    await expect(page.getByRole('heading', { level: 2, name: /Featured Projects/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /Technical Expertise/i })).toBeVisible();
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have aria labels for sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[aria-label="Hero section"]')).toBeVisible();
    await expect(page.locator('[aria-label="Projects showcase"]')).toBeVisible();
    await expect(page.locator('[aria-label="Skills and expertise"]')).toBeVisible();
    await expect(page.locator('[aria-label="Contact form"]')).toBeVisible();
  });
});
