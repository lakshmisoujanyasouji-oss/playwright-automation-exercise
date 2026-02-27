# 🎭 Playwright Automation Framework — AutomationExercise.com

![Playwright](https://img.shields.io/badge/Playwright-TypeScript-blue?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-orange?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Project Overview

A personal end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript**, targeting the publicly available practice e-commerce site [AutomationExercise.com](https://automationexercise.com) — a full-fledged website purpose-built for automation engineers to sharpen their skills.

This project demonstrates professional-grade automation practices including the **Page Object Model (POM)** design pattern, **data-driven testing**, **API testing**, and a fully integrated **CI/CD pipeline** via GitHub Actions.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & E2E testing |
| [TypeScript](https://www.typescriptlang.org/) | Strongly-typed test authoring |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [Allure / Playwright HTML Reporter](https://playwright.dev/docs/test-reporters) | Test reporting |

---

## 📁 Project Structure

```
playwright-automation-exercise/
├── tests/
│   ├── auth/               # Login, register, logout tests
│   ├── products/           # Product search, filtering, details
│   ├── cart/               # Add to cart, remove, quantities
│   ├── checkout/           # Order placement and payment flow
│   └── api/                # API test cases
├── pages/                  # Page Object Models (POM)
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/               # Test data (JSON)
│   └── users.json
├── utils/                  # Helpers and shared utilities
│   └── helpers.ts
├── .env.example            # Environment variable template
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json
└── README.md
```

---

## 🧪 Test Coverage

### ✅ UI Test Cases

| # | Test Case | Status |
|---|---|---|
| 1 | Register new user | ✅ |
| 2 | Login with valid credentials | ✅ |
| 3 | Login with invalid credentials | ✅ |
| 4 | Logout | ✅ |
| 5 | Register with existing email | ✅ |
| 6 | Contact Us form | ✅ |
| 7 | Verify all products & product detail page | ✅ |
| 8 | Search for a product | ✅ |
| 9 | Subscribe via footer (home page) | ✅ |
| 10 | Add products to cart | ✅ |
| 11 | Remove products from cart | ✅ |
| 12 | Place order (register at checkout) | ✅ |
| 13 | Place order (login before checkout) | ✅ |
| 14 | View & verify category products | ✅ |
| 15 | Verify brand product pages | ✅ |

### ✅ API Test Cases

| # | Endpoint | Method | Status |
|---|---|---|---|
| 1 | Get all products | GET | ✅ |
| 2 | Search product | POST | ✅ |
| 3 | Verify login (valid) | POST | ✅ |
| 4 | Verify login (invalid) | POST | ✅ |
| 5 | Create account | POST | ✅ |
| 6 | Delete account | DELETE | ✅ |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/playwright-automation-exercise.git
cd playwright-automation-exercise

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your test credentials
```

### `.env.example`
```
TEST_EMAIL=your_test_email@example.com
TEST_PASSWORD=your_test_password
BASE_URL=https://automationexercise.com
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/auth/login.spec.ts

# Run tests on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in debug mode
npx playwright test --debug

# View the HTML test report
npx playwright show-report
```

---

## 🏗️ Design Patterns

### Page Object Model (POM)

All page interactions are encapsulated in dedicated Page classes under `/pages`, keeping test files clean and maintainable.

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

## 🔄 CI/CD — GitHub Actions

Tests run automatically on every `push` and `pull_request` to the `main` branch.

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📊 Test Reporting

After running tests, an interactive HTML report is generated automatically:

```bash
npx playwright show-report
```

The report includes test results, screenshots on failure, traces, and video recordings.

---

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome. Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**[Soujanya]**
- LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/lakshmisoujanya/)
- GitHub: [github.com/yourusername](https://github.com/yourusername)

---

> ⭐ If you find this project useful, consider giving it a star on GitHub!
