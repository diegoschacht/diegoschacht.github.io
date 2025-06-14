import { FormEvent, useState } from 'react';
import NotificationToast from './NotificationToast';

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // placeholder POST request
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': crypto.randomUUID() },
        body: JSON.stringify(values),
      });
      setToast({ type: 'success', message: 'Message sent!' });
      setValues({ name: '', email: '', message: '' });
    } catch {
      setToast({ type: 'error', message: 'Failed to send.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          aria-invalid={values.name === ''}
          className="border p-2 rounded"
        />
      </label>
      <label className="flex flex-col gap-1">
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          aria-invalid={values.email === ''}
          className="border p-2 rounded"
        />
      </label>
      <label className="flex flex-col gap-1">
        Message
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          required
          aria-invalid={values.message === ''}
          className="border p-2 rounded"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
      <NotificationToast
        message={toast?.message ?? null}
        type={toast?.type ?? 'success'}
        onClear={() => setToast(null)}
      />
    </form>
  );
}
