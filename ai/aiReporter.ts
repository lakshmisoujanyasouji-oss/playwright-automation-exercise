import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import { analyseFailure } from './failureAnalyser';
import { summariseTestResults } from './reportSummariser';

class AIReporter implements Reporter {

    private totalTests: number = 0;
    private passedTests: number = 0;
    private failedTests: number = 0;
    private failedTestNames: string[] = [];

    async onTestEnd(test: TestCase, result: TestResult) {

        // Count results
        this.totalTests++;
        if (result.status === 'passed') {
            this.passedTests++;
        } else if (result.status === 'failed') {
            this.failedTests++;
            this.failedTestNames.push(test.title);

            // AI analysis for each failure
            console.log('\n🤖 AI Failure Analysis');
            console.log('─'.repeat(50));
            console.log(`Test: ${test.title}`);

            const errorMessage = result.error?.message || 'Unknown error';

            try {
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

    async onEnd(result: FullResult) {

        // Generate AI executive summary after ALL tests complete
        console.log('\n' + '='.repeat(60));
        console.log('🤖 AI EXECUTIVE TEST SUMMARY');
        console.log('='.repeat(60));

        try {
            const summaryPromise = summariseTestResults(
                this.totalTests,
                this.passedTests,
                this.failedTests,
                this.failedTestNames
            );

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('AI timeout')), 15000)
            );

            const summary = await Promise.race([summaryPromise, timeoutPromise]) as any;

            console.log(`📊 Overall Status : ${summary.overallStatus}`);
            console.log(`✅ Passed         : ${this.passedTests}/${this.totalTests}`);
            console.log(`❌ Failed         : ${this.failedTests}/${this.totalTests}`);
            console.log(`⚠️  Risk Level     : ${summary.riskLevel}`);
            console.log(`\n📝 Summary:\n${summary.executiveSummary}`);
            console.log('\n🔍 Key Findings:');
            summary.keyFindings.forEach((f: string) => console.log(`   → ${f}`));
            console.log('\n💡 Recommendations:');
            summary.recommendations.forEach((r: string) => console.log(`   → ${r}`));

        } catch (error) {
            console.log('⚠️  AI summary skipped — timeout or unavailable');
        }

        console.log('='.repeat(60));
    }
}

export default AIReporter;