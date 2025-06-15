'use client';

import { useRef } from 'react';
import NavBar from '@/components/NavBar';
import HeroBanner from '@/components/HeroBanner';
import SectionWrapper from '@/components/SectionWrapper';
import SectionTitle from '@/components/SectionTitle';
import Timeline from '@/components/Timeline';
import SkillsGrid from '@/components/SkillsGrid';
import ProjectsGrid from '@/components/ProjectsGrid';
import FilterBar from '@/components/FilterBar';
import ContactForm from '@/components/ContactForm';

const timelineEvents = [
  { date: '2018-06-01', title: 'Graduated University', description: 'Completed my CS degree.' },
  { date: '2019-01-15', title: 'First Developer Job', description: 'Joined Acme Corp as Junior Dev.' },
  { date: '2021-03-20', title: 'Promoted', description: 'Became Senior Developer.' },
];

const skills = [
  { icon: '⚛️', title: 'React', description: 'Building modern UIs.' },
  { icon: '☁️', title: 'AWS', description: 'Serverless solutions.' },
  { icon: '🗄️', title: 'PostgreSQL', description: 'Robust databases.' },
  { icon: '🖼️', title: 'Image Upload', description: 'Parallel uploads.' },
];

const projects = [
  { title: 'Project One', description: 'Amazing project', imageUrl: '/next.svg', techTags: ['React'], liveUrl: '#', repoUrl: '#' },
  { title: 'Project Two', description: 'Another project', imageUrl: '/vercel.svg', techTags: ['Next.js'], liveUrl: '#', repoUrl: '#' },
];

export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar />
      <div id="home">
        <HeroBanner
          backgroundImageUrl="/Diego_Schacht.jpg"
          title="Hi, I'm Diego Schacht, Full‑Stack Engineer"
          subtitle="I build scalable web applications."
          ctaText="Explore My Work"
          onCtaClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
      <SectionWrapper id="about">
        <SectionTitle>About Me</SectionTitle>
        <Timeline events={timelineEvents} />
      </SectionWrapper>
      <SectionWrapper id="skills">
        <SectionTitle>Skills &amp; Demos</SectionTitle>
        <SkillsGrid skills={skills} />
      </SectionWrapper>
      <SectionWrapper id="projects">
        <SectionTitle>Projects</SectionTitle>
        <FilterBar tags={['React', 'Next.js']} active={null} onChange={() => {}} />
        <div ref={projectsRef}>
          <ProjectsGrid projects={projects} />
        </div>
      </SectionWrapper>
      <SectionWrapper id="contact">
        <SectionTitle>Contact</SectionTitle>
        <ContactForm />
      </SectionWrapper>
    </>
  );
}
