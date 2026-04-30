#!/usr/bin/env node

/**
 * Helper script to open Playwright HTML report
 * Usage: node scripts/openReport.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const reportPath = path.join(__dirname, '..', 'playwright-report', 'index.html');

if (!fs.existsSync(reportPath)) {
  console.error('❌ Report not found at:', reportPath);
  console.log('\n📋 Run tests first with: npm test');
  console.log('   Then view report with: npm run test:report\n');
  process.exit(1);
}

console.log('📊 Opening Playwright HTML Report...\n');

// Determine OS and open command
const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

let command;
let args;

if (isWindows) {
  command = 'cmd';
  args = ['/c', `start "" "${reportPath}"`];
} else if (isMac) {
  command = 'open';
  args = [reportPath];
} else {
  command = 'xdg-open';
  args = [reportPath];
}

try {
  spawn(command, args);
  console.log('✅ Report opened in default browser');
  console.log(`📍 Report location: ${reportPath}\n`);
} catch (error) {
  console.error('Error opening report:', error);
  console.log(`\n📍 Report location: ${reportPath}`);
  console.log('Please open this file manually in your browser\n');
  process.exit(1);
}
