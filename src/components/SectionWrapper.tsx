import { ReactNode } from 'react';

export default function SectionWrapper({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="py-16 px-4 max-w-5xl mx-auto">
      {children}
    </section>
  );
}
