// ─── AI Module — Barrel Exports ───────────────────────────────────────────────
// Import from '../ai' to access any AI feature in the framework

// Core AI helper
export { askClaude } from './aiHelper';

// Failure analysis
export { analyseFailure } from './failureAnalyser';
export type { FailureAnalysis } from './failureAnalyser';

// Report summariser
export { summariseTestResults } from './reportSummariser';
export type { TestSummary } from './reportSummariser';

// Test case generator
export { generateTestCases } from './testCaseGenerator';
export type { TestCase, GeneratedTestSuite } from './testCaseGenerator';

// Test data generator
export { generateTestUser, generateTestProduct, generateTestAddress, generateBulkUsers } from './testDataGenerator';
export type { GeneratedUser, GeneratedProduct, GeneratedAddress } from './testDataGenerator';