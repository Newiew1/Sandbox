# ⚡ GitHub Actions Quick Setup Guide

## What Was Created

✅ **Workflow File**: `.github/workflows/test.yml`  
✅ **Detailed Guide**: `CI_CD_WORKFLOW_GUIDE.md`

---

## 🚀 Getting Started (5 minutes)

### Step 1: Push to GitHub
```bash
git add .github/workflows/test.yml
git commit -m "Add GitHub Actions CI/CD workflow"
git push origin changes
```

### Step 2: Enable GitHub Pages
1. Go to GitHub → Your Repo → Settings
2. Scroll to "Pages" section
3. Source: Select "GitHub Actions"
4. Save

### Step 3: (Optional) Set Environment Variables
If using staging environment:

1. Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `BASE_URL`
4. Value: `https://staging.cnarios.com`
5. Save

### Step 4: Trigger Workflow
- **Option A**: Push code to main
- **Option B**: Go to Actions → Test Suite → "Run workflow" button

---

## 📊 What Happens Next

### When You Push Code:
1. ✅ GitHub detects push
2. ✅ Workflow starts automatically
3. ✅ Tests run on 4 combinations:
   - Chromium + Node 18
   - Chromium + Node 20
   - Edge + Node 18
   - Edge + Node 20
4. ✅ All run in parallel (~3 minutes)
5. ✅ Allure report generated
6. ✅ Report published to GitHub Pages
7. ✅ Results shown in PR/Push

---

## 🎯 Key Features

| Feature | What It Does | Benefit |
|---------|-------------|---------|
| **Matrix Testing** | Tests multiple browser/Node combinations | Catch compatibility issues |
| **Parallel Execution** | 4 tests run simultaneously | 3 min instead of 12 min |
| **Auto-retry** | Fails only after 2 attempts | Reduces flaky test failures |
| **Artifact Storage** | Keeps results for 30 days | Historical analysis |
| **Screenshots/Videos** | Captures failures | Easy debugging |
| **Allure Reports** | Beautiful test dashboard | Team visibility |
| **GitHub Pages** | Public report hosting | Share with stakeholders |
| **PR Checks** | Status on pull requests | Merge gate |

---

## 📍 Where to Find Results

### GitHub Actions Tab
```
Repo → Actions → [Latest Workflow Run]
├── Real-time test progress
├── Detailed logs for each step
└── Artifacts tab (download results)
```

### Pull Request
```
Repo → Pull Requests → [Your PR]
├── Checks section shows test status
└── Click "Details" for full logs
```

### GitHub Pages (Allure Report)
```
https://Newiew1.github.io/Sandbox/
- Interactive test dashboard
- Results by browser
- Historical trends
- Test statistics
```

---

## 🔍 Understanding the Workflow

### Four Test Runs (Parallel)

```
┌──────────────────────────────────────────────────┐
│  GitHub Actions: Test Suite                      │
├──────────────────────────────────────────────────┤
│                                                  │
│  Run 1: Chromium + Node 18       ──┐            │
│  Run 2: Chromium + Node 20       ──┤ Parallel   │
│  Run 3: Edge + Node 18           ──┤ (all at   │
│  Run 4: Edge + Node 20           ──┘ once)     │
│                                                  │
│  Total Time: ~3 minutes (not 12!)               │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Workflow Steps

Each test run performs these steps:

1. **Checkout** - Download code
2. **Setup Node** - Install Node.js
3. **Install Deps** - npm packages
4. **Install Browsers** - Chromium/Edge
5. **Run Tests** - Execute Playwright tests
6. **Upload Results** - Save test artifacts
7. **Upload Screenshots** - Save failure media

---

## 🧪 Test Execution Flow

```
Developer pushes code
         ↓
GitHub detects push
         ↓
Workflow triggered
         ↓
4 test jobs start (parallel)
         ↓
All tests run simultaneously
         ↓
Results collected
         ↓
Allure report generated
         ↓
Report published to GitHub Pages
         ↓
Summary posted to GitHub Actions
         ↓
✅ Complete! (Check Actions tab)
```

---

## 📱 Viewing Results

### From Actions Tab

1. GitHub → Actions
2. Click "Test Suite" workflow
3. Click latest run
4. View:
   - **Jobs**: See which browser/Node combo
   - **Artifacts**: Download test results
   - **Logs**: See step details

### From Pull Request

1. GitHub → Pull Requests
2. Click your PR
3. Scroll to "Checks" section
4. See test status per browser/version
5. Click "Details" for logs

### From GitHub Pages

1. Visit: https://Newiew1.github.io/Sandbox/
2. View interactive Allure report
3. See test breakdown by:
   - Status (passed/failed)
   - Browser used
   - Time taken
   - Commit info

---

## ⚙️ Customization

### Change Test Triggers

To NOT run on PRs (only on push to main):

```yaml
on:
  push:
    branches: [main]
  # Remove pull_request section
```

### Add More Browsers

To include Firefox:

```yaml
matrix:
  browser: [chromium, 'Microsoft Edge', firefox]
```

### Change Schedule

To run tests every 6 hours instead of nightly:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours
```

### Customize Retention

Change artifact retention from 30 to 7 days:

```yaml
retention-days: 7
```

---

## 🚨 Common Issues & Fixes

### ❌ "GitHub Pages not publishing"

**Fix:**
1. Settings → Pages
2. Select "GitHub Actions" as source
3. Save
4. Re-run workflow

### ❌ "Tests fail in CI but pass locally"

**Causes:**
- Different environment
- Timing issues
- Browser-specific bugs

**Fixes:**
- Set `BASE_URL` secret if using staging
- Add explicit waits in tests
- Test locally with `npm run test:both`

### ❌ "Artifacts not showing"

**Fix:**
- Wait for workflow to complete
- Check "Artifacts" tab
- Artifacts expire after retention-days

### ❌ "Report shows old results"

**Fix:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check GitHub Actions for latest run time

---

## 📈 What's Happening Behind the Scenes

### When Tests Run:

1. **GitHub's Linux VM** spins up
2. **Downloads** your repository
3. **Installs** Node.js and Playwright
4. **Runs** 120+ tests
5. **Captures** screenshots/videos of failures
6. **Generates** Allure reports
7. **Uploads** results to artifact storage
8. **Deploys** report to GitHub Pages
9. **Posts** summary to Actions tab

### Time Breakdown:

```
Setup (checkout, Node, deps):    ~30 seconds
Install browsers:                 ~1 minute
Run tests (parallel):             ~2 minutes
Generate reports:                 ~30 seconds
Deploy to Pages:                  ~1 minute
────────────────────────────────
Total:                            ~5 minutes
```

---

## 🔐 Security Notes

### GitHub Secrets

Never commit passwords/tokens. Use Secrets:

```yaml
# ❌ BAD - Never do this
BASE_URL: https://user:pass@staging.com

# ✅ GOOD - Use GitHub Secrets
BASE_URL: ${{ secrets.BASE_URL }}
```

### Artifact Storage

- Artifacts stored securely in GitHub
- Automatically deleted after retention period
- Only accessible to repo members

---

## 📚 Learn More

- Full guide: [CI_CD_WORKFLOW_GUIDE.md](CI_CD_WORKFLOW_GUIDE.md)
- Workflow file: [.github/workflows/test.yml](.github/workflows/test.yml)
- GitHub Actions docs: https://docs.github.com/actions
- Playwright docs: https://playwright.dev
- Allure docs: https://docs.qameta.io/allure/

---

## ✅ Next Steps

1. **Push the workflow file**
   ```bash
   git push origin changes
   ```

2. **Enable GitHub Pages** in Settings

3. **Set secrets** if using staging environment

4. **Trigger manual run** from Actions tab

5. **View results** in GitHub Pages

6. **Celebrate!** 🎉 Your CI/CD is live!

---

**Questions?** Check [CI_CD_WORKFLOW_GUIDE.md](CI_CD_WORKFLOW_GUIDE.md) for detailed explanations of each step.
