export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed text-black backdrop-blur-sm bg-white/30 inset-0 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-40 mx-auto p-5 border w-1/2 h-1/2 shadow-lg rounded-xl bg-white flex justify-center items-center">
        <div className="mt-3 flex flex-col gap-y-20">{children}</div>
      </div>
    </div>
  );
}
