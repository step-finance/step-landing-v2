# Step Validator Website

A Next.js landing page for the Step validator on Solana.

The site is intentionally small:
- homepage with live validator data
- contributions page covering Step's broader Solana history
- no custom backend
- live data pulled from public sources during page render

## Current Product

- `"/"`: validator landing page
- `"/contributions"`: Step's product, media, event, education, and RWA history on Solana

Live data comes from:
- public Solana RPC
- StakeWiz public API
- Jito public API

If a live source is unavailable, the UI degrades to `Unavailable` instead of showing fake fallback data.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static-first rendering with live server-side fetches from public APIs

## Environment

See `.env.example`.

Current optional server environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `SOLANA_RPC_URL`
- `STEP_VALIDATOR_NAME`
- `STEP_VOTE_ACCOUNT`
- `STEP_IDENTITY_PUBKEY`
- `STEP_FIRST_STAKE_EPOCH`
- `STEP_MEV_COMMISSION`
- `STEP_EXTERNAL_STAKE_URL`
- `STEP_EXPLORER_SOLSCAN`
- `STEP_EXPLORER_OFFICIAL`
- `STEP_EXPLORER_VALIDATORS_APP`

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
```

## Notes

- `.env` is ignored and should not be committed.
- `pnpm-lock.yaml` is intended to be committed.
- The public RPC in `.env.example` is suitable for development, not production traffic.
