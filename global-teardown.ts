import { closeDatabase, getAllUsers, deleteUserByEmail } from './db/dbHelper';

async function globalTeardown(): Promise<void> {

    console.log('\n' + '='.repeat(60));
    console.log('🧹 GLOBAL TEARDOWN — Cleaning Up Test Suite');
    console.log('='.repeat(60));

    // ── Step 1: Clean Up Test Users ───────────────────────────────
    console.log('\n👤 Cleaning up test users from database...');
    try {
        const allUsers = getAllUsers();
        const testUsers = allUsers.filter(user =>
            user.email.includes('@playwright.com') ||
            user.email.includes('@testmail.com') ||
            user.email.includes('@example.com') ||
            user.email.includes('automation.')
        );

        if (testUsers.length > 0) {
            testUsers.forEach(user => {
                deleteUserByEmail(user.email);
                console.log(`   🗑️  Deleted test user: ${user.email}`);
            });
            console.log(`   ✅ ${testUsers.length} test user(s) cleaned up`);
        } else {
            console.log('   ✅ No test users to clean up');
        }
    } catch (error) {
        console.warn('   ⚠️  Could not clean up test users:', error);
    }

    // ── Step 2: Close Database Connection ─────────────────────────
    console.log('\n🗄️  Closing database connection...');
    try {
        closeDatabase();
        console.log('   ✅ Database connection closed');
    } catch (error) {
        console.warn('   ⚠️  Could not close database:', error);
    }

    // ── Step 3: Log Test Run Completion ───────────────────────────
    const endTime = new Date().toISOString();
    console.log('\n📅 Test Run Completed:');
    console.log(`   End Time    : ${endTime}`);
    console.log(`   Environment : ${process.env.CI ? 'CI' : 'Local'}`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Global Teardown Complete');
    console.log('='.repeat(60) + '\n');
}

export default globalTeardown;