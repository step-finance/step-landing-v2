import { buildExplorerUrls } from "@/lib/validator/adapters/explorer";

const DEFAULT_VALIDATOR_NAME = "Step Finance";
const DEFAULT_VOTE_ACCOUNT = "StepeLdhJ2znRjHcZdjwMWsC4nTRURNKQY8Nca82LJp";
const DEFAULT_IDENTITY_PUBKEY = "sTepQGoReJq2tBKStL19DT6nnGHcGiAvFjyYaokLyuM";
const DEFAULT_RPC_URL = "https://api.mainnet-beta.solana.com";
const DEFAULT_STAKE_URL =
  "https://app.jpool.one/validators/StepeLdhJ2znRjHcZdjwMWsC4nTRURNKQY8Nca82LJp";
const DEFAULT_FIRST_STAKE_EPOCH = 398;
const DEFAULT_MEV_COMMISSION = 0;

export function getPublicRpcUrl() {
  return process.env.SOLANA_RPC_URL ?? DEFAULT_RPC_URL;
}

export function getValidatorConfig() {
  const voteAccount = process.env.STEP_VOTE_ACCOUNT ?? DEFAULT_VOTE_ACCOUNT;
  const identityPubkey = process.env.STEP_IDENTITY_PUBKEY ?? DEFAULT_IDENTITY_PUBKEY;
  const explorerUrls = {
    ...buildExplorerUrls({ voteAccount }),
    validatorsApp:
      process.env.STEP_EXPLORER_VALIDATORS_APP ??
      `https://www.validators.app/validators/${identityPubkey}/vote_accounts/${voteAccount}?locale=en&network=mainnet`
  };

  return {
    name: process.env.STEP_VALIDATOR_NAME ?? DEFAULT_VALIDATOR_NAME,
    network: "Solana Mainnet",
    tagline:
      "A long-running Solana validator backed by Step's work across the ecosystem since early 2021.",
    voteAccount,
    identityPubkey,
    firstStakeEpoch: Number(process.env.STEP_FIRST_STAKE_EPOCH ?? DEFAULT_FIRST_STAKE_EPOCH),
    mevCommission: Number(process.env.STEP_MEV_COMMISSION ?? DEFAULT_MEV_COMMISSION),
    externalStakeUrl: process.env.STEP_EXTERNAL_STAKE_URL ?? DEFAULT_STAKE_URL,
    explorerUrls,
    rpcUrl: getPublicRpcUrl()
  };
}
