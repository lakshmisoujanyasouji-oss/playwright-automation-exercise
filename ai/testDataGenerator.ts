import { askClaude } from './aiHelper';

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

export async function generateTestUser(scenario: string): Promise<GeneratedUser> {

    const prompt = `You are a QA test data generator.

Generate realistic test user data for this scenario: ${scenario}

Respond in this EXACT JSON format only, no extra text:
{
    "name": "Full name",
    "email": "unique_${Date.now()}@testmail.com",
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
- Email must be unique — include timestamp
- Password must have uppercase, lowercase, number and special character
- Country must be one of: India, United States, Canada, Australia, Israel
- All fields must be filled`;

    console.log(`🤖 Generating test user for scenario: ${scenario}`);
    const response = await askClaude(prompt);

    // Parse JSON response
    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const user: GeneratedUser = JSON.parse(cleanResponse);

    console.log(`✅ Test user generated: ${user.email}`);
    return user;
}