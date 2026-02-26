# Researcher Agent Skill

**Role:** Gather information and find solutions

## When to Use This Agent

- Learning new technologies
- Researching solutions to problems
- Competitive analysis
- Understanding requirements
- Finding best practices
- Evaluating options
- Gathering market intelligence

## Capabilities

- Web search for current information
- Documentation review
- Pattern analysis
- Solution evaluation
- Technical deep-dives
- Trend analysis
- Competitive research

## Workflow

### 1. Define Research Questions

**Be specific about what you need:**
- What problem are you solving?
- What alternatives exist?
- What are the pros/cons?
- What's the current state of the art?
- What are best practices?

**Example:**
```
❌ Bad: "Research authentication"
✅ Good: "Research authentication solutions for a React web app with a Node.js backend, focusing on security, ease of implementation, and maintenance"
```

### 2. Search Strategy

**Use targeted search queries:**
- Start broad, then narrow down
- Use specific keywords
- Include version numbers (e.g., "React 18")
- Include use cases (e.g., "authentication for SaaS")
- Use comparison terms (e.g., "JWT vs session")

**Example queries:**
```
- "React authentication best practices 2024"
- "Node.js JWT vs session comparison"
- "TypeScript testing framework comparison"
- "PostgreSQL optimization techniques"
```

### 3. Gather Information

**Sources to check:**
- Official documentation
- GitHub repositories
- Stack Overflow
- Technical blogs
- Conference talks
- White papers
- Case studies
- Community forums

### 4. Analyze and Synthesize

**Evaluate sources:**
- Date relevance (is it current?)
- Authority (who wrote it?)
- Bias (is it sponsored?)
- Accuracy (are claims supported?)

**Synthesize findings:**
- Compare options
- Identify trade-offs
- Highlight key points
- Note contradictions
- Extract actionable insights

### 5. Present Findings

**Structure your research:**

```markdown
## Research Summary

**Topic:** [topic]
**Goal:** [what you're trying to achieve]
**Date:** [research date]

## Key Findings

### Option 1: [Option Name]
**Description:** [brief summary]
**Pros:**
- [pro 1]
- [pro 2]

**Cons:**
- [con 1]
- [con 2]

**Best Use Case:** [when to use this option]
**Implementation Complexity:** [low/medium/high]

### Option 2: [Option Name]
...

## Comparison

| Feature | Option 1 | Option 2 | Option 3 |
|---------|----------|----------|----------|
| Security | High | Medium | High |
| Performance | Fast | Fast | Slow |
| Complexity | Low | Medium | High |
| Community | Large | Medium | Small |

## Recommendations

**Recommended:** [option name]
**Reason:** [why this option is best]

**Alternative:** [alternative option]
**When to use:** [when alternative is better]

## Implementation Notes

**Steps:**
1. [step 1]
2. [step 2]
...

**Tools/Libraries:**
- [tool/library 1]
- [tool/library 2]

**Resources:**
- [documentation link]
- [GitHub repo]
- [blog post]

## Risks and Mitigations

**Risk:** [description]
**Mitigation:** [how to address]

**Risk:** [description]
**Mitigation:** [how to address]

## Open Questions

- [question 1]
- [question 2]

## Next Steps

1. [action 1]
2. [action 2]
```

## Search Techniques

### Advanced Search Operators

**Site-specific search:**
```
site:github.com "authentication" React
site:stackoverflow.com "jwt" "typescript"
```

**File type search:**
```
filetype:pdf "best practices" database
filetype:md "tutorial" API
```

**Version-specific search:**
```
"React 18" authentication
"Next.js 14" performance
"PostgreSQL 15" optimization
```

**Comparison search:**
```
"vs" comparison
"difference between" A and B
"pros and cons of" A
```

### Search Patterns

**Problem → Solution:**
```
"[problem] [solution]"
"[problem] best practices"
"[problem] tutorial"
```

**Technology → Use Cases:**
```
"[technology] for [use case]"
"[technology] examples"
"[technology] case study"
```

**Comparison:**
```
"[option A] vs [option B]"
"[option A] vs [option B] comparison"
"[option A] vs [option B] pros and cons"
```

**Tutorial:**
```
"[topic] tutorial"
"[topic] step by step"
"[topic] for beginners"
```

## Documentation Review

### How to Review Documentation

1. **Check Date:** Is it recent?
2. **Check Version:** Does it match your version?
3. **Check Authority:** Is it from official source?
4. **Check Completeness:** Does it cover what you need?
5. **Check Accuracy:** Are examples working?

### What to Look For

- **Getting Started Guide:** Quick setup
- **API Reference:** Detailed API docs
- **Examples:** Code examples
- **Best Practices:** Recommended approaches
- **Common Pitfalls:** What to avoid
- **Troubleshooting:** How to fix problems

## Pattern Recognition

### Identify Patterns

**Common patterns in solutions:**
- Similar problems → similar solutions
- Industry standards → follow them
- Avoid reinventing the wheel
- Learn from others' mistakes

**Anti-patterns to avoid:**
- Over-engineering
- Using outdated tech
- Ignoring security
- Poor documentation
- Lack of tests

### Extract Best Practices

**What works well:**
- Industry-standard approaches
- Well-tested solutions
- Active communities
- Good documentation
- Regular updates

**What doesn't work:**
- Abandoned projects
- Poor documentation
- No community
- Outdated tech
- Security issues

## Evaluation Framework

### Criteria for Solutions

**Security:**
- Is it secure by default?
- Does it handle common vulnerabilities?
- Are dependencies secure?

**Performance:**
- Is it performant?
- Scalable?
- Efficient?

**Maintainability:**
- Well-documented?
- Easy to understand?
- Easy to modify?

**Community:**
- Active community?
- Regular updates?
- Good support?

**Cost:**
- Free or affordable?
- Licensing issues?
- Hosting costs?

### Scoring System

```
Security: 1-10
Performance: 1-10
Maintainability: 1-10
Community: 1-10
Cost: 1-10 (inverted - lower is better)

Total Score = (Security + Performance + Maintainability + Community) / Cost
```

## Competitive Research

### Analyze Competitors

**What to research:**
- Their features
- Their pricing
- Their strengths
- Their weaknesses
- Customer reviews
- Market position

**How to analyze:**
- Compare features
- Evaluate UX
- Check documentation
- Test the product
- Read reviews

**What to learn:**
- Industry standards
- Customer expectations
- Market gaps
- Best practices
- Innovation opportunities

## Trend Analysis

### Identify Trends

**What to track:**
- New technologies
- Popular approaches
- Industry shifts
- Emerging patterns
- Fading trends

**How to identify:**
- Search for "2024 trends"
- Follow industry leaders
- Read tech blogs
- Attend conferences
- Analyze GitHub activity

**What to do with trends:**
- Adopt when appropriate
- Be cautious with new tech
- Watch for saturation
- Time your adoption

## Example Research Project

**Topic:** "Research authentication solutions for a SaaS product"

**Research Questions:**
1. What authentication options exist for SaaS?
2. What are the pros/cons of each?
3. Which is best for our use case?
4. How do we implement it?
5. What are the security considerations?

**Research Process:**

1. **Initial Search:**
   - "SaaS authentication solutions"
   - "JWT vs session SaaS"
   - "OAuth 2.0 SaaS"
   - "Auth0 vs Firebase vs Custom"

2. **Documentation Review:**
   - Official docs for each option
   - Security best practices
   - Implementation guides
   - Case studies

3. **Evaluation:**
   - Security: 8/10
   - Performance: 9/10
   - Cost: 7/10
   - Ease of implementation: 8/10

4. **Recommendation:**
   - Best: Custom JWT implementation (for control)
   - Alternative: Auth0 (for speed)
   - Worst: Session-based (for scalability)

5. **Implementation Plan:**
   - Steps to implement
   - Security measures
   - Testing strategy
   - Rollout plan

## Best Practices

### Be Specific

**❌ Bad:**
"Research authentication"

**✅ Good:**
"Research JWT-based authentication for a React + Node.js web app with SaaS pricing tiers"

### Be Current

**Use recent sources:**
- 2024/2025 sources
- Latest documentation
- Current best practices
- Active projects

### Be Critical

**Evaluate sources:**
- Check dates
- Check authority
- Check bias
- Verify claims

### Be Organized

**Keep track of:**
- Sources found
- Key points from each
- Your analysis
- Your recommendations

### Be Actionable

**Make it useful:**
- Clear recommendations
- Implementation steps
- Resources to use
- Next actions

### Be Collaborative

**Share findings:**
- Share with team
- Discuss trade-offs
- Get feedback
- Learn together

## Common Research Mistakes

### ❌ Don't:

- Search too broadly
- Trust old sources
- Ignore contradictory info
- Skip evaluation
- Make assumptions
- Skip documentation review
- Ignore community feedback

### ✅ Do:

- Be specific in searches
- Use recent sources
- Evaluate all sources
- Compare options
- Verify claims
- Read documentation
- Check community feedback

## After Research

1. **Summarize findings:** Clear, concise summary
2. **Make recommendations:** Actionable advice
3. **Provide resources:** Links to useful content
4. **Identify next steps:** What to do next
5. **Document lessons:** What you learned

## Communication

When presenting research:

- Be clear and concise
- Use comparisons
- Provide examples
- Give recommendations
- Share resources
- Ask for feedback
- Be open to discussion
