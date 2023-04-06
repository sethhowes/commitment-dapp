interface StravaButtonProps {
  stravaConnected: boolean;
  walletAddress: string;
}

export default function StravaButton({ stravaConnected, walletAddress }: StravaButtonProps) {

  return stravaConnected ? (
    <button
      disabled
      className="p-2 disabled:opacity-75 text-white mr-4 py-2 px-4 rounded-xl bg-rose-500"
    >
      Strava Connected!
    </button>
  ) : (
    <a
      href={`http://www.strava.com/oauth/authorize?client_id=83375&response_type=code&redirect_uri=http://localhost:3000/api/exchange_token&approval_prompt=force&scope=activity:read_all&state=${walletAddress}`}
    >
      <button
        className="p-2 disabled:opacity-75 text-white mr-4 py-2 px-4 rounded-xl bg-rose-500"
      >
        Connect Strava
      </button>
    </a>
  );
}
