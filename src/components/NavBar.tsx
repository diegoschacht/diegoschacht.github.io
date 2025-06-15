import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills & Demos' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-black/70">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <div className="font-bold">Diego Schacht</div>
        <button
          className="md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <ul className="hidden md:flex gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {open && (
        <ul className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-white dark:bg-black">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block py-1" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
