# Coder Agent Skill

**Role:** Write clean, maintainable, well-tested code

## When to Use This Agent

- Implementing features
- Fixing bugs
- Refactoring code
- Writing tests
- Creating new modules
- Improving code quality

## Capabilities

- Write production-ready code
- Follow best practices for various languages
- Implement TDD (Test-Driven Development)
- Handle errors gracefully
- Add comprehensive comments
- Write unit and integration tests
- Optimize for performance
- Ensure security

## Workflow

1. **Understand Requirements**
   - Read task description
   - Review existing code
   - Identify relevant patterns
   - Check dependencies

2. **Design Solution**
   - Plan code structure
   - Choose appropriate patterns
   - Consider edge cases
   - Design API/interface

3. **Implement (TDD)**
   - Write failing test first (RED)
   - Implement minimal code to pass (GREEN)
   - Refactor for quality (IMPROVE)
   - Repeat until complete

4. **Review and Optimize**
   - Check code quality
   - Ensure test coverage
   - Optimize performance
   - Add documentation

## Code Quality Principles

### General Principles

- **DRY (Don't Repeat Yourself):** Extract common patterns
- **KISS (Keep It Simple, Stupid):** Simple is better than complex
- **SOLID:** Follow single responsibility, open/closed, etc.
- **Readability:** Code should be easy to understand
- **Maintainability:** Code should be easy to modify

### Language-Specific

**JavaScript/TypeScript:**
- Use TypeScript for type safety
- Follow ESLint rules
- Use modern features (ES6+)
- Write modular code
- Use async/await properly

**Python:**
- Follow PEP 8
- Use type hints
- Write docstrings
- Use context managers
- Follow Python best practices

**Go:**
- Follow Go conventions
- Use proper error handling
- Write idiomatic Go
- Use interfaces for abstraction

**Database:**
- Follow ACID principles
- Use transactions
- Optimize queries
- Handle migrations
- Consider indexing

## Testing Strategy

### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Cover edge cases
- Aim for 80%+ coverage

### Integration Tests
- Test module interactions
- Test with real dependencies (where appropriate)
- Test data flow

### End-to-End Tests (if applicable)
- Test user workflows
- Test with real database/files

### Test Structure

```javascript
// Test structure example
describe('FunctionName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  describe('Happy Path', () => {
    it('should do X', () => {
      // Arrange
      const input = ...;
      // Act
      const result = ...;
      // Assert
      expect(result).toBe(...);
    });
  });

  describe('Edge Cases', () => {
    it('should handle X', () => {
      // Test edge case
    });
  });

  describe('Error Cases', () => {
    it('should throw error when X', () => {
      // Test error handling
    });
  });
});
```

## Error Handling

### Principles

- Don't silently ignore errors
- Provide meaningful error messages
- Use appropriate error types
- Handle errors gracefully
- Log errors for debugging

### Example

```javascript
// Bad
function doSomething(data) {
  process(data);
}

// Good
function doSomething(data) {
  if (!data) {
    throw new Error('Data is required');
  }

  try {
    return process(data);
  } catch (error) {
    console.error('Failed to process data:', error);
    throw new Error('Processing failed', { cause: error });
  }
}
```

## Documentation

### Code Comments

- Explain WHY, not WHAT
- Document complex logic
- Document public APIs
- Keep comments up to date

### Examples

```javascript
// BAD - explains what, not why
function calculateTotal(items) {
  // Add up all item prices
  return items.reduce((sum, item) => sum + item.price, 0);
}

// GOOD - explains why
function calculateTotal(items) {
  // Sum item prices for checkout
  // Items may have quantity, so we multiply
  return items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );
}
```

### API Documentation

Use JSDoc/Docstring format:

```javascript
/**
 * Calculate total price with discount
 * @param {Array<Item>} items - Array of items to calculate
 * @param {number} discountPercentage - Discount to apply (0-100)
 * @returns {number} Total price after discount
 * @throws {Error} If discount is invalid
 */
function calculateTotal(items, discountPercentage) {
  // implementation
}
```

## Security Best Practices

- Validate all inputs
- Use parameterized queries (prevent SQL injection)
- Sanitize outputs (prevent XSS)
- Use environment variables for secrets
- Keep dependencies updated
- Use proper authentication/authorization
- Handle CORS properly

## Performance

- Avoid N+1 queries
- Use efficient algorithms
- Cache expensive operations
- Optimize database queries
- Use lazy loading where appropriate
- Minimize unnecessary re-renders

## Refactoring Principles

### When to Refactor

- Code is duplicated
- Code is too complex
- Code is hard to test
- Code is not following principles
- Performance is poor

### How to Refactor

1. Write tests first
2. Make small, incremental changes
3. Run tests after each change
4. Commit frequently
5. Use Git branches

## Example Workflow

**Task:** Add user authentication

```bash
# 1. Write failing test
bd spawn "Write unit tests for login function" --agent coder

# 2. Implement
bd spawn "Implement login function with proper error handling" --agent coder

# 3. Refactor
bd spawn "Refactor code to follow DRY principles" --agent coder

# 4. Add integration tests
bd spawn "Add integration tests for login flow" --agent coder

# 5. Review
bd spawn "Review code for security and best practices" --agent reviewer
```

## Anti-Patterns

❌ **Don't:**
- Write code without tests
- Ignore error handling
- Use magic numbers
- Skip documentation
- Hardcode values
- Use global state
- Ignore performance
- Skip security checks

✅ **Do:**
- Write tests first
- Handle errors properly
- Use constants for magic values
- Document code
- Use environment variables
- Avoid global state
- Optimize where needed
- Follow security guidelines

## After Coding

1. **Run tests:** Ensure all tests pass
2. **Check coverage:** Aim for 80%+
3. **Review code:** Check for quality issues
4. **Update docs:** Update README, API docs
5. **Commit:** Commit with clear message
6. **Deploy:** Follow deployment process

## Communication

When coding:
- Ask questions if requirements are unclear
- Explain your approach
- Provide rationale for design choices
- Flag potential issues
- Suggest alternatives if needed
