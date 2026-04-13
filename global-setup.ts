import { initializeDatabase } from './db/dbHelper';
import dotenv from 'dotenv';
import path from 'path';

async function globalSetup(): Promise<void> {

    // Load environment variables
    dotenv.config({ path: path.resolve(__dirname, '.env') });

    console.log('\n' + '='.repeat(60));
    console.log('🚀 GLOBAL SETUP — Initializing Test Suite');
    console.log('='.repeat(60));

    // ── Step 1: Verify Environment Variables ──────────────────────
    console.log('\n📋 Checking environment variables...');

    const requiredEnvVars = ['TEST_EMAIL', 'TEST_PASSWORD', 'CLAUDE_API_KEY'];
    const missingVars: string[] = [];

    requiredEnvVars.forEach(envVar => {
        if (!process.env[envVar]) {
            missingVars.push(envVar);
        } else {
            console.log(`   ✅ ${envVar} — found`);
        }
    });

    if (missingVars.length > 0) {
        console.warn(`   ⚠️  Missing env vars: ${missingVars.join(', ')} — some features may be unavailable`);
    }

    // ── Step 2: Initialize Database ───────────────────────────────
    console.log('\n🗄️  Initializing SQLite database...');
    try {
        initializeDatabase();
        console.log('   ✅ Database initialized and seeded successfully');
    } catch (error) {
        console.error('   ❌ Database initialization failed:', error);
        throw error;
    }

    // ── Step 3: Log Test Run Info ─────────────────────────────────
    const startTime = new Date().toISOString();
    console.log('\n📅 Test Run Info:');
    console.log(`   Start Time  : ${startTime}`);
    console.log(`   Environment : ${process.env.CI ? 'CI' : 'Local'}`);
    console.log(`   Base URL    : https://www.automationexercise.com`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Global Setup Complete — Running Tests...');
    console.log('='.repeat(60) + '\n');
}

export default globalSetup;