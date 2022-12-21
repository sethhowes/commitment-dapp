export default function MetamaskConnect({connected, toConnect}) {
  
  
    if (!connected) {
    return (
        <>
      <button
        onClick={toConnect}
        className="bg-sky-500	rounded-full py-1 px-3 text-white m-4"
        >
        Connect to Metamask
      </button>
          </>
    );
  }
}
