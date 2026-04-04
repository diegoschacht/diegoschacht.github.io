import { ReactNode } from 'react';
import RevealFx from './RevealFx';

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <RevealFx translateY={20} delay={0.1} duration={0.6}>
      <h2 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-2">
        {children}
      </h2>
    </RevealFx>
  );
}
