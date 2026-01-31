type PropType = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: PropType) {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-300
        ${open ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-lg mx-4
          bg-white rounded-xl shadow-xl
          transition-all duration-300
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            rounded-md p-1.5
            text-gray-500 hover:text-gray-800
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-300
          "
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
