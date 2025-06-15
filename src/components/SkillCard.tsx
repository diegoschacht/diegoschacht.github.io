import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function SkillCard({ icon, title, description }: Props) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:-translate-y-1 transition-transform">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
