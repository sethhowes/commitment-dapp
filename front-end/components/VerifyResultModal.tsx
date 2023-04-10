interface VerifyResultModalProps {
  show: boolean;
  onClose: () => void;
  completed: boolean;
  onUpdateParentState: () => void;
}

const VerifyResultModal = ({
  show,
  onClose,
  completed,
  onUpdateParentState
}: VerifyResultModalProps) => {

  const onCloseModalClick = () => {
    onClose();
    onUpdateParentState();
  }

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg">
        {completed ? (
          <h2 className="text-3xl font-semibold mb-4">🏆 Run completed!</h2>
        ) : (
          <h2 className="text-3xl font-semibold mb-6">
            😢 Run not completed...
          </h2>
        )}
        <div className="text-center">
          <button
            className="bg-[#B90202] text-white rounded-2xl drop-shadow-lg px-5 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer"
            onClick={onCloseModalClick}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyResultModal;
