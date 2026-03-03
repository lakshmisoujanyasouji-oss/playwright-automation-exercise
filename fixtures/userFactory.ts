import { IUser } from "../interfaces/IUser";

type UserOverrides = Partial<IUser>;

/**
 * Creates a short random string.
 * This helps make test data unique so tests do not fail
 * due to duplicate values (like same email used twice).
 */
function randomString(length = 6): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generates a unique test email address.
 * 
 * We avoid using real personal emails.
 * The combination of timestamp and random text ensures
 * that each test run creates a new email.
 */
function uniqueEmail(): string {
  const ts = Date.now().toString(36);
  const rnd = randomString();
  return `automation.${ts}.${rnd}@example.com`;
}

/**
 * Creates a test user object with safe, fake data.
 *
 * Why this is needed:
 * - Prevents hardcoding personal information.
 * - Keeps test data consistent across the project.
 * - Allows tests to override specific fields when needed.
 *
 * Example:
 * const user = buildUser();
 * const userWithDifferentCity = buildUser({ city: "NewCity" });
 *
 * @param overrides Optional fields to customize the default user.
 * @returns A complete IUser object ready for test usage.
 */
export function buildUser(overrides: UserOverrides = {}): IUser {
  const base: IUser = {
    name: `User${randomString()}`,
    password: "Test@12345",

    // Date fields kept as strings because the UI expects text input
    day: "15",
    month: "8",
    year: "1995",

    firstName: `FN${randomString(4)}`,
    lastName: `LN${randomString(4)}`,

    // Fake address information (not real)
    address: "123 Test Street",
    address2: "Unit 01-01",
    country: "Singapore",
    state: "SG",
    city: "TestCity",
    zipcode: "123456",

    // Random 8-digit mobile number
    mobile: `9${Math.floor(1000000 + Math.random() * 9000000)}`,

    email: uniqueEmail(),

    company: "TestCompany",
  };

  // Allow tests to override any default value if needed
  return { ...base, ...overrides };
}