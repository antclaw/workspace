# Example: Authentication Implementation

A complete multi-agent workflow for implementing authentication in a web application.

## Overview

**Goal:** Implement user authentication with email/password and JWT tokens
**Stack:** React (frontend) + Node.js + PostgreSQL (backend)
**Duration:** ~4-6 hours with multiple agents

## Workflow

### Phase 1: Research (Researcher Agent)

```bash
bd spawn "Research authentication solutions for React + Node.js + PostgreSQL. Focus on: 1) JWT vs session-based auth, 2) Security best practices, 3) Database schema design, 4) Token refresh strategies. Provide comparison and recommendation." \
  --agent researcher \
  --label research-auth \
  --timeout 300 \
  --context-messages 0
```

**Expected Output:**
- Comparison of JWT vs session-based
- Security best practices
- Database schema recommendations
- Token refresh strategy
- Final recommendation with justification

---

### Phase 2: Planning (Planner Agent)

```bash
bd spawn "Create detailed implementation plan for authentication system based on research findings. Include: 1) Database schema (users table, tokens table), 2) API endpoints needed, 3) Frontend components, 4) Testing strategy, 5) Security measures, 6) Rollout plan. Break down into 5-7 phases." \
  --agent planner \
  --label plan-auth \
  --context-messages 3 \
  --timeout 300
```

**Expected Output:**
- Phase 1: Database schema
- Phase 2: Backend API setup
- Phase 3: JWT implementation
- Phase 4: Frontend integration
- Phase 5: Testing
- Phase 6: Documentation
- Phase 7: Deployment

---

### Phase 3: Implementation - Database (Coder Agent)

```bash
bd spawn "Implement Phase 1 (Database Schema): Create migration for users and tokens tables. Include: id, email, password_hash, created_at, updated_at for users; id, user_id, token, expires_at, created_at for tokens. Use bcrypt for password hashing and proper indexing." \
  --agent coder \
  --label auth-db \
  --context-messages 5 \
  --timeout 600
```

**Expected Output:**
- Migration file
- Proper indexes
- Password hashing implementation
- Error handling

---

### Phase 4: Implementation - Backend API (Coder Agent)

```bash
bd spawn "Implement Phase 2-3 (Backend API): Create authentication endpoints: POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me. Use JWT with 1 hour expiry. Include validation, error handling, and security measures. Use TypeScript for type safety." \
  --agent coder \
  --label auth-api \
  --context-messages 5 \
  --timeout 600
```

**Expected Output:**
- Complete API implementation
- JWT middleware
- Input validation
- Error handling
- TypeScript types

---

### Phase 5: Implementation - Frontend (Coder Agent)

```bash
bd spawn "Implement Phase 4 (Frontend Integration): Create React components for: Login form, Register form, Protected route wrapper, JWT token storage (localStorage with HttpOnly cookies option). Include form validation, error handling, and loading states." \
  --agent coder \
  --label auth-frontend \
  --context-messages 5 \
  --timeout 600
```

**Expected Output:**
- Login component
- Register component
- Protected route component
- Token management utility
- Form validation

---

### Phase 6: Testing (Coder Agent)

```bash
bd spawn "Implement Phase 5 (Testing): Write comprehensive tests: 1) Unit tests for auth utilities, 2) Integration tests for API endpoints, 3) Frontend component tests, 4) E2E tests for login flow using Playwright. Aim for 80%+ coverage." \
  --agent coder \
  --label auth-tests \
  --context-messages 5 \
  --timeout 600
```

**Expected Output:**
- Unit tests
- Integration tests
- Component tests
- E2E tests
- Test coverage report

---

### Phase 7: Code Review (Reviewer Agent)

```bash
bd spawn "Review authentication implementation for: 1) Security vulnerabilities, 2) Code quality, 3) Error handling, 4) Performance, 5) Best practices, 6) Documentation completeness. Provide specific issues with severity and recommendations." \
  --agent reviewer \
  --label auth-review \
  --context-messages 5 \
  --timeout 300
```

**Expected Output:**
- Security review findings
- Code quality issues
- Performance suggestions
- Best practice violations
- Documentation gaps
- Overall assessment

---

### Phase 8: Documentation (Doc Writer Agent)

```bash
bd spawn "Create comprehensive documentation for authentication system: 1) README with setup instructions, 2) API documentation with examples, 3) Security best practices guide, 4) Troubleshooting guide, 5) Migration guide if upgrading. Include code examples and diagrams where helpful." \
  --agent researcher \
  --label auth-docs \
  --context-messages 5 \
  --timeout 300
```

**Expected Output:**
- README with setup guide
- API documentation
- Security guide
- Troubleshooting guide
- Examples

---

### Phase 9: Final Review and Deployment

```bash
# Security scan
bd spawn "Run security scan on authentication implementation" --agent reviewer --label security-scan

# Review all changes
bd spawn "Review complete authentication implementation" --agent reviewer --context-messages 10

# Deploy
bd spawn "Create deployment plan for authentication system" --agent researcher --label deployment
```

---

## Summary

**Agents Used:**
1. Researcher (1x) - Research phase
2. Planner (1x) - Planning phase
3. Coder (3x) - Implementation phases
4. Reviewer (2x) - Review phases
5. Researcher (1x) - Documentation

**Total Time:** ~4-6 hours
**Tasks Completed:**
- ✅ Database schema design
- ✅ Backend API implementation
- ✅ Frontend integration
- ✅ Testing (unit, integration, E2E)
- ✅ Security review
- ✅ Documentation

**Key Learnings:**
- Multi-agent workflow speeds up complex implementations
- Each agent can focus on its specialization
- Context chaining ensures consistency
- Reviewers catch issues before deployment

## Tips for Success

1. **Start with clear research questions**
2. **Use context chaining effectively**
3. **Set appropriate timeouts**
4. **Review each phase before proceeding**
5. **Keep agents focused on their specialty**
6. **Use labels to track progress**
7. **Close tasks promptly when complete**

## Next Steps

After completion:
1. Merge all changes
2. Update CHANGELOG
3. Deploy to staging
4. Monitor for issues
5. Gather user feedback
