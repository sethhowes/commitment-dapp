import contract from "./contract";

export default async function getLatestRunDetails() {
    const runsCommitted = await contract.runsCommitted();
    if (runsCommitted == 0) {
      return {
        commitAmount: "",
        completeBy: "",
        completed: "",
        checked: true,
      };
    } else {
      const latestRunIndex = parseInt(runsCommitted, 10);
      let { commitAmount, completeBy, completed, checked } = await contract.Runs(
        latestRunIndex - 1
      );
      commitAmount = parseInt(commitAmount, 10) / 1000000000;
      completeBy = parseInt(completeBy, 10) * 1000;
      completeBy = new Date(completeBy);
      completeBy = completeBy.getTime();
      completed = completed ? "yes" : "no";
      return {
        commitAmount: commitAmount,
        completeBy: completeBy,
        completed: completed,
        checked: checked,
      };
    }
  }