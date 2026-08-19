import { test, expect } from '@playwright/test';

// Thiết lập credentials từ biến môi trường
test.use({
  httpCredentials: {
    username: process.env.BASIC_AUTH_USER || '',
    password: process.env.BASIC_AUTH_PASSWORD || ''
  }
});

test('Verify Basic Authentication', async ({ page }) => {
  // 1. Vào link
  // Lưu ý: Playwright không cho phép tương tác trực tiếp với popup Basic Auth (vì đây là popup của trình duyệt/hệ điều hành).
  // Thay vào đó, chúng ta truyền username/password vào httpCredentials (như ở trên) và Playwright sẽ tự động điền khi gặp popup.
  await page.goto('https://the-internet.herokuapp.com/basic_auth');

  // 2-4. Việc tìm popup, điền user/pass và bấm OK đã được Playwright xử lý ngầm (intercepting the request).

  // 5. Tìm text 'Congratulations! You must have the proper credentials.'
  const successMessage = page.locator('div.example p');
  await expect(successMessage).toContainText('Congratulations! You must have the proper credentials.');
});
