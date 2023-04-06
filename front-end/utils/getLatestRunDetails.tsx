import contract from "./contract";

export default async function getLatestRunDetails() {
      let { commitAmount, completeBy, completed, checked } = await contract.getLatestRun();
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