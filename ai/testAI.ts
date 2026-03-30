import { generateTestCases } from './testCaseGenerator';
import { analyseFailure } from './failureAnalyser';
import { summariseTestResults } from './reportSummariser';
import { generateTestUser, generateTestProduct, generateTestAddress } from './testDataGenerator';

async function runAllAIDemos(): Promise<void> {

    console.log('🤖 AI-Enhanced Testing Framework Demo');
    console.log('='.repeat(60));

    // ─── Demo 1 — Test Case Generator (Login Page) ────────────────────────────
    console.log('\n📋 DEMO 1: AI Test Case Generator — Login Page');
    console.log('-'.repeat(60));

    const loginSuite = await generateTestCases(
        'Login Page',
        'E-commerce login page with email and password fields, remember me checkbox and forgot password link'
    );
    console.log(`✅ Generated ${loginSuite.totalCases} test cases for: ${loginSuite.pageName}`);
    loginSuite.testCases.forEach(tc => {
        console.log(`   [${tc.priority}] ${tc.id} — ${tc.title} (${tc.category})`);
    });

    // ─── Demo 1B — Test Case Generator (Uncovered Pages) ─────────────────────
    console.log('\n📋 DEMO 1B: AI Test Cases for Uncovered Pages');
    console.log('-'.repeat(60));

    const pagesToGenerate = [
        {
            name: 'Cart Page',
            description: 'E-commerce shopping cart page where users can view added products, update quantities, remove items and proceed to checkout'
        },
        {
            name: 'Checkout Page',
            description: 'E-commerce checkout page with shipping address form, payment details, order summary and place order button'
        },
        {
            name: 'Product Details Page',
            description: 'E-commerce product details page showing product image, name, price, description, size and color options and add to cart button'
        },
        {
            name: 'Contact Us Page',
            description: 'Contact form with name, email, subject and message fields with submit button and file upload option'
        }
    ];

    for (const p of pagesToGenerate) {
        const suite = await generateTestCases(p.name, p.description);
        console.log(`✅ ${suite.pageName}: ${suite.totalCases} test cases generated`);
        suite.testCases.forEach(tc => {
            console.log(`   [${tc.priority}] ${tc.id} — ${tc.title} (${tc.category})`);
        });
        console.log('');
    }

    // ─── Demo 2 — Failure Analyser ────────────────────────────────────────────
    console.log('\n🔍 DEMO 2: AI Failure Analyser');
    console.log('-'.repeat(60));

    const analysis = await analyseFailure(
        'TC001 - Login with valid credentials',
        'Error: expect(page).toHaveURL expected: https://automationexercise.com/ received: https://automationexercise.com/login Timeout: 10000ms',
        'https://automationexercise.com/login'
    );
    console.log(`📍 Root Cause   : ${analysis.rootCause}`);
    console.log(`🔧 Suggested Fix: ${analysis.suggestedFix}`);
    console.log(`⚠️  Priority     : ${analysis.priority}`);
    console.log('🔎 Possible Reasons:');
    analysis.possibleReasons.forEach(r => console.log(`   → ${r}`));

    // ─── Demo 3 — Report Summariser ───────────────────────────────────────────
    console.log('\n📊 DEMO 3: AI Report Summariser');
    console.log('-'.repeat(60));

    const summary = await summariseTestResults(
        21,
        19,
        2,
        ['TC003 - Signup test', 'TC005 - Search Dress']
    );
    console.log(`📊 Overall Status : ${summary.overallStatus}`);
    console.log(`⚠️  Risk Level     : ${summary.riskLevel}`);
    console.log(`📝 Summary        : ${summary.executiveSummary}`);
    console.log('🔍 Key Findings:');
    summary.keyFindings.forEach(f => console.log(`   → ${f}`));
    console.log('💡 Recommendations:');
    summary.recommendations.forEach(r => console.log(`   → ${r}`));

    // ─── Demo 4 — Test Data Generator (User) ──────────────────────────────────
    console.log('\n👤 DEMO 4A: AI Test Data Generator — User');
    console.log('-'.repeat(60));

    const user = await generateTestUser('New user registration for e-commerce platform');
    console.log(`✅ Name     : ${user.name}`);
    console.log(`✅ Email    : ${user.email}`);
    console.log(`✅ Location : ${user.city}, ${user.country}`);

    // ─── Demo 4B — Test Data Generator (Product) ──────────────────────────────
    console.log('\n🛍️  DEMO 4B: AI Test Data Generator — Product');
    console.log('-'.repeat(60));

    const product = await generateTestProduct('Product search for women\'s clothing category');
    console.log(`✅ Search Term : ${product.searchTerm}`);
    console.log(`✅ Category   : ${product.expectedCategory}`);
    console.log(`✅ Price Range: $${product.priceRange.min} — $${product.priceRange.max}`);
    console.log(`✅ Attributes : ${product.attributes.join(', ')}`);

    // ─── Demo 4C — Test Data Generator (Address) ──────────────────────────────
    console.log('\n🏠 DEMO 4C: AI Test Data Generator — Shipping Address');
    console.log('-'.repeat(60));

    const address = await generateTestAddress('Checkout shipping address for US customer');
    console.log(`✅ Name     : ${address.firstName} ${address.lastName}`);
    console.log(`✅ Address  : ${address.address}`);
    console.log(`✅ Location : ${address.city}, ${address.state}, ${address.country}`);

    // ─── Done ─────────────────────────────────────────────────────────────────
    console.log('\n' + '='.repeat(60));
    console.log('✅ All AI demos completed successfully!');
    console.log('📁 Results saved to: test-results/');
    console.log('='.repeat(60));
}

runAllAIDemos().catch(console.error);