export default function Greeting({connected, address}: any) {
    if (connected) {
        return (
            <div className="grid space-y-2 place-items-center mt-4">
                <p>You have successfully connected your account!</p>
                <p>You are connected to address: {address}</p>
            </div>
            )
    } else {
        return <p>You have not connected your account!</p>
    }
}