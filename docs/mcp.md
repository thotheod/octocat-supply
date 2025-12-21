# MCP (Model Context Protocol) – Quick Reference (for this repo)

This doc exists so the demo scripts can reference MCP consistently without requiring a live setup.

## What MCP is (1 minute explanation)
MCP (Model Context Protocol) is a standard way for GitHub Copilot (in the IDE) to connect to external tools/services (for example: a browser, GitHub APIs, or cloud CLIs) in a structured, permissioned way.

In practice:
- Copilot can ask to call a tool ("run Playwright", "query GitHub", "deploy")
- You approve/deny tool actions
- The tool returns structured results back into the chat

## What we do in Copilot 101 vs advanced sessions
Copilot 101 (this demo):
- We only show where MCP is configured in the repo
- We do not run MCP servers (no Docker)

Advanced session (later):
- Run Playwright MCP to drive an actual browser test
- Run GitHub MCP to create/list issues
- Discuss permissions, tokens, and safety practices

## MCP in this repo
MCP servers are configured in:
- [.vscode/mcp.json](../.vscode/mcp.json)

Servers you may see there:
- `playwright` (launches browser automation via `npx @playwright/mcp@latest`)
- `github` (runs GitHub MCP server via Docker; requires Docker)
- `github-remote` (connects to a hosted MCP endpoint)
- `Azure MCP Server` (Azure tooling via `npx @azure/mcp@latest`)

## Why we skip MCP live in this 101 demo
- The local `github` MCP server uses Docker.
- The Playwright MCP server may need a real browser session.

Both can be great demos, but they add environment risk. For a 60‑minute “101”, it’s better to focus on:
- inline suggestions
- chat + `@workspace` / `@fetch`
- testing + debugging + refactoring

## Safety / operational best practices (talk-track)
- Prefer least-privilege tokens if a server requires auth.
- Treat tool calls like running commands: review before approving.
- Keep “destructive” actions (delete, overwrite, deploy) out of a 101 demo.
- Prefer read-only tool calls first (list/query) before write actions.
