# Multi-Agent Skills

A collection of specialized agent skills for complex task execution.

## Available Skills

### 1. planner
**Role:** Break down complex tasks into actionable steps

**Skills:**
- Task analysis
- Implementation planning
- Dependency identification
- Priority assessment

**Usage:**
```bash
bd spawn "Create plan for [feature]" --agent planner
```

**SKILL.md:** `.agents/skills/planner/SKILL.md`

---

### 2. coder
**Role:** Write clean, maintainable, well-tested code

**Skills:**
- TDD implementation
- Code quality
- Error handling
- Documentation
- Security

**Usage:**
```bash
bd spawn "Implement [feature]" --agent coder
```

**SKILL.md:** `.agents/skills/coder/SKILL.md`

---

### 3. reviewer
**Role:** Ensure code quality, security, and maintainability

**Skills:**
- Code quality review
- Security audit
- Performance analysis
- Best practices check
- Test coverage analysis

**Usage:**
```bash
bd spawn "Review code" --agent reviewer
```

**SKILL.md:** `.agents/skills/reviewer/SKILL.md`

---

### 4. researcher
**Role:** Gather information and find solutions

**Skills:**
- Web research
- Documentation review
- Pattern analysis
- Solution evaluation
- Competitive research

**Usage:**
```bash
bd spawn "Research [topic]" --agent researcher
```

**SKILL.md:** `.agents/skills/researcher/SKILL.md`

---

## Quick Start

### Feature Development Pipeline

```bash
# 1. Research
bd spawn "Research authentication options" --agent researcher --label research

# 2. Plan
bd spawn "Create implementation plan" --agent planner --label plan

# 3. Implement
bd spawn "Implement auth system" --agent coder --label implement

# 4. Review
bd spawn "Review code quality" --agent reviewer --label review

# 5. Document
bd spawn "Update documentation" --agent researcher --label docs
```

### Bug Fix Pipeline

```bash
# 1. Research
bd spawn "Investigate bug" --agent researcher --label investigate

# 2. Fix
bd spawn "Implement fix" --agent coder --label fix

# 3. Review
bd spawn "Review fix" --agent reviewer --label review
```

## Multi-Agent Workflows

### Complex Feature

```bash
# Research phase
bd spawn "Research [feature]" --agent researcher --context-messages 3

# Planning phase
bd spawn "Create detailed plan" --agent planner --context-messages 5

# Implementation phase (can spawn multiple coders)
bd spawn "Implement core feature" --agent coder --label core
bd spawn "Add tests" --agent coder --label tests
bd spawn "Add documentation" --agent coder --label docs

# Review phase
bd spawn "Review code" --agent reviewer --context-messages 5
```

### Testing Pipeline

```bash
# Research tests
bd spawn "Research testing strategies" --agent researcher --label research

# Write tests
bd spawn "Write unit tests" --agent coder --label unit
bd spawn "Write integration tests" --agent coder --label integration

# Run tests
bd spawn "Run tests and analyze coverage" --agent coder --label run

# Review tests
bd spawn "Review test quality" --agent reviewer --label review
```

## Best Practices

### When to Use Multiple Agents

✅ **Use multiple agents when:**
- Tasks are large and complex
- Different expertise is needed
- Parallel work can speed things up
- You need multiple perspectives

❌ **Don't use multiple agents when:**
- Task is simple and straightforward
- Agent would just ask the same questions
- You want full control over output
- Cost is a concern

### Agent Delegation

1. **Check readiness:** Use `bd ready` to see what needs work
2. **Spawn first agent:** Use `bd spawn` with specific agent
3. **Chain agents:** Pass context to next agent
4. **Review output:** Always check before continuing
5. **Close tasks:** Use `bd close` when done

### Context Management

- Use `--context-messages` to pass previous agent output
- Use `--label` to track different tasks
- Use `--timeout` to limit runtime
- Use `--model` to control cost

## Cost Awareness

Each agent call consumes tokens:
- Default model: zai/glm-4.7-flash
- Can use `--model sonnet` for better quality
- Can use `--model opus` for complex tasks

Chain agents efficiently - don't spawn 5 agents for one simple task.

## Getting Help

Each skill has detailed documentation in its `SKILL.md` file:
- **planner:** `.agents/skills/planner/SKILL.md`
- **coder:** `.agents/skills/coder/SKILL.md`
- **reviewer:** `.agents/skills/reviewer/SKILL.md`
- **researcher:** `.agents/skills/researcher/SKILL.md`

## Examples

See `examples/` directory for more detailed examples.
