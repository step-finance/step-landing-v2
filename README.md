# Step Validator Website

A greenfield Next.js rebuild of the Step website focused on validator trust, live metrics, and a future non-custodial staking path.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static-first pages with cached validator snapshot helpers

## Environment

Optional server environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `SOLANA_RPC_URL`
- `STEP_VALIDATOR_NAME`
- `STEP_VOTE_ACCOUNT`
- `STEP_IDENTITY_PUBKEY`
- `STEP_VALIDATOR_COMMISSION`
- `STEP_EXTERNAL_STAKE_URL`
- `STEP_EXPLORER_SOLSCAN`
- `STEP_EXPLORER_OFFICIAL`
- `STEP_EXPLORER_VALIDATORS_APP`
- `STEP_NETWORK_AVERAGE_UPTIME`
- `STEP_PERFORMANCE_VS_NETWORK_PCT`

Without env configuration, the site renders with a realistic mock snapshot so design and content work can proceed independently of backend integration.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
```
