# 🎭 Playwright Automation Framework — AutomationExercise.com

![Playwright](https://img.shields.io/badge/Playwright-TypeScript-blue?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-orange?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Project Overview

A personal end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript**, targeting the publicly available practice e-commerce site [AutomationExercise.com](https://automationexercise.com) — a full-fledged website purpose-built for automation engineers to sharpen their skills.

This project demonstrates professional-grade automation practices including the **Page Object Model (POM)** design pattern, **data-driven testing**, **TypeScript interfaces**, **environment variable management**, and a fully integrated **CI/CD pipeline** via GitHub Actions.

---

## 🏗️ Framework Architecture

```
Test Layer (*.spec.ts)
        ↓
Page Object Layer (pages/)
        ↓
Interfaces & Fixtures (interfaces/ + fixtures/)
        ↓
Playwright Engine
        ↓
CI Pipeline (GitHub Actions)
```

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & E2E testing |
| [TypeScript](https://www.typescriptlang.org/) | Strongly-typed test authoring |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [Playwright HTML Reporter](https://playwright.dev/docs/test-reporters) | Test reporting |

---

## 🎯 Automation Strategy

The framework focuses on maintaining stable automation suites that provide fast feedback during development.

Key principles:
- Prioritize business-critical workflows for automation
- Use **Page Object Model** to maintain separation of concerns
- Keep tests **deterministic and independent**
- Use **TypeScript interfaces** for type-safe test data
- Use **JSON fixtures** for data-driven testing
- Protect credentials using **environment variables**
- Integrate automated regression into **CI pipelines**

---

## 📁 Project Structure

```
playwright-automation-exercise/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline
├── tests/
│   ├── auth/                   # Login, register, logout tests
│   │   ├── login.spec.ts
│   │   ├── logout.spec.ts
│   │   └── signup.spec.ts
│   ├── products/               # Product search tests
│   │   └── products.spec.ts
│   ├── cart/                   # Add to cart, remove (coming soon)
│   ├── checkout/               # Order placement (coming soon)
│   └── api/                    # API test cases (coming soon)
├── pages/                      # Page Object Models (POM)
│   ├── loginPage.ts
│   ├── signupPage.ts
│   ├── accountPage.ts
│   └── productsPage.ts
├── interfaces/                 # TypeScript interfaces
│   └── IUser.ts                # User data contract
├── fixtures/                   # Test data
│   ├── userFactory.ts          # Dynamic user data generator
│   └── products.json           # Product search terms
├── utils/                      # Helpers and shared utilities
├── .env.example                # Environment variable template
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json
└── README.md
```

---

## 🧪 Test Coverage

### ✅ UI Test Cases

| # | Test Case | Module | Status |
|---|---|---|---|
| TC001 | Login with valid credentials | Auth | ✅ |
| TC002 | Login with invalid credentials | Auth | ✅ |
| TC003 | Register new user, delete & verify deletion | Auth | ✅ |
| TC004 | Logout successfully | Auth | ✅ |
| TC005 | Search for a product (data-driven) | Products | ✅ |
| TC006 | View product details | Products | ⬜ In Progress |
| TC007 | Add product to cart | Cart | ⬜ In Progress |
| TC008 | Remove product from cart | Cart | ⬜ In Progress |
| TC009 | Place order (login before checkout) | Checkout | ⬜ In Progress |
| TC010 | Contact Us form | UI | ⬜ In Progress |

### 🔌 API Test Cases

| # | Endpoint | Method | Status |
|---|---|---|---|
| 1 | Get all products | GET | ⬜ In Progress |
| 2 | Search product | POST | ⬜ In Progress |
| 3 | Verify login (valid) | POST | ⬜ In Progress |
| 4 | Verify login (invalid) | POST | ⬜ In Progress |
| 5 | Create account | POST | ⬜ In Progress |
| 6 | Delete account | DELETE | ⬜ In Progress |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/lakshmisoujanyasouji-oss/playwright-automation-exercise.git
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
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific module
npx playwright test tests/auth/
npx playwright test tests/products/

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
// pages/loginPage.ts
import { Page, Locator, expect } from '@playwright/test';

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

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### TypeScript Interface (IUser)

Type-safe test data using interfaces ensures consistency across all test files:

```typescript
// interfaces/IUser.ts
export interface IUser {
  name: string;
  email?: string;       // optional - auto generated
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}
```

### Data-Driven Testing with Fixtures

```typescript
// fixtures/products.json
{
  "searchTerms": ["Top", "Dress", "Jeans"]
}

// forEach automatically generates one test per search term
searchData.searchTerms.forEach(term => {
  test(`TC005 - Search for product: ${term}`, async ({ page }) => {
    await productsPage.searchProduct(term);
    await productsPage.expectResultsVisible(term);
  });
});
```

---

## 🔄 CI/CD — GitHub Actions

Tests run automatically on every `push` and `pull_request` to the `main` branch. The pipeline runs on all three browsers (Chromium, Firefox, WebKit) in headless mode.

```yaml
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

**Lakshmi Soujanya**
- LinkedIn: [linkedin.com/in/lakshmisoujanya](https://www.linkedin.com/in/lakshmisoujanya/)
- GitHub: [github.com/lakshmisoujanyasouji-oss](https://github.com/lakshmisoujanyasouji-oss)

---

> ⭐ If you find this project useful, consider giving it a star on GitHub!
