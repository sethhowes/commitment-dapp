import contract from "./contract";

export async function getRunsCommitted() {
  const hexRunsCommitted = await contract.runsCommitted();
  const runsCommitted = parseInt(hexRunsCommitted, 16);
  return runsCommitted;
}