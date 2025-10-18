# Sample prompts:

## Demo 0: Basic prompts
(_with 4.1 in ask mode_)
1. "Give me an overview of the project."
2. "How can I start this project?"

## Demo 1:

### Generic
Demonstrate Instructions, commit messages, and customer patterns, Coding Agent at the IDE, Automodel, MCP Tools
and of course everything in the IDE :)

### MCP Server and tools - Show Limits
- explain what MCP server is/ that is different than tools. One MCP server may have many tools
- Show exclamation in tools when limit is reached
- run (AGENT 4.1) _"Are there any Issues open in this repo ?"_ - show it fails due to limit
- Open settings - > search for "github.copilot.chat.virtualTools.threshold" - explain this is the threshold for using tools, change 0 to 128, try again
 
### Custom Prompt Files
Reusing custom prompts to streamline AI-native workflow and demonstrate prompt engineering best practices
- _Model Comparison Prompt_: Show the model-compare.prompt.md file in the prompts directory. Explain the YAML frontmatter (mode: 'agent', description, tools). Click the Run button in the top (or use Command Palette → "Chat: Run Prompt" - start from ASK, erase docs/model-comparison.md) and show how it automatically selects Agent mode, fetches live documentation, and updates the comparison markdown file.





## Demo 2
Show the differences of giving well defined prompts vs vague prompts
Spec-driven workflows with Spec Kit, prompting best practices, and AI agents executing specs. 
Demo: Spec-to-code flow using Copilot + Spec Kit.




### Show how to document an API
1. Try EDIT MODE and GPT 4.1 > "Create API documentation following best practices"
    Results will be vague possibly, possibly appendix in Readme.md
2. Try AGENT MODE and Claude Sonnet 3.5> "Create API documentation following best practices. Please create the required files inside docs folder, and I want also to add OpenAI 3.0 spec file"
    Results now are closer to what we want....


https://www.youtube.com/watch?v=qHl_KBUyid0&t=186s