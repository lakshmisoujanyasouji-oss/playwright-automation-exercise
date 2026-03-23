import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { analyseFailure } from './failureAnalyser';

class AIReporter implements Reporter {

    async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status !== 'failed') return;

    console.log('\n🤖 AI Failure Analysis');
    console.log('─'.repeat(50));
    console.log(`Test: ${test.title}`);

    const errorMessage = result.error?.message || 'Unknown error';

    try {
        // Add 10 second timeout — won't hang forever!
        const analysisPromise = analyseFailure(
            test.title,
            errorMessage,
            'https://automationexercise.com'
        );

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('AI timeout')), 10000)
        );

        const analysis = await Promise.race([analysisPromise, timeoutPromise]) as any;

        console.log(`📍 Root Cause: ${analysis.rootCause}`);
        console.log(`🔧 Suggested Fix: ${analysis.suggestedFix}`);
        console.log(`⚠️  Priority: ${analysis.priority}`);

    } catch (error) {
        console.log('⚠️  AI analysis skipped — timeout or unavailable');
    }
    console.log('─'.repeat(50));
}
}

export default AIReporter;