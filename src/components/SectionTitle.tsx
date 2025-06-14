import { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">
      {children}
    </h2>
  );
}
