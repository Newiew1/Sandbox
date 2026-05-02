# 🚀 GitHub Actions Workflow - Step-by-Step Explanation

## Overview

Your GitHub Actions workflow automates testing across multiple browsers and Node versions, generates reports, and deploys them to GitHub Pages.

**File Location**: `.github/workflows/test.yml`

---

## 📋 SECTION 1: Workflow Triggers

```yaml
on:
  push:
    branches: [main, develop, changes, 'feature/**']
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:
```

### What This Does:
| Trigger | When It Runs | Use Case |
|---------|------------|----------|
| **push** | Every time code is pushed | Catch issues immediately |
| **pull_request** | Every PR to main | Review code before merge |
| **schedule** | Every night at 2 AM UTC | Regular regression testing |
| **workflow_dispatch** | Manual GitHub UI click | On-demand test runs |

### Example Flows:
```
Developer pushes code → GitHub detects push → Workflow starts
Developer creates PR → GitHub detects PR → Workflow starts  
Scheduled time arrives → Workflow starts automatically
Developer clicks "Run workflow" in UI → Workflow starts manually
```

---

## 🔄 SECTION 2: Concurrency Control

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### What This Does:
- **Groups** workflows by branch name
- **Cancels** older runs if new push arrives
- **Prevents** duplicate executions

### Example:
```
Developer pushes code A → Workflow starts (run #1)
Developer pushes code B (1 sec later) → Run #1 is CANCELLED
                                      → Workflow starts (run #2)
```

**Why?** Saves time and GitHub resources

---

## 🧪 SECTION 3: Test Job - Matrix Strategy

```yaml
strategy:
  fail-fast: false
  matrix:
    browser: [chromium, 'Microsoft Edge']
    node-version: [18.x, 20.x]
```

### What This Does:
Creates **4 parallel test runs**:

| Browser | Node Version | Test Run |
|---------|-------------|----------|
| Chromium | 18.x | Run 1 |
| Chromium | 20.x | Run 2 |
| Edge | 18.x | Run 3 |
| Edge | 20.x | Run 4 |

### Timeline:
```
Time 0:00 ──► All 4 runs start SIMULTANEOUSLY
Time 3:00 ──► All 4 runs complete (in parallel)
```

**Without parallel**: 12 minutes  
**With parallel**: 3 minutes ⚡

### fail-fast: false
- If Run 1 fails, Runs 2-4 still execute
- You get full picture of all issues
- Better for debugging

---

## 🔧 SECTION 4: Step-by-Step Test Execution

### **STEP 1: Checkout Repository**
```yaml
- name: 📥 Checkout repository
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

**What it does:**
- Downloads your code from GitHub to the runner
- `fetch-depth: 0` = download full git history
- Used for better commit information in reports

**Example:**
```
GitHub Repository (cloud)
         ↓ (download)
    GitHub Runner (temporary VM)
         ↓
Your code ready for testing
```

---

### **STEP 2: Setup Node.js**
```yaml
- name: 🔧 Setup Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v4
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
```

**What it does:**
- Installs Node.js (version from matrix: 18.x or 20.x)
- Sets up npm package manager
- **cache: 'npm'** = caches node_modules from previous runs
  
**Performance Impact:**
- First run: 1 minute (download + cache)
- Subsequent runs: 10 seconds (use cache) ⚡

**Why two versions?**
- Ensures tests work on different Node versions
- Catches version-specific bugs

---

### **STEP 3: Install Dependencies**
```yaml
- name: 📦 Install dependencies
  run: npm ci
```

**What it does:**
- Installs packages from package.json
- `npm ci` vs `npm install`:
  - `npm install`: Flexible versions, can cause inconsistencies
  - `npm ci`: Exact versions from lock file, reliable for CI ✅

**Example:**
```
package-lock.json (locked versions)
         ↓
    npm ci (exact install)
         ↓
Exact same dependencies every time
```

---

### **STEP 4: Install Playwright Browsers**
```yaml
- name: 🌐 Install Playwright browsers
  run: npx playwright install --with-deps
```

**What it does:**
1. Downloads Chromium binary
2. Downloads Microsoft Edge binary
3. Installs system dependencies (`--with-deps`)

**System dependencies include:**
- Fonts
- Library dependencies
- Graphics libraries

**Why separate?** 
- Takes time, better to cache separately
- Only runs once per GitHub Actions update

---

### **STEP 5: Run Tests**
```yaml
- name: 🧪 Run Playwright tests
  run: npm test -- --project=${{ matrix.browser }}
  env:
    CI: true
    BASE_URL: ${{ secrets.BASE_URL || 'https://www.cnarios.com' }}
```

**What it does:**
1. Executes: `npm test -- --project=chromium` (for Chromium)
2. Sets environment variables
3. `CI=true` triggers from playwright.config.ts:
   - 5 parallel workers
   - 2 retries on failure
   - Optimized for CI environment

**BASE_URL handling:**
- First checks GitHub Secrets (private, secure)
- Falls back to production URL if not set
- You can override in Settings → Secrets

**How to set GitHub Secrets:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `BASE_URL`
4. Value: `https://staging.cnarios.com` (or your staging URL)

---

### **STEP 6: Upload Test Results**
```yaml
- name: 📤 Upload test results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-results-${{ matrix.browser }}-node-${{ matrix.node-version }}
    path: |
      test-results/
      playwright-report/
    retention-days: 30
```

**What it does:**
1. Uploads test results as artifacts
2. Name: `test-results-chromium-node-18.x` (includes browser + version)
3. Includes HTML reports and test data
4. **if: always()** = uploads even if tests fail
5. **retention-days: 30** = keeps for 30 days then deletes

**Where to find:**
- GitHub → Actions → [Workflow Run] → Artifacts tab
- Download to view locally

---

### **STEP 7 & 8: Upload Screenshots and Videos**
```yaml
- name: 📸 Upload failure artifacts
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: failure-artifacts-${{ matrix.browser }}-node-${{ matrix.node-version }}
    path: |
      test-results/**/test-failed-*.png
      test-results/**/video.webm
    retention-days: 7
```

**What it does:**
1. Uploads failure screenshots and videos
2. **if: failure()** = only if tests failed
3. Keep only 7 days (to save storage)
4. Helps debug failures quickly

---

## 📊 SECTION 5: Allure Report Job

```yaml
allure-report:
  name: 📊 Generate Allure Report
  if: always()
  needs: test
  runs-on: ubuntu-latest
```

**What it does:**
1. Waits for test job to complete
2. **needs: test** = runs AFTER test job
3. **if: always()** = runs even if tests fail
4. Runs on separate Ubuntu VM

### Steps in Allure Report Job:

#### **5A: Download Allure Results**
```yaml
- name: ⬇️ Download Allure results
  uses: actions/download-artifact@v4
  with:
    path: allure-reports
    pattern: allure-results-*
```

**What it does:**
- Downloads results from all test runs (chromium + edge, node 18 + 20)
- Pattern `allure-results-*` matches all artifacts starting with that
- Consolidates into single `allure-reports/` folder

---

#### **5B: Setup Java (for Allure)**
```yaml
- name: ☕ Setup Java for Allure
  uses: actions/setup-java@v4
  with:
    distribution: 'temurin'
    java-version: '11'
```

**Why Java?**
- Allure Report generator requires Java runtime
- `temurin` = reliable, free Java distribution

---

#### **5C: Generate HTML Report**
```yaml
- name: 🎨 Generate Allure HTML Report
  run: |
    mkdir -p allure-results
    find allure-reports -name "*.json" -type f | xargs -I {} cp {} allure-results/
    npx allure generate allure-results -o allure-report --clean
```

**What it does:**
1. Create empty `allure-results/` folder
2. Find all `.json` files in `allure-reports/` (from all test runs)
3. Copy them to single folder (consolidate)
4. Generate HTML report:
   ```
   allure generate [input] -o [output] --clean
   [input]: allure-results/ (consolidated test data)
   [output]: allure-report/ (HTML report)
   --clean: start fresh (no history)
   ```

**Output Structure:**
```
allure-report/
  ├── index.html (main report page)
  ├── css/
  ├── js/
  └── data/ (test data)
```

---

#### **5D & 5E: Upload and Deploy Report**
```yaml
- name: 📤 Upload Allure report
  uses: actions/upload-artifact@v4
  
- name: 🚀 Deploy Allure Report to GitHub Pages
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  uses: actions/upload-pages-artifact@v3
  with:
    path: allure-report/
```

**What it does:**
1. Upload report as artifact (30-day backup)
2. Deploy to GitHub Pages if:
   - Branch is `main`
   - Event is `push` (not PR)

---

## 🌐 SECTION 6: GitHub Pages Deployment

```yaml
deploy-pages:
  name: 🌐 Publish to GitHub Pages
  if: github.ref == 'refs/heads/main' && success()
  needs: allure-report
  permissions:
    pages: write
    id-token: write
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
```

**What it does:**
1. Deploys allure-report to GitHub Pages
2. Makes it publicly accessible via URL
3. Only on successful main push

**Your URL will be:**
```
https://Newiew1.github.io/Sandbox/
```

**How to enable:**
1. GitHub → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages" (auto-created by GitHub Actions)
4. Save

---

## ✅ SECTION 7: Status Check Job

```yaml
status-check:
  name: ✅ Test Status Check
  if: always()
  needs: [test, allure-report]
```

**What it does:**
1. Checks if test job succeeded or failed
2. Posts summary to GitHub Actions UI
3. Runs last (after all other jobs)

### Output Example:
```
✅ Test Execution Summary

- Test Job Status: success
- Report Job Status: success
- Branch: main
- Commit: abc1234def567

Reports:
- [Allure Report](https://github.com/...)
- Artifacts tab for detailed results
```

---

## 🔄 Complete Workflow Timeline

```
Developer pushes code to main
          ↓
GitHub detects push → Workflow triggered
          ↓
┌─────────────────────────────────────┐
│  Test Job (4 parallel runs)         │
│  ├─ Chromium + Node 18              │ ─────┐
│  ├─ Chromium + Node 20              │      │ All run
│  ├─ Edge + Node 18                  │      │ simultaneously
│  └─ Edge + Node 20                  │ ─────┘ (3 min)
└─────────────────────────────────────┘
          ↓ (all complete)
┌─────────────────────────────────────┐
│  Allure Report Job                  │
│  - Downloads results from test job  │
│  - Generates HTML report            │ (30 sec)
│  - Uploads to artifact storage      │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Deploy to GitHub Pages             │
│  - Publishes allure report online   │ (1 min)
│  - Makes URL public                 │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Status Check Job                   │
│  - Posts summary                    │ (10 sec)
│  - Shows results in UI              │
└─────────────────────────────────────┘
          ↓
Total Time: ~5 minutes (mostly parallel)
Reports available: GitHub Pages + Artifacts
```

---

## 📱 Where to View Results

### **1. GitHub Actions UI**
- GitHub → Actions → [Latest Workflow Run]
- View real-time test progress
- See logs for each step
- Download artifacts

### **2. Pull Request**
- GitHub → [Your PR]
- Checks section shows test status
- Click "Details" to see logs

### **3. GitHub Pages (Allure Report)**
- https://Newiew1.github.io/Sandbox/
- Beautiful interactive test report
- Breakdown by browser/status
- Historical trending

### **4. Artifacts Tab**
- Test reports
- Screenshots
- Videos of failed tests
- Raw test data

---

## 🚨 Troubleshooting

### Tests fail in CI but pass locally?

**Common causes:**
1. Different environment (staging vs local)
   - **Fix**: Set BASE_URL secret
   
2. Timing issues (tests too fast for page)
   - **Fix**: Add explicit waits
   
3. Browser differences
   - **Fix**: Test with `npm run test:both`

### Report not published to GitHub Pages?

**Check:**
1. Settings → Pages enabled
2. Branch set to "gh-pages"
3. Workflow ran on main branch
4. Tests passed (not on PR)

### Artifacts not showing?

**Check:**
1. Workflow completed
2. Click "Artifacts" tab
3. Downloads expire after retention-days

---

## 🎯 Quick Reference

| Task | How to Do It |
|------|-------------|
| **Run tests manually** | Actions → Test Suite → "Run workflow" |
| **View test results** | Actions → [Workflow] → Artifacts tab |
| **View Allure report** | https://Newiew1.github.io/Sandbox/ |
| **Set environment vars** | Settings → Secrets → New secret |
| **See test logs** | Actions → [Workflow] → Jobs → Steps |
| **Download artifacts** | Artifacts tab → Download button |
| **Check test status on PR** | PR → Checks section |

---

## 🔐 GitHub Secrets Setup

**To use different BASE_URL for staging:**

1. Go to GitHub Repo
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `BASE_URL`
5. Value: `https://staging.cnarios.com`
6. Save

Workflow will use this automatically on next run.

---

## 📈 Next Steps

1. **Push this workflow file** to GitHub
2. **Enable GitHub Pages** in Settings
3. **Run first test**: Manually trigger or push code
4. **View reports** in Actions tab and GitHub Pages
5. **Set secrets** if using staging environment
6. **Customize retention** if needed (currently 30 days)

