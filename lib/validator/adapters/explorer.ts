type ExplorerLinksInput = {
  voteAccount: string;
};

export function buildExplorerUrls({ voteAccount }: ExplorerLinksInput) {
  return {
    solscan:
      process.env.STEP_EXPLORER_SOLSCAN ??
      `https://solscan.io/account/${voteAccount}`,
    explorer:
      process.env.STEP_EXPLORER_OFFICIAL ??
      `https://explorer.solana.com/address/${voteAccount}?cluster=mainnet-beta`,
    validatorsApp:
      process.env.STEP_EXPLORER_VALIDATORS_APP ??
      `https://www.validators.app/validators/${voteAccount}?locale=en&network=mainnet`
  };
}
