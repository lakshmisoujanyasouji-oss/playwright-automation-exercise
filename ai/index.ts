import { generateTestCases } from './testCaseGenerator';
import { analyseFailure } from './failureAnalyser';
import { summariseTestResults } from './reportSummariser';
import { generateTestUser } from './testDataGenerator';

async function runAllAIDemos(): Promise<void> {

    console.log('🤖 AI-Enhanced Testing Framework Demo');
    console.log('='.repeat(50));

    // Demo 1 — Test Case Generation
    console.log('\n📋 DEMO 1: AI Test Case Generator');
    console.log('-'.repeat(50));
    const testCases = await generateTestCases(
        'Login Page',
        'E-commerce login page with email and password fields, remember me checkbox and forgot password link'
    );
    console.log(testCases);

    // Demo 2 — Failure Analysis
    console.log('\n🔍 DEMO 2: AI Failure Analyser');
    console.log('-'.repeat(50));
    const analysis = await analyseFailure(
        'TC001 - Login with valid credentials',
        'Error: expect(page).toHaveURL expected: https://automationexercise.com/ received: https://automationexercise.com/login Timeout: 10000ms',
        'https://automationexercise.com/login'
    );
    console.log('Root Cause:', analysis.rootCause);
    console.log('Possible Reasons:', analysis.possibleReasons);
    console.log('Suggested Fix:', analysis.suggestedFix);
    console.log('Priority:', analysis.priority);

    // Demo 3 — Report Summariser
    console.log('\n📊 DEMO 3: AI Report Summariser');
    console.log('-'.repeat(50));
    const summary = await summariseTestResults(
        21,
        19,
        2,
        ['TC003 - Signup test', 'TC005 - Search Dress']
    );
    console.log('Overall Status:', summary.overallStatus);
    console.log('Executive Summary:', summary.executiveSummary);
    console.log('Risk Level:', summary.riskLevel);
    console.log('Recommendations:', summary.recommendations);

    // Demo 4 — Test Data Generator
    console.log('\n👤 DEMO 4: AI Test Data Generator');
    console.log('-'.repeat(50));
    const user = await generateTestUser('New user registration for e-commerce platform');
    console.log('Generated User:', user);

    // Additional AI Test Case Generation — uncovered pages
    console.log('\n📋 DEMO 1B: AI Test Cases for Uncovered Pages');
    console.log('-'.repeat(50));

    await generateTestCases(
        'Cart Page',
        'E-commerce shopping cart page where users can view added products, update quantities, remove items and proceed to checkout'
    );

    await generateTestCases(
        'Checkout Page',
        'E-commerce checkout page with shipping address form, payment details, order summary and place order button'
    );

    await generateTestCases(
        'Product Details Page',
        'E-commerce product details page showing product image, name, price, description, size and color options and add to cart button'
    );

    await generateTestCases(
        'Contact Us Page',
        'Contact form with name, email, subject and message fields with submit button and file upload option'
    );

    console.log('✅ All additional test cases generated!');

    console.log('\n' + '='.repeat(50));
    console.log('✅ All AI demos completed successfully!');
}

runAllAIDemos().catch(console.error);