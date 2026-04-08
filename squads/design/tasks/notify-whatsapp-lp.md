# Notify Client via WhatsApp

> Task ID: notify-whatsapp-lp
> Agent: Premium Design (Dark Premium Theme Transformer)
> Version: 1.0.0

## Description

Send a WhatsApp notification to the client when the premium landing page is deployed. Composes a message with the live URL, a preview screenshot, and key metrics from the deployment report. Sends via the UazAPI WhatsApp integration.

## Execution Type

Worker (deterministic notification steps)

- No elicitation required — all data comes from the deploy report and LP metadata
- Follows a fixed sequence: compose, capture screenshot, send, confirm
- Fails fast on missing API credentials or invalid phone number

## Prerequisites

- Deployed LP with live URL (from `deploy-vercel-lp` task)
- Deployment report at `outputs/premium-design/{template}/deploy-report.yaml`
- UazAPI credentials: `$UAZAPI_BASE_URL` and `$UAZAPI_TOKEN` environment variables set
- Client phone number (with country code, e.g., `5511999887766`)

## Workflow

### Steps

1. **Load Deployment Data**
   - Read `deploy-report.yaml` from the output directory
   - Extract: live URL, deployment timestamp, bundle size, performance metrics
   - Extract LP metadata: template name, tier, project name
   - Validation: Report file exists and contains valid URL

2. **Capture Preview Screenshot**
   - Use Playwright to navigate to the live URL
   - Capture full-page screenshot at 1200x630 viewport (OG image ratio)
   - Save screenshot to `outputs/premium-design/{template}/preview.png`
   - Optimize: compress to < 200KB if needed
   - Validation: Screenshot file exists and is non-empty

3. **Compose Notification Message**
   - Build message using template:
     ```
     LP Premium pronta!

     {project_name} — Template: {template_name} | Tier: {tier}

     URL: {live_url}

     Metricas:
     - Tamanho: {bundle_size_kb}KB
     - Carregamento: {load_time_ms}ms
     - Status: {status}

     Deploy: {timestamp}
     ```
   - Attach preview screenshot as image
   - Validation: Message non-empty, URL present

4. **Send via UazAPI**
   - Format phone number: ensure country code prefix, strip special characters
   - Send text message via UazAPI endpoint:
     ```
     POST {UAZAPI_BASE_URL}/message/send-text
     Headers: { "Authorization": "Bearer {UAZAPI_TOKEN}" }
     Body: { "phone": "{number}", "message": "{composed_message}" }
     ```
   - Send image (preview screenshot) via UazAPI endpoint:
     ```
     POST {UAZAPI_BASE_URL}/message/send-image
     Headers: { "Authorization": "Bearer {UAZAPI_TOKEN}" }
     Body: { "phone": "{number}", "image": "{base64_or_url}", "caption": "Preview da LP" }
     ```
   - Validation: API returns 200/201 status for both requests

5. **Confirm Delivery**
   - Log delivery status from API response
   - Save notification record to `outputs/premium-design/{template}/notification-log.yaml`
   - Validation: Confirmation logged

## Output

- **notification-log.yaml**: Record of notification sent (timestamp, recipient, status)
- **preview.png**: Screenshot used in the notification
- **Console summary**: Confirmation message with delivery status

### Output Format

```yaml
notification:
  recipient: "5511999887766"
  sent_at: "2026-03-20T15:00:00Z"
  status: "delivered"
  message_id: "msg_abc123"

  content:
    text_sent: true
    image_sent: true
    url_included: "https://project-name.vercel.app"

  api:
    text_response_code: 200
    image_response_code: 200
    provider: "UazAPI"
```

## Success Criteria

- [ ] Deployment data loaded from report file
- [ ] Preview screenshot captured at OG image ratio (1200x630)
- [ ] Message composed with live URL and key metrics
- [ ] Text message sent successfully via UazAPI (HTTP 200/201)
- [ ] Image message sent successfully via UazAPI (HTTP 200/201)
- [ ] Notification log saved with delivery confirmation

## Error Handling

- **Deploy report missing**: Exit with message to run `*deploy` first
- **UazAPI credentials missing**: Exit with message listing required env vars (`$UAZAPI_BASE_URL`, `$UAZAPI_TOKEN`)
- **Invalid phone number**: Warn user, suggest format `{country_code}{area_code}{number}` (e.g., `5511999887766`)
- **Screenshot capture failed**: Send text-only notification, log warning
- **API request failed**: Display error response, suggest checking UazAPI dashboard
- **Rate limit hit**: Wait and retry once after 5 seconds, then fail with message

## Security Considerations

- UazAPI token never logged or displayed in output
- Phone numbers stored only in notification log (local)
- Preview screenshots contain only publicly deployed content
- API calls use HTTPS exclusively
- Validate phone number format before sending (prevent injection)

## Notes

- This task is Phase 6 (final) of the Premium LP pipeline
- Input comes from the Vercel deployment task (`deploy-vercel-lp`)
- Can be triggered standalone via `*notify {number}` or as part of `*full-pipeline`
- UazAPI is the WhatsApp Business API provider used by this squad
- If Playwright is unavailable for screenshot, falls back to text-only notification
