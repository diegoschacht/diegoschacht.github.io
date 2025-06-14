import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TimelineCard from './TimelineCard';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="flex flex-col gap-8">
      {events.map((event, i) => (
        <motion.div
          key={event.date + event.title}
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <TimelineCard {...event} />
        </motion.div>
      ))}
    </div>
  );
}
