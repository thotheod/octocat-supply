# Model Comparison Table

This comparison is generated using the custom prompt file [model-compare.prompt.md](../.github/prompts/model-compare.prompt.md).

To regenerate for your environment, run the prompt in VS Code (Command Palette → `Prompts: Run Prompt` → select `model-compare.prompt.md`).

> [!NOTE]
> Model availability and multipliers change frequently. This document was last refreshed on **2025-12-22** using the linked GitHub Docs.

Legend: ✅ GA • 🚧 Preview • 👓 Vision • 🧠 Reasoning • 🤖 Agent mode • 💸 cheap • 💰 expensive

## 1. Balance Between Performance and Cost

**Pros:** Defaults ✅, balanced ⚖️, strong coding coverage.

| Model | Use Case / Differentiator | GA/Preview | Special Abilities | Multiplier (Paid / Free) |
| --- | --- | --- | --- | --- |
| GPT-4.1 | General-purpose coding & writing | ✅ | 🤖👓 | Paid: 0× (included) / Free: 1× |
| GPT-4o | Included chat model (good default) | ✅ | — | Paid: 0× (included) / Free: 1× |
| GPT-5 mini | Default-quality coding with speed | ✅ | 🤖🧠👓 | Paid: 0× (included) / Free: 1× |
| Claude Sonnet 4.5 | General-purpose coding + agent tasks | ✅ | 🤖 | Paid: 1× / Free: — |
| Grok Code Fast 1 | Coding-focused, fast responses 🚀 | ✅ | 🤖 | Paid: 0.25× 💸 / Free: — |
| GPT-5-Codex | Code-first for features/tests/reviews | 🚧 | 🤖 | Paid: 1× / Free: — |
| GPT-5.1-Codex | Codex variant (code-heavy workflows) | ✅ | — | Paid: 1× / Free: — |
| GPT-5.1-Codex-Max | Higher-capacity Codex variant | ✅ | — | Paid: 1× / Free: — |

## 2. Fast, Low-Cost Support for Basic Tasks

**Pros:** Speed 🚀, low cost 💸, quick edits, small questions.

| Model | Use Case / Differentiator | GA/Preview | Special Abilities | Multiplier (Paid / Free) |
| --- | --- | --- | --- | --- |
| Claude Haiku 4.5 | Fast, lightweight coding help | ✅ | 🤖 | Paid: 0.33× 💸 / Free: 1× |
| Gemini 3 Flash | Fast help for simple/repetitive tasks | 🚧 | 🤖 | Paid: 0.33× 💸 / Free: — |
| GPT-5.1-Codex-Mini | Low-cost Codex variant (small tasks) | 🚧 | — | Paid: 0.33× 💸 / Free: — |
| Raptor mini | Fast inline suggestions & explanations | 🚧 | 🤖 | Paid: 0× (included) / Free: 1× |

## 3. Deep Reasoning & Multimodal Inputs

**Pros:** Deep debugging 🧠, multi-file reasoning, architecture, visuals 👓.

| Model | Use Case / Differentiator | GA/Preview | Special Abilities | Multiplier (Paid / Free) |
| --- | --- | --- | --- | --- |
| GPT-5 | Complex reasoning & code analysis | ✅ | 🧠 | Paid: 1× / Free: — |
| GPT-5.1 | Deep reasoning & debugging | ✅ | 🤖 | Paid: 1× / Free: — |
| GPT-5.2 | Deep reasoning & debugging | ✅ | 🤖 | Paid: 1× / Free: — |
| Claude Sonnet 4 | Balanced deep reasoning for coding workflows | ✅ | 🤖👓 | Paid: 1× / Free: — |
| Claude Opus 4.5 | Higher-end reasoning | ✅ | — | Paid: 3× 💰 / Free: — |
| Claude Opus 4.1 | Highest-end reasoning | ✅ | 🧠👓 | Paid: 10× 💰💰 / Free: — |
| Gemini 2.5 Pro | Long-context reasoning + visuals | ✅ | 🧠👓 | Paid: 1× / Free: — |
| Gemini 3 Pro | Gemini Pro tier (preview) | 🚧 | — | Paid: 1× / Free: — |

---

## References

- [AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)
- [Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [Requests in GitHub Copilot (premium requests & multipliers)](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests?versionId=enterprise-cloud%40latest)

---

## Model Summary Overview: Performance vs. Quality & Cost

```mermaid
graph LR
  gcf1["Grok Code Fast 1<br/>🚀💸 0.25×"] -->
  ch45["Claude Haiku 4.5<br/>🚀💸 0.33×"] -->
  g3f["Gemini 3 Flash<br/>🚧🚀💸 0.33×"] -->
  g51cm["GPT-5.1-Codex-Mini<br/>🚧💸 0.33×"] -->
  rmini["Raptor mini<br/>🚧💸 0×"] -->
  g41["GPT-4.1<br/>💸 0×"] -->
  g4o["GPT-4o<br/>💸 0×"] -->
  g5m["GPT-5 mini<br/>💸 0×"] -->
  cs45["Claude Sonnet 4.5<br/>1×"] -->
  g5c["GPT-5-Codex<br/>🚧 1×"] -->
  g51c["GPT-5.1-Codex<br/>1×"] -->
  g51cx["GPT-5.1-Codex-Max<br/>1×"] -->
  g5["GPT-5<br/>🧠 1×"] -->
  g51["GPT-5.1<br/>1×"] -->
  g52["GPT-5.2<br/>1×"] -->
  cs4["Claude Sonnet 4<br/>👓 1×"] -->
  g25p["Gemini 2.5 Pro<br/>🧠👓 1×"] -->
  g3p["Gemini 3 Pro<br/>🚧 1×"] -->
  co45["Claude Opus 4.5<br/>💰 3×"] -->
  co41["Claude Opus 4.1<br/>💰💰 10×"]

  style gcf1 fill:#f9f,stroke:#333,stroke-width:2px,color:#000
  style ch45 fill:#f9f,stroke:#333,stroke-width:2px,color:#000
  style g3f fill:#f9f,stroke:#333,stroke-width:2px,color:#000
  style g51cm fill:#f9f,stroke:#333,stroke-width:2px,color:#000
  style rmini fill:#f9f,stroke:#333,stroke-width:2px,color:#000

  style g41 fill:#9cf,stroke:#333,stroke-width:2px,color:#000
  style g4o fill:#9cf,stroke:#333,stroke-width:2px,color:#000
  style g5m fill:#9cf,stroke:#333,stroke-width:2px,color:#000
  style cs45 fill:#9cf,stroke:#333,stroke-width:2px,color:#000
  style g5c fill:#9cf,stroke:#333,stroke-width:2px,color:#000
  style g51c fill:#9cf,stroke:#333,stroke-width:2px,color:#000
  style g51cx fill:#9cf,stroke:#333,stroke-width:2px,color:#000

  style g5 fill:#9fc,stroke:#333,stroke-width:2px,color:#000
  style g51 fill:#9fc,stroke:#333,stroke-width:2px,color:#000
  style g52 fill:#9fc,stroke:#333,stroke-width:2px,color:#000
  style cs4 fill:#9fc,stroke:#333,stroke-width:2px,color:#000
  style g25p fill:#9fc,stroke:#333,stroke-width:2px,color:#000
  style g3p fill:#9fc,stroke:#333,stroke-width:2px,color:#000
  style co45 fill:#fc9,stroke:#333,stroke-width:2px,color:#000
  style co41 fill:#fc9,stroke:#333,stroke-width:2px,color:#000
```
