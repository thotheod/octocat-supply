# GitHub Copilot 101 Demo Script (VS Code + Visual Studio + CLI)

Audience: developers

Timebox: 60 minutes

Repo: OctoCAT Supply Chain demo app

Goals:
- Show GitHub Copilot core developer workflows inside IDEs (VS Code + Visual Studio)
- Keep it simple: focus on **inline suggestions**, **chat**, **testing/debugging**, **refactoring**, and **customization**
- Show model selection + premium requests concept in VS Code
- Briefly reference MCP tools + Agent Mode (talk-track only; no Docker)
- Quick Copilot CLI cameo (plan A)

Non-goals (explicitly out of scope for this 101):
- GitHub.com workflows that typically need enterprise governance (PR reviews, code owners rules, GHAS policy management)
- Running MCP servers (no Docker in this demo)
- Deep Agent Mode training

## Pre-demo checklist (do this before the meeting)
- Install prerequisites:
  - Node.js 18+
  - .NET 9 SDK
  - VS Code + GitHub Copilot extension signed in
  - Visual Studio Professional with GitHub Copilot enabled
  - GitHub CLI (`gh`) with Copilot extension (for the CLI segment)
- Ensure dependencies are installed: `npm install`
- Sanity check build + tests (so you know the environment is healthy):
  - `npm run build`
  - `npm run test:api`
- Optional (if you want to show the running UI): start dev servers:
  - `npm run dev`
  - Frontend: `http://localhost:5137`

## Minute-by-minute run of show

### 0:00–0:03 — What is GitHub Copilot (in one slide / one story)
Talking points:
- “Copilot is an AI pair programmer inside your IDE: it predicts code, answers questions about your codebase, and helps you iterate faster.”
- “The value isn’t just code generation — it’s: understanding, refactoring, test generation, and debugging help.”
- “It works best when you give good context and ask for small, verifiable steps.”

### 0:03–0:08 — Repo + customization hooks (show ‘team standards’)
Open and show:
- [.github/copilot-instructions.md](../.github/copilot-instructions.md)
- [docs/build.md](./build.md)

Talking points:
- Custom instructions let teams encode “how we work” (commands, architecture, conventions).
- For the demo, call out the two guardrails:
  - Always build: `npm run build`
  - API tests: `npm run test:api`


### 0:08–0:20 — VS Code: Inline suggestions + chat fundamentals
Open:
- [frontend/src/App.tsx](../frontend/src/App.tsx)
- [frontend/src/components/admin/Products.tsx](../frontend/src/components/admin/Products.tsx)

Demo steps (keep changes small):
1) Inline suggestions (1–2 mins)
   - Add a small, local change (e.g., rename a variable, extract a tiny helper, or add a missing type)
   - Accept/reject a couple of suggestions to show control

2) Chat: explain + navigate (3–4 mins)
   - Prompt (Ask mode):
     - “Explain what this component does and where its data comes from. Keep it to 5 bullets.”
   - Prompt (Ask mode, show @workspace):
     - “@workspace Where is the API base URL configured for the frontend? Point me to the exact file(s) and explain how environment detection works.”

3) Chat: refactor a concrete hotspot (4–5 mins)
   - In [frontend/src/components/admin/Products.tsx](../frontend/src/components/admin/Products.tsx), call out the N+1 pattern (fetching supplier per product).
   - Prompt:
     - “Refactor this component to avoid per-product supplier fetches. Fetch suppliers once, map by id, and keep UI behavior the same. Show the changes as a small diff.”


### 0:20–0:32 — VS Code: Testing + quick debugging loop
Open:
- [api-tests/BranchApiTests.cs](../api-tests/BranchApiTests.cs)
- [api/Program.cs](../api/Program.cs)

Demo steps:
1) Run tests (2 mins)
   - Command: `npm run test:api`

2) Debug with chat (5–7 mins)
   - If a test fails: use chat to interpret the failure and propose the smallest fix.
   - If tests pass: use chat to extend coverage on one small scenario.

Prompts:
- “Explain what these API tests are validating and which endpoints they hit. If you had to add one missing test, what would it be?”
- “Add one additional negative test case to BranchApiTests (keep it minimal). Explain why it’s valuable.”

3) Quick code understanding (3–4 mins)
   - Prompt:
     - “Explain how the API endpoints are wired up in Program.cs. Where does CRUD behavior come from?”


### 0:32–0:42 — VS Code: Model selection + premium requests concept (and how to talk about usage)
Open:
- [.github/chatmodes/ModelSelection.chatmode.md](../.github/chatmodes/ModelSelection.chatmode.md)
- [docs/model-comparison.md](./model-comparison.md)

Demo steps:
1) Show the model picker in Copilot Chat
   - Talking point: “Different models are better for planning vs implementation vs quick Q&A.”

2) Use the ModelSelection chat mode (live)
   - Prompt:
     - “Goal: I need to refactor a React component to reduce API calls without changing UI behavior. What model should I use for planning vs implementation?”

3) Premium requests (concept)
   - Talking point: “Some models can consume premium requests (often with multipliers). It’s a tradeoff: cost vs quality/speed.”
   - Suggested prompt (show @fetch):
     - “@fetch Summarize what premium requests are and how multipliers work. Keep it to 6 bullets.”

Usage tracking (keep this simple and honest):
- In IDE: show the UI indicator(s) if present in your VS Code build.
- Outside IDE: usage visibility depends on whether you’re an individual subscriber or an org admin.


### 0:42–0:52 — Visual Studio Professional: same story, different IDE
Open in Visual Studio:
- Solution: `octocat-supply.sln`
- Project: `api-tests/api-tests.csproj`
- File: `BranchApiTests.cs`

Demo steps:
- Show inline completions in C#
- Use Copilot Chat to:
  - explain a test
  - suggest one refactor (e.g., extract helper for repeated request/response parsing)
  - propose one additional test case

Prompt:
- “Refactor this test class to reduce duplication while keeping behavior identical. Keep the diff small.”


### 0:52–0:56 — Copilot CLI (plan A)
Goal: show Copilot beyond the IDE in 60 seconds.

Prereq: `gh` + Copilot extension installed.

Commands to demo (pick one):
- `gh copilot explain "dotnet test api-tests/api-tests.csproj --filter FullyQualifiedName~BranchApiTests"`
- `gh copilot suggest "Create a git command sequence to create a feature branch, run tests, and push it"`

Talking point:
- “Same capability, different surface area: fast help at the terminal.”


### 0:56–1:00 — MCP tools + Agent Mode (talk-track only) + Q&A
Open:
- [docs/mcp.md](./mcp.md)
- [.vscode/mcp.json](../.vscode/mcp.json)

Talking points:
- MCP connects Copilot to external tools (browser automation, GitHub, cloud CLIs).
- For today: we only show the config. Running some servers requires Docker; we’ll cover that in an advanced session.

Close with:
- Best practices:
  - Keep tasks small and verifiable
  - Use @workspace for repo-specific Q&A
  - Use @fetch for “grounded” answers from docs
  - Run tests early and often
- Next steps:
  - Decide 2–3 team prompts to standardize (refactor plan, test plan, release notes)
  - Add lightweight custom instructions for conventions
  - Plan an “Agent + MCP” follow-up session

## Backup plan (if builds/tests are slow)
- Skip running the app.
- Keep the demo as “read-only + small refactor diff” using Chat explain/refactor.
- Use the ModelSelection chat mode + @fetch prompts (fast, reliable, still valuable).
