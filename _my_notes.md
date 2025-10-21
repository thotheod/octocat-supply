# Sample prompts:

## Demo 0: Basic prompts
(_with 4.1 in ask mode_)
1. "Give me an overview of the project."
2. "How can I start this project?"

## Demo 1:

### 1.1 Generic
Demonstrate Instructions, commit messages, and customer patterns, Coding Agent at the IDE, Automodel, MCP Tools
and of course everything in the IDE :)
- Demonstrate "___Next Edit feature___" in product.json file. Add _"sku": "IW-001"_ to the first product.

### 1.2 MCP Server and tools - Show Limits
- explain what MCP server is/ that is different than tools. One MCP server may have many tools
- Show exclamation in tools when limit is reached
- run (AGENT 4.1) _"Are there any Issues open in this repo ?"_  BUT First run "github.copilot.chat.virtualTools.threshold" set to 0
    - first with ask mode - explain that only agent can use tools
    - show it fails due to limit
- Open settings - > search for "github.copilot.chat.virtualTools.threshold" - explain this is the threshold for using tools, change 0 to 128, try again

### 1.3 Multimodal + MCP (Implement Cart Create Issue)
- (Claude Sonnet 4 / Agent) prompt *"create an issue in my GitHub repo to implement the Cart page and Cart icon. I want the ux to follow UI Design  of the attached image"*
    - show how it asks for permission to create the issue (It requires GitHub MCP Server to  be started_)
    - Show the details of the issue, search for something like "Detailed Requirements Based On Design"

### 1.4 Implement tests 
- (Claude Sonnet 4 / Agent): Prompt: _run tests, analyze coverage and add missing Branch tests to include tests for untested scenarios_
    - Watch that it creates a TODO list first, that updates as it proceeds
    - watch how it fixes itself when it cannot execute tests, or gets errors
    - Watch how it calculates test coverage etc.... (it takes around 5 minutes to complete)
- Ask Copilot to _add tests for the Product route_ to show generation of new tests

## Demo 2
Show the differences of giving well defined prompts vs vague prompts
Spec-driven workflows with Spec Kit, prompting best practices, and AI agents executing specs. 
Demo: Spec-to-code flow using Copilot + Spec Kit.

### 2.1 Show how to document an API
    1. Try EDIT MODE and GPT 4.1 > "Create API documentation following best practices"
        Results will be vague possibly, possibly appendix in Readme.md
    2. Try AGENT MODE and Claude Sonnet 3.5> "Create API documentation following best practices. Please create the required files inside docs folder, and I want also to add OpenAI 3.0 spec file"
        Results now are closer to what we want....


### 2.2 Custom Prompt Files
Reusing custom prompts to streamline AI-native workflow and demonstrate prompt engineering best practices
- _Model Comparison Prompt_: Show the model-compare.prompt.md file in the prompts directory. Explain the YAML frontmatter (mode: 'agent', description, tools). Click the Run button in the top (or use Command Palette → "Chat: Run Prompt" - start from ASK, erase docs/model-comparison.md) and show how it automatically selects Agent mode, fetches live documentation, and updates the comparison markdown file.-
- Another demo would be to use the /create-readme.prompt.md command on the chat and call the prompt file to generate README.md from . 
- HINT: you can disable the Builtin > Edit files tool to show that it cannot create a file. then in Agent Mode use GPT 5.0 mini and prompt "create a CONTRIBUTING.md file based on best practices" - it will fail as it cannot create files without the tool enabled. But after you enable it it will be able to create the file.

### 2.3 Custom modes
- Demonstrate the use of custom modes in the chat. Select BDD mode from the mode picker. Show how the prompt is pre-filled with BDD instructions. Ask_ "add a feature to test the cart icon and page"_ - show how it creates a proper Gherkin feature file.

### 2.4 Custom instructions :) :)
- use ask GPT 4.1 and ask "review my code base". Possibly some good results. Then show https://github.com/github/awesome-copilot and copy from /.misc-resources the file "gilfoyle-code-review.instructions.md" to the .github/instructions and ask again "review my code base" - LOL (if it does not work try _"review my codebase using #file:gilfoyle-code-review.instructions.md"_


### 2.5 GitHub Spark
- Got to https://github.com/spark/thotheod. Add in the prompt 

    _"I want to build a project called 'Mood Tracker demo'. For start I want a local-first web app for logging and viewing daily moods. In this first iteration The Mood Tracker demo allows users to:
        - Log a mood (e.g., Happy, Sad) with an optional note.
        - View a list of all logged moods.
        - Store data locally in a JSON file."_
- Let it cook - usually gets around 10 minutes :) show the existing one published at https://mood-tracker-mvp--thotheod.github.app/
- show the repo : https://github.com/thotheod/mood-tracker-mvp



### 2.6 Spec-kit

#### Spec-kit installation
https://www.youtube.com/watch?v=a9eR1xsfvHg&t=17s
1. show repo: https://github.com/github/spec-kit#-get-started
2. Install _uv_ (modern Python package and project manager written in Rust.)
    i.e. # Install via PowerShell script
            powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
3. install spec-kit
    uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
4. go to C:\_Code\Github\speckit-test and start

#### Create project mood-tracker-spec-yymmdd
1. specify init mood-tracker-spec-251019