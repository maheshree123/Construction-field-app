import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}
      >
        <span className="text-lg">
          {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
        </span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
