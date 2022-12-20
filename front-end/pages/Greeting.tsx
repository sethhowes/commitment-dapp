export default function Greeting({connected, address}: any) {
    if (connected) {
        return (
            <>
                <p>You have successfully connected your account!</p>
                <p>You are connected to wallet with the address: {address}</p>
            </>
            )
    } else {
        return <p>You have not connected your account!</p>
    }
}