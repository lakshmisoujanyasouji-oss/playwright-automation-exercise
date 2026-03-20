import { askClaude } from './aiHelper';

export interface FailureAnalysis {
    rootCause: string;
    possibleReasons: string[];
    suggestedFix: string;
    priority: 'High' | 'Medium' | 'Low';
}

export async function analyseFailure(
    testName: string,
    errorMessage: string,
    pageUrl: string
): Promise<FailureAnalysis> {

    const prompt = `You are a Senior QA Automation Engineer analysing a Playwright test failure.

Test Name: ${testName}
Page URL: ${pageUrl}
Error Message: ${errorMessage}

Analyse this failure and respond in this EXACT JSON format only, no extra text:
{
    "rootCause": "One sentence explaining the root cause",
    "possibleReasons": [
        "Reason 1",
        "Reason 2", 
        "Reason 3"
    ],
    "suggestedFix": "Specific actionable fix for the automation code",
    "priority": "High"
}

Priority should be:
- High: if it blocks critical user journey
- Medium: if it affects important but non-critical flow
- Low: if it is a minor UI or cosmetic issue`;

    console.log(`🤖 Analysing failure for: ${testName}`);
    const response = await askClaude(prompt);

    // Parse JSON response
    const cleanResponse = response.replace(/```json|```/g, '').trim();
    const analysis: FailureAnalysis = JSON.parse(cleanResponse);

    return analysis;
}