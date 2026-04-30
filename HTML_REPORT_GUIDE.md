# HTML Test Report Guide

## Overview

Playwright automatically generates comprehensive HTML reports after every test run. These reports provide detailed test results, pass/fail status, execution time, screenshots, and videos (on failure).

## Report Features

### ✅ Automatic Report Generation
- Generates after **every single test run**
- Stored in `playwright-report/` directory
- Shows detailed pass/fail status for each test
- Displays execution time and performance metrics

### 📊 Report Includes
- **Test Results**: Pass/Fail/Skip status for each test
- **Execution Time**: Duration of each test and total run time
- **Test Details**: Full error messages and stack traces
- **Screenshots**: Captured at failure points
- **Videos**: Recorded on first retry (trace: 'on-first-retry')
- **Test Timeline**: Visual timeline of test execution
- **Retry Information**: Details on test retries

## Quick Start

### 1. Run Tests (Report Generates Automatically)
```bash
npm test
```

The test run will automatically open the HTML report in your default browser after completion.

### 2. View Report Later
```bash
npm run test:report
```

This opens the previously generated report.

### 3. Run Tests Without Opening Report
```bash
npx playwright test
```

Report will be generated but not automatically opened.

## Available npm Scripts

### Testing
| Command | Description |
|---------|-------------|
| `npm test` | Run all tests and auto-open report |
| `npm run test:headed` | Run tests in headed mode (see browser) |
| `npm run test:debug` | Run in debug mode with inspector |
| `npm run test:ui` | Run in interactive UI mode |
| `npm run test:report` | View the last generated report |

### Specific Test Suites
| Command | Description |
|---------|-------------|
| `npm run test:home` | Run home page tests only |
| `npm run test:explore` | Run explore page tests only |
| `npm run test:interview` | Run interview questions tests |
| `npm run test:concepts` | Run concepts page tests |
| `npm run test:challenges` | Run challenges page tests |
| `npm run test:blogs` | Run blogs page tests |
| `npm run test:e2e` | Run end-to-end journey tests |

### Combined
| Command | Description |
|---------|-------------|
| `npm run test:all` | Run all tests and open report |
| `npm run test:grep` | Run tests matching pattern |

### Maintenance
| Command | Description |
|---------|-------------|
| `npm run clean` | Clean up test reports and artifacts |

## Report Structure

```
playwright-report/
├── index.html              # Main report file
├── blob_*.txt              # Test artifacts (traces, videos, etc.)
├── data.json               # Report data
├── trace/                  # Execution traces
└── ...
```

## Report Display

The HTML report shows:

### 🔴 Failed Tests
- Red status indicator
- Error message and stack trace
- Screenshot at failure point
- Video recording (if available)
- Execution duration

### 🟢 Passed Tests
- Green status indicator
- Execution duration
- Full test name and description
- Test steps and timeline

### ⚪ Skipped Tests
- Gray status indicator
- Skip reason (if provided)

## Configuration

The report is configured in `playwright.config.ts`:

```typescript
reporter: [
  ['html', { 
    outputFolder: 'playwright-report',
    open: 'always',  // Options: 'always', 'never', 'on-failure'
  }],
  ['list'],  // Terminal summary
  ['json', { outputFile: 'test-results.json' }],
]
```

### Reporter Options

| Option | Values | Description |
|--------|--------|-------------|
| `open` | 'always', 'never', 'on-failure' | When to open report in browser |
| `outputFolder` | path | Where to save the report |

## Viewing Reports

### Option 1: Browser (Automatic)
- Report opens automatically after test run
- Fully interactive with filtering and search
- Shows all test details and artifacts

### Option 2: Manual Browser Open
```bash
npm run test:report
```

### Option 3: Direct File Access
Navigate to: `playwright-report/index.html` in your browser

## Report Features in Detail

### Test Filtering
- Filter by test name
- Filter by status (passed/failed/skipped)
- Search functionality

### Test Details
Click on any test to see:
- Full test name and description
- Step-by-step execution
- Assertions and their results
- Duration breakdown
- Related artifacts

### Artifacts Tab
View:
- Screenshots (click to enlarge)
- Video recordings
- Trace files (open in Playwright Inspector)
- Network logs
- Console output

### Timeline View
- Visual representation of test execution
- Shows test duration
- Highlights slow tests
- Parallel execution visualization (if running with workers)

## Analyzing Test Results

### Quick Summary
```
Test Summary:
✅ 87 passed
❌ 2 failed
⏭️  1 skipped
─────────────
📊 Total: 90 tests
⏱️  Duration: 2m 34s
```

### Detailed Analysis

1. **Click Failed Test** to see error
2. **View Screenshot** to see page state at failure
3. **Play Video** to see action sequence leading to failure
4. **Check Stack Trace** for error details

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Playwright tests
  run: npm test

- name: Upload Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

### Jenkins Example
```groovy
stage('Test') {
  steps {
    sh 'npm test'
  }
  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])
    }
  }
}
```

## Report Retention

Reports are generated in `playwright-report/` and overwrite previous reports. To keep multiple reports:

```bash
# Create timestamped backup
mv playwright-report playwright-report-$(date +%Y%m%d-%H%M%S)

# Run tests (generates new report)
npm test
```

## Troubleshooting

### Report Not Opening
1. Check if report exists: `playwright-report/index.html`
2. Manually open with: `npm run test:report`
3. Check browser permissions

### Report Data Incomplete
1. Run tests again: `npm test`
2. Ensure tests completed without interruption
3. Check that `playwright-report/` directory exists

### Videos Not Playing
1. Videos only recorded on retry (trace: 'on-first-retry')
2. Force retry with: `npx playwright test --retries 2`
3. Or enable for all tests in playwright.config.ts

## Performance Tips

### Reduce Report Size
```typescript
// In playwright.config.ts
trace: 'off'  // Disable trace recording
```

### Optimize Report View
- Use filtering to focus on failed tests
- Close unnecessary browser tabs
- Export data for analysis

## Advanced Usage

### Generate JSON Report
```bash
npx playwright test --reporter json > results.json
```

### Custom Report Format
```bash
npx playwright test --reporter html --reporter json --reporter list
```

### Merge Multiple Reports
```bash
npx playwright merge-reports ./report-1 ./report-2 --output-folder ./final-report
```

## Best Practices

1. ✅ **Review Reports After Each Run**
   - Identify flaky tests
   - Find patterns in failures

2. ✅ **Use Timelined Reports**
   - Understand test execution flow
   - Optimize slow tests

3. ✅ **Check Artifacts**
   - Screenshots reveal state issues
   - Videos show interaction problems

4. ✅ **Archive Important Reports**
   - Keep reports from releases
   - Compare for regression analysis

5. ✅ **Share Reports**
   - ZIP and share with team
   - Use for bug documentation

## Example Workflow

```bash
# 1. Run all tests (report auto-opens)
npm test

# 2. Review report in browser
# - Check failed tests
# - Watch videos of failures
# - Review screenshots

# 3. If needed, run specific suite again
npm run test:home

# 4. View updated report
npm run test:report

# 5. Share or archive
# - Copy playwright-report/ folder
# - Share with team
```

## Support & Resources

- **Playwright Docs**: https://playwright.dev/docs/test-reporters
- **Report Features**: https://playwright.dev/docs/test-reporters#html-reporter
- **Configuration**: Check `playwright.config.ts`

---

**Report Generation**: Automatic on every test run
**Report Location**: `playwright-report/index.html`
**View Command**: `npm run test:report`
**Last Updated**: April 30, 2026
