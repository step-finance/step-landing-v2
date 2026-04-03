export async function getPublicComparisonData() {
  const networkAverage = Number(process.env.STEP_NETWORK_AVERAGE_UPTIME ?? "99.64");
  const performanceVsNetworkPct = Number(
    process.env.STEP_PERFORMANCE_VS_NETWORK_PCT ?? "0.34"
  );

  return {
    networkAverage,
    performanceVsNetworkPct,
    updatedAt: new Date().toISOString()
  };
}
