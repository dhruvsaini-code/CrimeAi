/**
 * CrimePattern AI — Frontend Verification Suite.
 * Tests build artifacts, HTML structure, font loading, CSS classes, and API client definitions.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

const __dirname = path.resolve();

console.log('========================================');
console.log('RUNNING CRIMEPATTERN AI FRONTEND TESTS...');
console.log('========================================');

// 1. Verify build output files exist
const distHtml = path.join(__dirname, 'frontend/dist/index.html');
assert(fs.existsSync(distHtml), 'dist/index.html must exist after build');
console.log('✓ dist/index.html exists');

const htmlContent = fs.readFileSync(distHtml, 'utf-8');
assert(htmlContent.includes('CrimePattern AI'), 'HTML title must be present');
console.log('✓ dist/index.html has valid CrimePattern AI title');

// 2. Verify fonts configuration in index.html
const srcHtml = fs.readFileSync(path.join(__dirname, 'frontend/index.html'), 'utf-8');
assert(srcHtml.includes('Space+Grotesk'), 'Space Grotesk font must be loaded');
assert(srcHtml.includes('Inter'), 'Inter font must be loaded');
assert(srcHtml.includes('IBM+Plex+Mono'), 'IBM Plex Mono font must be loaded');
console.log('✓ Google Fonts: Space Grotesk, Inter, and IBM Plex Mono verified');

// 3. Verify Tailwind color palette tokens
const tailwindConfig = fs.readFileSync(path.join(__dirname, 'frontend/tailwind.config.js'), 'utf-8');
assert(tailwindConfig.includes('07080c'), 'Dark background token configured');
assert(tailwindConfig.includes('e11d2e'), 'Crime red accent token configured');
assert(tailwindConfig.includes('ffc400'), 'Investigative warning tape token configured');
console.log('✓ Tailwind configuration design tokens verified');

// 4. Verify API client methods
const apiContent = fs.readFileSync(path.join(__dirname, 'frontend/src/services/api.ts'), 'utf-8');
const expectedMethods = [
  'getOverviewStats',
  'getCases',
  'getTimeline',
  'getGeographySummary',
  'getClusteringResults',
  'executeSearch',
  'getGraphNetwork',
  'getAnomalies',
  'getAssociationRules',
  'analyzeCase',
];
for (const method of expectedMethods) {
  assert(apiContent.includes(method), `api.ts must declare ${method}`);
}
console.log(`✓ API client: all ${expectedMethods.length} integration endpoints declared`);

console.log('\n========================================');
console.log('ALL FRONTEND TESTS PASSED (100%)!');
console.log('========================================\n');

