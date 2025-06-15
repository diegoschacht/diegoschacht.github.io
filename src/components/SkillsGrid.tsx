import { ReactNode } from 'react';
import SkillCard from './SkillCard';

interface Skill {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {skills.map((skill) => (
        <SkillCard key={skill.title} {...skill} />
      ))}
    </div>
  );
}
