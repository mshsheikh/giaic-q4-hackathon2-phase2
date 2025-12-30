---
id: 002
title: Phase II-B Cloud Native Blueprints and Agent Skills
stage: general
date: 2025-12-30
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: master
user: general
command: "cli run --name phase2b_cloud_native_blueprints_and_agent_skills"
labels: [cloud-native,deployment,environment,cicd,agent-skills,reusable-intelligence]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - specs/cloud/blueprint.md
 - specs/cloud/env-contract.md
 - specs/cloud/ci-cd.md
 - specs/agent-skills/deployment-planner.md
 - specs/agent-skills/env-validator.md
 - specs/agent-skills/api-contract-verifier.md
tests:
 - none
---

## Prompt

```bash
claude code cli run \\
--name "phase2b_cloud_native_blueprints_and_agent_skills" \\
--objective "Phase II-B: Create cloud-native deployment blueprints, environment contracts, CI/CD strategy, and reusable Agent Skills using Spec-Kit Plus. No implementation or scaffolding. Maximize bonus points via reusable intelligence." \\
--steps "
1. Constitution Extension (Reusable Intelligence):
   - Open .specify/memory/constitution.md
   - Extend constitution with cloud-native principles:
     • Platform-agnostic deployment
     • Environment-driven configuration
     • Zero secrets in repo
     • Reusable agent skills over hard-coded logic
   - Save PHR for constitution update

2. Cloud Blueprint Spec:
   - Create /specs/cloud/blueprint.md
   - Define:
     • Frontend hosting (Vercel)
     • Backend hosting (Railway / Fly.io)
     • Database (Neon PostgreSQL)
     • Auth provider (Better Auth)
     • Network boundaries
   - Include diagrams (text-based)
   - Save PHR

3. Environment Contract Spec:
   - Create /specs/cloud/env-contract.md
   - Define required environment variables:
     • FRONTEND
     • BACKEND
     • DATABASE
     • AUTH
   - Specify:
     • Required vs optional
     • Dev vs prod differences
     • Secret handling rules
   - Save PHR

4. CI/CD Blueprint Spec:
   - Create /specs/cloud/ci-cd.md
   - Define:
     • Branch strategy (main, feature)
     • Validation steps (spec linting, tests)
     • Deployment triggers
     • Rollback strategy
   - Save PHR

5. Agent Skills Definition:
   - Create /specs/agent-skills/
     • deployment-planner.md
     • env-validator.md
     • api-contract-verifier.md
   - Each skill must define:
     • Purpose
     • Inputs
     • Outputs
     • Reusability scope
   - Save PHR per skill

6. Validation:
   - Ensure no code is generated
   - Ensure specs are cloud-provider neutral
   - Ensure skills are reusable across future projects
   - Ensure Phase 3 can directly consume these specs

7. Output:
   - All specs saved under /specs/cloud and /specs/agent-skills
   - Constitution updated
   - PHR history generated for every step
"
```

## Response snapshot

Successfully completed Phase II-B cloud-native deployment blueprints and reusable agent skills:

1. Extended constitution.md with cloud-native principles including platform-agnostic deployment, environment-driven configuration, zero secrets in repo, and reusable agent skills over hard-coded logic.

2. Created cloud/blueprint.md defining platform-agnostic deployment architecture with components for frontend (Vercel), backend (Railway/Fly.io), database (Neon PostgreSQL), and authentication (Better Auth) with network boundaries and security considerations.

3. Created cloud/env-contract.md defining environment variables for all environments (dev/staging/prod) with frontend, backend, database, and auth variables, secret handling rules, and validation requirements.

4. Created cloud/ci-cd.md defining CI/CD strategy with branch strategy, pipeline stages (validation, testing, security), deployment triggers, rollback strategy, and platform-agnostic considerations.

5. Created three reusable agent skills in specs/agent-skills/:
   - deployment-planner.md: Plans cloud-native deployments based on application specs
   - env-validator.md: Validates environment configurations against requirements
   - api-contract-verifier.md: Verifies API implementations against specifications

6. All specifications validated for consistency, cloud-provider neutrality, and reusability across future projects.

All specifications are complete, consistent, and ready for Phase III implementation.

## Outcome

- ✅ Impact: Complete cloud-native foundation with reusable agent skills created
- 🧪 Tests: none
- 📁 Files: 7 specification files created/updated across cloud and agent skills
- 🔁 Next prompts: Ready for Phase III implementation based on these cloud-native specs
- 🧠 Reflection: All specs implement cloud-native principles with strong focus on reusability

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - All specifications consistent and complete
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin Phase III implementation based on these specifications