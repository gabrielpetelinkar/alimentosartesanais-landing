# Transcribe and Structure LP Brief

> Task ID: transcribe-lp-brief
> Agent: Premium Design (Dark Premium Theme Transformer)
> Version: 1.0.0

## Description

Transcribe and structure a landing page brief from client input — voice notes, text messages, documents, or any unstructured source. Uses AI transcription (Whisper) for audio and LLM extraction for all formats, then validates the structured output against the LP brief extraction schema.

## Execution Type

Hybrid (AI transcription + human validation)

- Audio inputs: FFmpeg conversion + OpenAI Whisper API transcription
- Text inputs: Direct LLM extraction from raw text
- Document inputs: Parse and extract relevant fields
- All modes: Human validation of extracted fields before proceeding

## Prerequisites

- Client input in any format (audio file, text message, document, inline chat)
- For audio: FFmpeg installed (`ffmpeg -version`), OpenAI API key set (`$OPENAI_API_KEY`)
- Schema reference: `squads/design/templates/lp-brief-extraction-schema.yaml`
- Automation schema: `squads/design/templates/automation-input-schema.yaml`

## Workflow

### Interactive Elicitation

1. **Identify Input Mode**
   - Detect input type: audio file path, pasted text, or document path
   - If no input provided, ask user which mode to use
   - Confirm input is accessible and readable

2. **Validate Input**
   - Audio: Check file exists, verify format (mp3, wav, m4a, ogg, webm)
   - Text: Confirm sufficient content to extract LP fields
   - Document: Check file exists, detect format (pdf, docx, txt, md)

### Steps

1. **Convert Audio (audio mode only)**
   - Convert input to WAV 16kHz mono using FFmpeg
   - Command: `ffmpeg -i {input} -ar 16000 -ac 1 -f wav {output.wav}`
   - Validation: Output file exists and is non-empty

2. **Transcribe Audio (audio mode only)**
   - Send WAV to OpenAI Whisper API (model: whisper-1)
   - Language: auto-detect (or user-specified)
   - Validation: Transcription returned, non-empty text

3. **Extract LP Fields**
   - Parse transcription/text/document using LLM extraction
   - Extract fields per `lp-brief-extraction-schema.yaml`:
     - **target_audience**: Who the LP is for (demographics, pain points)
     - **value_proposition**: Core promise, unique selling point
     - **key_features**: List of features/benefits to highlight (min 3)
     - **tone_and_brand**: Voice, personality, brand keywords
     - **ctas**: Primary and secondary calls-to-action
     - **constraints**: Budget, deadline, platform, must-haves, must-avoids
     - **social_proof**: Testimonials, numbers, credentials (if mentioned)
     - **pricing**: Price points, anchoring, urgency elements (if mentioned)
   - Mark fields as `extracted` (from source) or `inferred` (AI suggestion)
   - Validation: All required fields populated

4. **Present Extracted Brief**
   - Display structured brief in readable format
   - Highlight inferred fields (need human confirmation)
   - Flag missing critical fields
   - Ask user to validate, correct, or supplement

5. **Finalize Brief Document**
   - Apply user corrections
   - Generate final structured brief (YAML format)
   - Save to: `outputs/premium-design/{project}/lp-brief.yaml`
   - Validation: All required fields present and validated

## Output

- **lp-brief.yaml**: Structured LP brief document ready for design/copy phase
- **transcript.txt**: Raw transcription (audio mode only)
- **Console summary**: Key fields extracted with confidence indicators

### Output Format

```yaml
lp_brief:
  metadata:
    source_type: "audio" | "text" | "document"
    source_file: "{original input path}"
    transcribed_at: "2026-03-20T12:00:00Z"
    validated_by: "human"

  target_audience:
    primary: "Description of primary audience"
    pain_points:
      - "Pain point 1"
      - "Pain point 2"
    demographics: "Age, location, profession, etc."

  value_proposition:
    headline: "Core promise in one sentence"
    subheadline: "Supporting statement"
    differentiator: "What makes this unique"

  key_features:
    - name: "Feature 1"
      benefit: "Why it matters"
    - name: "Feature 2"
      benefit: "Why it matters"
    - name: "Feature 3"
      benefit: "Why it matters"

  tone_and_brand:
    voice: "Professional, bold, friendly, etc."
    personality: "Brand personality keywords"
    keywords: ["keyword1", "keyword2"]

  ctas:
    primary:
      text: "CTA button text"
      action: "URL or action"
    secondary:
      text: "Secondary CTA text"
      action: "URL or action"

  constraints:
    deadline: "Date or timeframe"
    platform: "Where the LP will live"
    must_haves: ["requirement 1", "requirement 2"]
    must_avoids: ["constraint 1", "constraint 2"]

  social_proof:
    testimonials: []
    numbers: []
    credentials: []

  pricing:
    amount: null
    anchor: null
    urgency: null
```

## Success Criteria

- [ ] Input detected and processed correctly (audio, text, or document)
- [ ] Audio transcription accurate (if audio mode)
- [ ] All required LP fields extracted (target_audience, value_proposition, key_features, tone_and_brand, ctas)
- [ ] Inferred fields clearly marked for human validation
- [ ] User validated and approved final brief
- [ ] Structured YAML output saved and schema-compliant

## Error Handling

- **Audio file not found**: Exit with clear message, suggest checking path
- **FFmpeg not installed**: Warn user, provide install command (`brew install ffmpeg`)
- **OpenAI API key missing**: Warn user, suggest setting `$OPENAI_API_KEY`
- **Transcription failed**: Retry once, then suggest manual text input as fallback
- **Insufficient content**: Flag missing fields, ask user to supplement
- **Schema validation failed**: Show which fields are missing/invalid, ask for corrections

## Security Considerations

- Audio files processed locally (FFmpeg) before API call
- API key never logged or displayed
- Client data not persisted beyond output directory
- Transcriptions stored locally only
- Validate file paths to prevent directory traversal

## Notes

- This task is Phase 0 of the Premium LP pipeline
- Output feeds into the copy/content generation phase
- Can be triggered standalone or as part of `*full-pipeline`
- Supports Portuguese and English audio/text natively
- For best results, client briefs should mention at minimum: who the LP targets and what it sells
