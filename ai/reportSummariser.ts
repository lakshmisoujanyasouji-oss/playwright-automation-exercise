import { askClaude } from './aiHelper';
import * as fs from 'fs';
import * as path from 'path';

export interface TestSummary {
    overallStatus: 'PASSED' | 'FAILED' | 'PARTIAL';
    executiveSummary: string;
    keyFindings: string[];
    recommendations: string[];
    riskLevel: 'Low' | 'Medium' | 'High';
}

export async function summariseTestResults(
    totalTests: number,
    passed: number,
    failed: number,
    failedTests: string[]
): Promise<TestSummary> {

    const passRate = ((passed / totalTests) * 100).toFixed(1);

    const prompt = `You are a Senior QA Lead presenting test results to stakeholders.

Test Execution Summary:
- Total Tests: ${totalTests}
- Passed: ${passed}
- Failed: ${failed}
- Pass Rate: ${passRate}%
- Failed Tests: ${failedTests.join(', ') || 'None'}

Generate an executive summary in this EXACT JSON format only, no extra text:
{
    "overallStatus": "PASSED",
    "executiveSummary": "2-3 sentence professional summary suitable for management",
    "keyFindings": [
        "Finding 1",
        "Finding 2",
        "Finding 3"
    ],
    "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
    ],
    "riskLevel": "Low"
}

Rules:
- overallStatus: PASSED if pass rate >= 90%, PARTIAL if 70-89%, FAILED if below 70%
- riskLevel: Low if PASSED, Medium if PARTIAL, High if FAILED
- Keep language professional and non-technical for stakeholders`;

    console.log('🤖 Generating executive test summary...');
    const response = await askClaude(prompt);

    // Parse JSON response
    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const summary: TestSummary = JSON.parse(cleanResponse);

    // Save summary to file
    const outputPath = path.join(__dirname, '../test-results/ai-summary.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

    console.log('✅ AI Summary saved to: test-results/ai-summary.json');
    return summary;
}