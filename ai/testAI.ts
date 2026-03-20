import { askClaude } from './aiHelper';

async function main() {
    console.log('🤖 Testing Claude API connection...\n');

    const response = await askClaude(
        'You are a QA expert. Give me 3 short test scenarios for a login page. Keep each scenario to one line.'
    );

    console.log('✅ Claude API is working!\n');
    console.log('📋 AI Generated Test Scenarios:');
    console.log('─'.repeat(50));
    console.log(response);
}

main().catch(console.error);