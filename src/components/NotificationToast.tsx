import { useEffect } from 'react';

interface Props {
  message: string | null;
  type: 'success' | 'error';
  onClear: () => void;
}

export default function NotificationToast({ message, type, onClear }: Props) {
  useEffect(() => {
    if (message) {
      const t = setTimeout(onClear, 5000);
      return () => clearTimeout(t);
    }
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
    >
      {message}
    </div>
  );
}
