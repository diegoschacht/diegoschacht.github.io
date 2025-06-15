import { ReactNode } from 'react';

interface Props {
  date: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function TimelineCard({ date, title, description, icon }: Props) {
  return (
    <article className="relative flex flex-col items-start p-4 bg-white dark:bg-gray-800 rounded shadow">
      <time className="text-sm font-semibold text-blue-600">{date}</time>
      <h3 className="text-xl font-bold mt-1">{title}</h3>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{description}</p>
      {icon && <div className="absolute -left-8 top-4">{icon}</div>}
    </article>
  );
}
