import { askClaude } from './aiHelper';
import * as fs from 'fs';
import * as path from 'path';

export async function generateTestCases(pageName: string, pageDescription: string): Promise<string> {
    
    const prompt = `You are a Senior QA Automation Engineer with 10+ years experience.

Generate test cases for the following page:
Page: ${pageName}
Description: ${pageDescription}

Provide exactly 8 test cases in this format:
TC001 - [Test case title]
Precondition: [What needs to be set up]
Steps: [Step by step actions]
Expected Result: [What should happen]

Cover these scenarios:
- Happy path (valid data)
- Negative scenarios (invalid data)
- Boundary conditions
- UI validation

Keep each test case concise and professional.`;

    console.log(`🤖 Generating test cases for: ${pageName}`);
    const response = await askClaude(prompt);
    
    // Save to file
    const outputPath = path.join(__dirname, `../test-results/ai-generated-${pageName.toLowerCase().replace(/\s/g, '-')}.txt`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, response);
    
    console.log(`✅ Test cases saved to: ${outputPath}`);
    return response;
}