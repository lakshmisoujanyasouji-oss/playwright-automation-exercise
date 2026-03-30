import { askClaude } from './aiHelper';
import * as fs from 'fs';
import * as path from 'path';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface TestCase {
    id: string;
    title: string;
    precondition: string;
    steps: string[];
    expectedResult: string;
    category: 'Happy Path' | 'Negative' | 'Boundary' | 'UI Validation';
    priority: 'High' | 'Medium' | 'Low';
}

export interface GeneratedTestSuite {
    pageName: string;
    pageDescription: string;
    generatedAt: string;
    totalCases: number;
    testCases: TestCase[];
}

// ─── Generator ────────────────────────────────────────────────────────────────

export async function generateTestCases(
    pageName: string,
    pageDescription: string
): Promise<GeneratedTestSuite> {

    const prompt = `You are a Senior QA Automation Engineer with 10+ years experience.

Generate exactly 8 test cases for the following page:
Page: ${pageName}
Description: ${pageDescription}

Respond in this EXACT JSON format only, no extra text:
{
    "testCases": [
        {
            "id": "TC001",
            "title": "Test case title",
            "precondition": "What needs to be set up before the test",
            "steps": [
                "Step 1 action",
                "Step 2 action",
                "Step 3 action"
            ],
            "expectedResult": "What should happen after the steps",
            "category": "Happy Path",
            "priority": "High"
        }
    ]
}

Coverage rules:
- 2 Happy Path cases (valid data, successful flows) → priority High
- 2 Negative cases (invalid data, error handling) → priority High or Medium
- 2 Boundary cases (edge values, limits) → priority Medium
- 2 UI Validation cases (field validation, error messages) → priority Low or Medium

Category must be exactly one of: Happy Path, Negative, Boundary, UI Validation
Priority must be exactly one of: High, Medium, Low`;

    console.log(`🤖 Generating test cases for: ${pageName}`);
    const response = await askClaude(prompt, 2048);

    // Parse JSON response
    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanResponse);

    // Build structured output
    const suite: GeneratedTestSuite = {
        pageName,
        pageDescription,
        generatedAt: new Date().toISOString(),
        totalCases: parsed.testCases.length,
        testCases: parsed.testCases
    };

    // Save structured JSON
    const jsonOutputPath = path.join(
        __dirname,
        `../test-results/ai-testcases-${pageName.toLowerCase().replace(/\s/g, '-')}.json`
    );
    fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });
    fs.writeFileSync(jsonOutputPath, JSON.stringify(suite, null, 2));
    console.log(`✅ Structured test cases saved to: ${jsonOutputPath}`);

    // Also save human-readable .txt
    const txtOutputPath = path.join(
        __dirname,
        `../test-results/ai-testcases-${pageName.toLowerCase().replace(/\s/g, '-')}.txt`
    );
    fs.writeFileSync(txtOutputPath, formatAsText(suite));
    console.log(`✅ Readable test cases saved to: ${txtOutputPath}`);

    return suite;
}

// ─── Formatter ────────────────────────────────────────────────────────────────

function formatAsText(suite: GeneratedTestSuite): string {
    const lines: string[] = [
        `AI Generated Test Cases — ${suite.pageName}`,
        `Generated At : ${suite.generatedAt}`,
        `Total Cases  : ${suite.totalCases}`,
        '='.repeat(60),
        ''
    ];

    suite.testCases.forEach((tc, index) => {
        lines.push(`${tc.id} — ${tc.title}`);
        lines.push(`Category     : ${tc.category}`);
        lines.push(`Priority     : ${tc.priority}`);
        lines.push(`Precondition : ${tc.precondition}`);
        lines.push('Steps:');
        tc.steps.forEach((step, i) => lines.push(`  ${i + 1}. ${step}`));
        lines.push(`Expected     : ${tc.expectedResult}`);
        if (index < suite.testCases.length - 1) lines.push('-'.repeat(60));
        lines.push('');
    });

    return lines.join('\n');
}