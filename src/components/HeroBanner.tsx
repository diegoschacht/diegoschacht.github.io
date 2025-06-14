import Image from 'next/image';
import { motion } from 'framer-motion';

export interface HeroBannerProps {
  backgroundImageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

export default function HeroBanner({
  backgroundImageUrl,
  title,
  subtitle,
  ctaText,
  onCtaClick,
}: HeroBannerProps) {
  return (
    <header
      role="banner"
      className="relative h-screen flex items-center justify-center text-center text-white"
    >
      <Image
        src={backgroundImageUrl}
        alt="Hero background"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-4 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        <p className="text-xl md:text-2xl max-w-xl">{subtitle}</p>
        <button
          aria-label={ctaText}
          onClick={onCtaClick}
          className="mt-4 px-6 py-3 bg-blue-600 rounded shadow transition-transform hover:scale-105"
        >
          {ctaText}
        </button>
      </motion.div>
    </header>
  );
}
