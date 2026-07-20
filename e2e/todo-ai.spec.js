import { test, expect } from '@playwright/test';
import { generateTestInputs, analyzeFailure } from '../utils/aiHelper';
import 'dotenv/config';

test.describe('AI-First Autonomous Todo Automation Suite', () => {
  let dynamicInputs = [];

  // Phase 1: AI Data Generation Agent runs before testing begins
  test.beforeAll(async () => {
    console.log('🤖 AI Agent: Generating dynamic test matrices...');
    dynamicInputs = await generateTestInputs();
    console.log('📋 Dynamic Inputs Generated:', dynamicInputs);
  });

  // Phase 2: Core UI State Verification
  test('should process AI-generated inputs and track state persistence', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');

    const inputSelector = page.locator('.new-todo');

    // Dynamically loop through what the AI built for us
    for (const itemText of dynamicInputs) {
      await inputSelector.fill(itemText);
      await page.keyboard.press('Enter');
    }

    // Verify the items were structurally added to the DOM
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(dynamicInputs.length);

    // Complete the first task and check filters
    await todoItems.first().locator('.toggle').click();
    await page.locator('a:has-text("Completed")').click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });

  // Phase 3: The Autonomous Debugging & Self-Healing Simulation Loop
  test('should trigger AI Diagnostic Engine on failure', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');

    try {
      console.log('⚡ Running assertion on an intentionally broken element...');
      // We purposefully look for an invalid element to trigger a catch block
      await expect(page.locator('.todo-list-corrupted-selector')).toBeVisible({ timeout: 3000 });
    } catch (error) {
      console.log('💥 Test Failure Intercepted! Extracting context data...');
      
      // Grab the current state of the DOM where the failure occurred
      const rawDOM = await page.locator('.todoapp').innerHTML();
      
      // Pass the context to the AI Agent
      const aiReport = await analyzeFailure(error.message, rawDOM);
      
      console.log('\n=================== 🧠 AI SDET DIAGNOSTIC REPORT ===================');
      console.log(aiReport);
      console.log('==================================================================\n');
      
      // Throw the initial error so the test suite correctly marks it failed in the CI/CD pipeline
      throw error;
    }
  });
});