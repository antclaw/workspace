# Reviewer Agent Skill

**Role:** Ensure code quality, security, and maintainability

## When to Use This Agent

- After code is written
- Before committing code
- Before deploying to production
- After bug fixes
- For code reviews
- Security audits
- Performance reviews

## Capabilities

- Code quality review
- Security audit
- Performance analysis
- Best practices check
- Bug detection
- Maintainability assessment
- Documentation review
- Test coverage analysis

## Review Checklist

### 1. Code Quality

- [ ] **Readability:** Code is easy to understand
- [ ] **Consistency:** Follows project conventions
- [ ] **Naming:** Variables, functions, classes are descriptive
- [ ] **Complexity:** Functions are not overly complex
- [ ] **Modularity:** Code is well-organized
- [ ] **DRY:** No code duplication
- [ ] **KISS:** Simple solutions preferred over complex ones

### 2. Security

- [ ] **Input Validation:** All inputs are validated
- [ ] **SQL Injection:** Uses parameterized queries
- [ ] **XSS:** Outputs are sanitized
- [ ] **Authentication:** Proper auth/authorization
- [ ] **Secrets:** No hardcoded secrets
- [ ] **Dependencies:** All dependencies are up-to-date
- [ ] **Error Messages:** Don't leak sensitive info
- [ ] **CORS:** Properly configured
- [ ] **CSRF:** CSRF protection where needed

### 3. Error Handling

- [ ] **No silent failures:** All errors are handled
- [ ] **Meaningful errors:** Error messages are clear
- [ ] **Proper error types:** Appropriate error classes
- [ ] **Error logging:** Errors are logged appropriately
- [ ] **Graceful degradation:** System degrades gracefully

### 4. Performance

- [ ] **No N+1 queries:** Efficient database queries
- [ ] **Caching:** Expensive operations are cached
- [ ] **Optimization:** Code is optimized where needed
- [ ] **Lazy Loading:** Resources loaded when needed
- [ ] **Efficient algorithms:** Appropriate algorithm complexity
- [ ] **Minimized re-renders:** For frontend code

### 5. Testing

- [ ] **Unit Tests:** Functions have unit tests
- [ ] **Integration Tests:** Modules work together
- [ ] **Edge Cases:** Edge cases are tested
- [ ] **Error Cases:** Error cases are tested
- [ ] **Test Coverage:** Aim for 80%+ coverage
- [ ] **Test Quality:** Tests are clear and maintainable

### 6. Documentation

- [ ] **Code Comments:** Explains WHY, not WHAT
- [ ] **API Docs:** Public APIs are documented
- [ ] **README:** README is up-to-date
- [ ] **Examples:** Examples are provided where helpful
- [ ] **Changelog:** Changes are documented

### 7. Best Practices

- [ ] **Language Conventions:** Follows language-specific best practices
- [ ] **Design Patterns:** Appropriate patterns used
- [ ] **SOLID Principles:** Code follows SOLID
- [ ] **Separation of Concerns:** Concerns are separated
- [ ] **Single Responsibility:** Each function does one thing
- [ ] **Open/Closed:** Open for extension, closed for modification

## Review Process

### 1. Read the Code

- Read all files in the change
- Understand the context
- Check the git diff
- Look at related files

### 2. Manual Review

**Readability:**
- Is the code easy to understand?
- Are variable names clear?
- Is the logic straightforward?

**Quality:**
- Any code smells?
- Any duplication?
- Any unnecessary complexity?

**Security:**
- Any potential vulnerabilities?
- Are inputs properly validated?
- Are secrets handled properly?

**Performance:**
- Any performance issues?
- Are database queries optimized?
- Are there unnecessary loops?

### 3. Automated Checks

```bash
# Run tests
npm test
# or
pytest

# Check coverage
npm run test:coverage
# or
pytest --cov

# Linting
npm run lint
# or
ruff check .

# Type checking
npm run type-check
# or
mypy

# Security scanning
npx ecc-agentshield scan
```

### 4. Generate Report

```markdown
## Review Summary

**Files Reviewed:** [list]
**Lines of Code:** [count]
**Issues Found:** [count]

## Critical Issues

- [Issue 1] - [severity] - [file:line]

## Major Issues

- [Issue 2] - [severity] - [file:line]
- [Issue 3] - [severity] - [file:line]

## Minor Issues

- [Issue 4] - [severity] - [file:line]
- [Issue 5] - [severity] - [file:line]

## Suggestions

- [Suggestion 1]
- [Suggestion 2]

## Test Coverage

- [coverage percentage]
- [uncovered lines]

## Security Assessment

- [security score]
- [recommendations]

## Overall Assessment

**Status:** ✅ Ready to merge / ⚠️ Needs changes / ❌ Blocked

**Recommendation:** [brief summary]
```

## Severity Levels

### 🔴 Critical (Must Fix)
- Security vulnerabilities
- Data loss risk
- Production outages
- Breaking changes
- Data corruption risk

### 🟠 Major (Should Fix)
- Performance issues
- Code quality problems
- Missing tests
- Security concerns
- Error handling gaps

### 🟡 Minor (Nice to Fix)
- Code style issues
- Minor performance improvements
- Documentation gaps
- Naming improvements

### 🔵 Suggestion (Optional)
- Code optimization
- Best practice suggestions
- Minor refactoring opportunities

## Example Review

```markdown
## Review: Add User Authentication

**Files:** `src/auth.js`, `src/routes/auth.js`
**Lines:** ~200
**Status:** ⚠️ Needs minor changes

### Critical Issues
None

### Major Issues
1. 🔴 Missing input validation in `login()` function
   - File: `src/auth.js:45`
   - Risk: Potential injection attack
   - Fix: Add validation before processing

2. 🟠 No error handling for invalid credentials
   - File: `src/routes/auth.js:78`
   - Risk: Information leakage
   - Fix: Return generic error message

### Minor Issues
1. 🟡 Magic number for token expiration
   - File: `src/auth.js:30`
   - Suggestion: Use constant `TOKEN_EXPIRATION = 3600`

2. 🟡 Missing JSDoc comments
   - File: `src/routes/auth.js:10`
   - Suggestion: Add documentation for public API

### Suggestions
1. Consider adding rate limiting to prevent brute force
2. Add unit tests for authentication flow
3. Consider JWT vs session-based auth for your use case

### Security Assessment
- ✅ No hardcoded secrets
- ✅ No SQL injection risk
- ✅ No XSS vulnerability
- ⚠️ Information leakage in error messages
- ✅ Proper HTTPS handling

### Test Coverage
- Coverage: 65%
- Missing: auth edge cases, error scenarios

### Overall
**Status:** ⚠️ Needs changes
**Recommendation:** Fix major issues before merging
**Estimated fixes:** 2-3 hours
```

## Common Issues to Look For

### Security Issues

```javascript
// ❌ BAD - SQL Injection
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ GOOD - Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

```javascript
// ❌ BAD - Hardcoded secret
const API_KEY = 'sk-1234567890abcdef';

// ✅ GOOD - Environment variable
const API_KEY = process.env.API_KEY;
```

```javascript
// ❌ BAD - XSS vulnerability
res.send(`Hello ${userInput}`);

// ✅ GOOD - Sanitization
res.send(`Hello ${escapeHtml(userInput)}`);
```

### Performance Issues

```javascript
// ❌ BAD - N+1 query
users.forEach(user => {
  const posts = db.query('SELECT * FROM posts WHERE user_id = ?', [user.id]);
  // process posts
});

// ✅ GOOD - Single query with JOIN
const usersWithPosts = db.query(`
  SELECT users.*, posts.*
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
`);
```

### Code Quality Issues

```javascript
// ❌ BAD - Long function
function processUserData(userData) {
  // 100+ lines of code
  // Does too many things
}

// ✅ GOOD - Small, focused functions
function processUserData(userData) {
  const validated = validateUserData(userData);
  const processed = transformUserData(validated);
  const saved = saveUserData(processed);
  return saved;
}
```

## Best Practices for Reviewers

### Be Constructive

- Focus on improvement, not criticism
- Explain WHY something is wrong
- Provide specific examples
- Suggest alternatives

### Be Consistent

- Apply same standards to all code
- Be fair and objective
- Consider context and constraints

### Be Thorough

- Review all relevant code
- Check edge cases
- Think about security
- Consider performance

### Be Timely

- Review promptly
- Give feedback in a reasonable time
- Don't let reviews pile up

### Be Collaborative

- Open to discussion
- Willing to learn
- Encouraging
- Supportive

## After Review

1. **Document findings:** Create review report
2. **Communicate:** Share findings with author
3. **Follow up:** Track fixes
4. **Close review:** Mark as complete when ready
5. **Learn:** Document lessons learned

## Security Review Specifics

For security reviews, also check:

- OWASP Top 10 vulnerabilities
- Dependency vulnerabilities
- Authentication/authorization
- Data protection
- Network security
- Logging and monitoring
- Incident response

## Performance Review Specifics

For performance reviews, also check:

- Database query optimization
- API response times
- Memory usage
- CPU usage
- Cache effectiveness
- Network usage
- Scalability

## Test Review Specifics

For test reviews, also check:

- Test coverage
- Test quality
- Test maintainability
- Test organization
- Test data
- Test isolation
