# Deploy Landing Page to Vercel

> Task ID: deploy-vercel-lp
> Agent: Premium Design (Dark Premium Theme Transformer)
> Version: 1.0.0

## Description

Deploy the completed premium landing page to Vercel as a static site. Runs build verification, environment setup, Vercel CLI deployment, DNS validation, and a post-deploy performance audit. Produces a live URL and deployment report.

## Execution Type

Worker (deterministic deployment steps)

- No elicitation required — all inputs are derived from the build output
- Follows a fixed sequence: verify, configure, deploy, validate, report
- Fails fast on any blocking issue (missing CLI, broken build, deploy error)

## Prerequisites

- Completed LP HTML file in `outputs/premium-design/{template}/index.html`
- Vercel CLI installed (`vercel --version`)
- Vercel account authenticated (`vercel whoami`)
- Node.js >= 18 available

## Workflow

### Steps

1. **Verify Build Artifacts**
   - Check output directory exists and contains `index.html`
   - Validate HTML is well-formed (no unclosed tags, no remaining `{{}}` placeholders)
   - Check all referenced assets exist (images, fonts, CSS files)
   - Measure total bundle size (target: < 500KB for static LP)
   - Validation: All files present, HTML valid, bundle within limit

2. **Prepare Environment**
   - Verify Vercel CLI is installed and authenticated
   - Check for existing `vercel.json` in output directory; create if missing:
     ```json
     {
       "version": 2,
       "builds": [{ "src": "**/*", "use": "@vercel/static" }],
       "routes": [{ "src": "/(.*)", "dest": "/$1" }]
     }
     ```
   - Set project name from template name or user override
   - Validation: CLI ready, config present

3. **Deploy to Vercel**
   - Run: `vercel --prod --yes` from the output directory
   - Capture deployment URL from CLI output
   - Wait for deployment to reach "Ready" state
   - Validation: Deployment URL returned, status is "Ready"

4. **Validate Live Site**
   - HTTP GET to deployment URL — expect 200 status
   - Check Content-Type is `text/html`
   - Verify page title matches expected LP title
   - Check no mixed content warnings (HTTP resources on HTTPS)
   - Validation: Site loads correctly, no errors

5. **Performance Audit**
   - Measure page load time (target: < 3s on 3G)
   - Check total transfer size (target: < 500KB)
   - Verify images are optimized (no uncompressed PNGs > 200KB)
   - Check font loading strategy (display: swap or preload)
   - Validation: Performance within acceptable thresholds

6. **Generate Deployment Report**
   - Save report to `outputs/premium-design/{template}/deploy-report.yaml`
   - Include: URL, timestamp, bundle size, performance metrics, status
   - Validation: Report file created and complete

## Output

- **Live URL**: Production Vercel URL (e.g., `https://project-name.vercel.app`)
- **deploy-report.yaml**: Deployment metadata and performance metrics
- **Console summary**: URL + key metrics for immediate use

### Output Format

```yaml
deployment:
  url: "https://project-name.vercel.app"
  project: "project-name"
  timestamp: "2026-03-20T14:30:00Z"
  status: "Ready"
  region: "iad1"

build:
  source_dir: "outputs/premium-design/nocturne-cian/"
  total_files: 3
  total_size_kb: 287
  html_valid: true
  placeholders_remaining: 0

performance:
  page_load_ms: 1200
  transfer_size_kb: 245
  largest_asset: "photo.png (98KB)"
  font_strategy: "display-swap"

validation:
  http_status: 200
  content_type: "text/html"
  mixed_content: false
  title_match: true
```

## Success Criteria

- [ ] Build artifacts verified (HTML valid, assets present)
- [ ] Vercel CLI authenticated and configured
- [ ] Deployment completed with production URL
- [ ] Live site returns HTTP 200 with correct content
- [ ] Performance within thresholds (< 3s load, < 500KB transfer)
- [ ] Deployment report generated and saved

## Error Handling

- **Vercel CLI not installed**: Exit with install command (`npm i -g vercel`)
- **Not authenticated**: Exit with auth command (`vercel login`)
- **Build artifacts missing**: Exit with message pointing to expected output directory
- **Deployment failed**: Display Vercel error output, suggest checking logs (`vercel logs`)
- **Site returns non-200**: Warn user, include status code in report, suggest manual check
- **Performance below threshold**: Log warning in report but do not block deployment

## Security Considerations

- No secrets stored in deployed files
- Vercel token managed by CLI (not exposed)
- Deployment uses `--prod` flag for production URL stability
- No server-side code deployed (static only)
- Validate no `.env` or credential files in output directory before deploy

## Notes

- This task is Phase 5 of the Premium LP pipeline
- Input comes from the LP generation/transformation phase
- Output URL feeds into the WhatsApp notification task (`notify-whatsapp-lp`)
- Can be triggered standalone via `*deploy` or as part of `*full-pipeline`
- Vercel free tier supports custom domains if user configures DNS
