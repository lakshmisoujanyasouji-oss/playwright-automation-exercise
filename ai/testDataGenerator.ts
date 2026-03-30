import { askClaude } from './aiHelper';
import * as fs from 'fs';
import * as path from 'path';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface GeneratedUser {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
    mobile: string;
}

export interface GeneratedProduct {
    searchTerm: string;
    expectedCategory: string;
    priceRange: {
        min: number;
        max: number;
    };
    attributes: string[];
}

export interface GeneratedAddress {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
    mobile: string;
}

// ─── User Generator ───────────────────────────────────────────────────────────

export async function generateTestUser(scenario: string): Promise<GeneratedUser> {

    const timestamp = Date.now();

    const prompt = `You are a QA test data generator.

Generate realistic test user data for this scenario: ${scenario}

Respond in this EXACT JSON format only, no extra text:
{
    "name": "Full name",
    "email": "testuser_${timestamp}@testmail.com",
    "password": "Test@1234",
    "firstName": "First name",
    "lastName": "Last name",
    "address": "Street address",
    "city": "City name",
    "country": "United States",
    "state": "State name",
    "zipcode": "12345",
    "mobile": "1234567890"
}

Rules:
- Use realistic but fake data
- Email must use exactly: testuser_${timestamp}@testmail.com
- Password must have uppercase, lowercase, number and special character
- Country must be one of: India, United States, Canada, Australia, Israel
- All fields must be filled
- Mobile must be 10 digits only`;

    console.log(`🤖 Generating test user for scenario: ${scenario}`);
    const response = await askClaude(prompt);

    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const user: GeneratedUser = JSON.parse(cleanResponse);

    // Ensure email uniqueness regardless of AI response
    user.email = `testuser_${timestamp}@testmail.com`;

    saveToFile('ai-generated-user.json', user);
    console.log(`✅ Test user generated: ${user.email}`);
    return user;
}

// ─── Product Generator ────────────────────────────────────────────────────────

export async function generateTestProduct(scenario: string): Promise<GeneratedProduct> {

    const prompt = `You are a QA test data generator for an e-commerce platform.

Generate realistic product search test data for this scenario: ${scenario}

Respond in this EXACT JSON format only, no extra text:
{
    "searchTerm": "product search keyword",
    "expectedCategory": "product category name",
    "priceRange": {
        "min": 10,
        "max": 100
    },
    "attributes": [
        "attribute 1",
        "attribute 2",
        "attribute 3"
    ]
}

Rules:
- searchTerm must be a single realistic product keyword (e.g. "Dress", "Top", "Jeans")
- expectedCategory must be a realistic e-commerce category
- priceRange must have realistic min/max values in USD
- attributes must list 3 realistic product characteristics (e.g. color, size, material)`;

    console.log(`🤖 Generating test product for scenario: ${scenario}`);
    const response = await askClaude(prompt);

    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const product: GeneratedProduct = JSON.parse(cleanResponse);

    saveToFile('ai-generated-product.json', product);
    console.log(`✅ Test product generated: ${product.searchTerm}`);
    return product;
}

// ─── Address Generator ────────────────────────────────────────────────────────

export async function generateTestAddress(scenario: string): Promise<GeneratedAddress> {

    const prompt = `You are a QA test data generator for an e-commerce checkout flow.

Generate a realistic shipping address for this scenario: ${scenario}

Respond in this EXACT JSON format only, no extra text:
{
    "firstName": "First name",
    "lastName": "Last name",
    "company": "Company name or empty string",
    "address": "Street address",
    "city": "City name",
    "country": "United States",
    "state": "State name",
    "zipcode": "12345",
    "mobile": "1234567890"
}

Rules:
- Use realistic but fake data
- Country must be one of: India, United States, Canada, Australia, Israel
- Mobile must be 10 digits only
- company can be empty string if not applicable
- All other fields must be filled`;

    console.log(`🤖 Generating test address for scenario: ${scenario}`);
    const response = await askClaude(prompt);

    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const address: GeneratedAddress = JSON.parse(cleanResponse);

    saveToFile('ai-generated-address.json', address);
    console.log(`✅ Test address generated: ${address.city}, ${address.country}`);
    return address;
}

// ─── Bulk Generator ───────────────────────────────────────────────────────────

export async function generateBulkUsers(count: number, scenario: string): Promise<GeneratedUser[]> {
    console.log(`🤖 Generating ${count} test users for: ${scenario}`);
    const users: GeneratedUser[] = [];

    for (let i = 0; i < count; i++) {
        const user = await generateTestUser(`${scenario} — user ${i + 1} of ${count}`);
        users.push(user);
    }

    saveToFile('ai-generated-bulk-users.json', users);
    console.log(`✅ ${count} test users generated and saved`);
    return users;
}

// ─── File Helper ──────────────────────────────────────────────────────────────

function saveToFile(filename: string, data: unknown): void {
    const outputPath = path.join(__dirname, `../test-results/${filename}`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}