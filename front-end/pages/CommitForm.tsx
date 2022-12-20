export default function CommitForm({ connected }: any): any {
  if (connected) {
    return (
      <form action="/api/form" method="post">
        <label htmlFor="amount">Commitment amount: </label>
        <input
          type="text"
          placeholder="Dollar amount"
          id="amount"
          name="amount"
        />
        <label htmlFor="completion-date">Complete by: </label>
        <input
          type="datetime-local"
          id="completion-date"
          name="completion-date"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
