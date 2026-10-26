# portfolio-website

One-page portfolio for Thanapon Chanla-or: Create React App + TypeScript, styled only with Tailwind v3, animated only with GSAP (ScrollTrigger, Flip via `@gsap/react`).

## Commands
<!-- the exact commands CI runs; keep in sync with .github/workflows/ci.yml -->
- Install: `npm ci`
- Lint: no separate script — ESLint runs inside `npm run build` (with `CI=true`, warnings fail the build)
- Test: `npm test -- --watchAll=false`
- Build: `npm run build`
- Run locally: `npm start`

## Git workflow (strict)
- Branches: `main` = production, `dev` = integration (default branch), `feature/<short-desc>` = all work.
- Flow: `feature/*` → PR into `dev` → PR `dev` into `main`. The `source-branch` check rejects anything else.
- `main` and `dev` are protected: no direct pushes (admins included), PRs need the `build` and `source-branch` checks to pass, and the branch must be up to date.
- **The repo owner merges every PR.** Claude must never push to, merge into, or force-push `main` or `dev`, never enable auto-merge, and never bypass hooks or checks.
- To make a change, Claude:
  1. `git checkout dev && git pull && git checkout -b feature/<short-desc>`
  2. makes the change, then runs Test/Build above locally
  3. commits (imperative subject ≤ 72 chars, body explains why), pushes, and runs `gh pr create --base dev` using `.github/pull_request_template.md`
  4. waits for `gh pr checks --watch` and gives the owner the PR link
  5. offers a `dev → main` release PR after the owner has merged into `dev`

## Deployment
- Deploys run only from GitHub Actions on push to `main`, i.e. when a `dev → main` PR is merged (`.github/workflows/deploy.yml`). There are no manual or local deploys.
- Site → Netlify (existing site `thanapon-chanlaor-portfolio`): https://thanapon-chanlaor-portfolio.netlify.app
- Build-time config: none yet. When the Contact section is re-enabled it needs `REACT_APP_API_URL` (repo variable); like every `REACT_APP_*` value it ends up public in the JS bundle. Runtime config: none (static site).
- Deploy credentials (GitHub secrets): `NETLIFY_SITE_ID`, `NETLIFY_AUTH_TOKEN` (Netlify → User settings → Applications → personal access token).

## Secrets
- Real values live only in the gitignored `.env` (local), GitHub secrets/variables (CI) and the host dashboard (runtime).
- Never commit them, or echo them in logs, PRs or chat. Add every new var name to `.env.example` with no value.

## Notes
- All site copy lives in `src/data/*` (typed by `src/types/index.ts`); components only render it.
- Keep claims to what the owner actually did. Resume wording can overstate (e.g. the Fund Management "calculation rules / SRS sign-off" line) — check with the owner before amplifying anything.
- The This site and Contact sections are switched off by commenting them out in `src/App.tsx` (and their nav entries in `src/data/profile.ts` / `Navbar.tsx`). Contact's test renders the component directly.
- The downloadable resume is a PDF in `public/`; `profile.cvUrl` points to it and `profile.cvFileName` sets the saved name.
- Styles use rem, not px (Tailwind defaults for borders/rings are the exception).
