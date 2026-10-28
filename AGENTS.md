<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Pull request titles and descriptions

This is the organization-wide standard, taken from iatpm. The PR is the review contract: from its title and body alone, a reviewer must be able to keep, change or reject every meaningful behavior in the diff.

### Title

- One imperative sentence in sentence case that names the outcome and where it lands: `Fix Crusty Lanes spin direction controls and rotation hints`, `Require earned campaign XP before cashier income`, `Give preview builds 30 minutes instead of 15`.
- For a tracked issue, start with its key and a colon, then a capitalized verb: `IATPM-207: Isolate preview tokens and bind CI validation proofs`, `TY-153: Keep root regression tests dependency-free`. Multica links a PR to its issue through this prefix or through `Closes TY-n` in the body.
- A release or promotion PR says what moves where: `Release TY-153 SEO fixes to production`.
- No type prefixes (`feat:`, `fix:`, `chore:`), bracket tags, emoji, trailing period, or vague words such as "updates", "misc", "WIP" or "changes". Aim for 72 characters or fewer.
- Retitle the PR when its scope changes. The title must describe the whole diff, not the first commit.

### Description

- Before opening or updating a PR, inspect the complete `base...HEAD` diff: commits, changed files, migrations, configuration, tests and affected runtime paths. Derive the description from that audit, not just from the ticket, the commit messages or the happy path. Keep it current after every material push.
- Keep these exact headings in this order, even for a small or documentation-only PR: **Summary**; **Features added or improved**; **Feature regressions / existing behavior changed**; **Other fixes**; **Regression coverage**; **Reviewer checklist**; **Key files**; **Implementation notes**; **Validation**. Do not replace, collapse, rename or omit sections. Write `None.` when a section has nothing in it. When no behavior changed, write `None identified after full-diff audit.`, and only after checking.
- Write one short prose paragraph in Summary. Group features under descriptive `###` headings, with one concrete bullet per independently reviewable behavior, naming who or what it affects.
- Audit anything removed, replaced, relocated, hidden, narrowed, redirected, made less discoverable, or given a new default or privacy meaning. Give each changed behavior its own subsection under **Feature regressions / existing behavior changed**, with the exact labels **Before this PR:**, **With this PR:** and **Review impact:**. Cover user-facing behavior, API, schema and cache contracts, data and storage paths, permissions, configuration, architecture, operations, compatibility paths, and effects on other open PRs. Never hide a behavior change under "refactor" or "cleanup". Fix unintended changes before review.
- Start reviewer checklist items unchecked. Use them for unresolved product or architecture decisions and for high-risk manual checks. Mark a decision complete only after the responsible human confirms it; passing tests do not approve a decision.
- Under **Key files**, name representative implementation, migration, documentation and test entry points. Under **Implementation notes**, state migration and backfill needs, dependency and lockfile changes, environment and configuration changes, auth and privacy boundaries, rollout requirements and compatibility constraints, and say explicitly when none apply.
- Under **Regression coverage**, name the tests or checks that protect added and changed behavior, including material gaps. Under **Validation**, give the exact commands or checks and their actual results, separating passing, failing, and not-run or unverified evidence. For user-facing changes, also cover each supported language, light and dark themes, touch and keyboard, short screens, and the preview link where the repository has previews. Never present an unrun check as passing.
- A complete-looking description does not replace reviewing the full diff. Workflow-managed comments (previews, bots) may accompany the body but never replace any of its sections.

Body skeleton:

```markdown
## Summary

One short paragraph: the complete outcome and the surfaces it affects.

## Features added or improved

### Feature area

- Concrete user-visible or operational change, and who or what it affects.

## Feature regressions / existing behavior changed

### Behavior changed

- **Before this PR:** What the base branch does.
- **With this PR:** The replacement, relocation, new default or removal.
- **Review impact:** What users, data, operations or other PRs experience differently, and what the reviewer must decide or verify.

## Other fixes

- Defect corrected without redefining intended behavior.

## Regression coverage

- Test or check protecting the added or changed behavior, and any material gap.

## Reviewer checklist

- [ ] Unresolved product or architecture decision, or high-risk manual check.

## Key files

- Area: `path/to/file`

## Implementation notes

- Migrations, dependencies, configuration, auth/privacy, rollout and compatibility; say when none apply.

## Validation

- `exact command or check`: actual result, or not run and why.
```
