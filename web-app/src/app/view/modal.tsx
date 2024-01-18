export default function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed text-black inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    {children}
                </div>
            <button 
                id="ok-btn"
                className="absolute -right-4 -top-4 px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-full shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                onClick={onClose}
            >
                X
            </button>
            </div>
        </div>
    );
};
