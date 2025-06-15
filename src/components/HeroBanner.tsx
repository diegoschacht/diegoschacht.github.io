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
      className="relative h-screen flex items-center"
    >
      <div className="flex w-full h-full">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center items-start px-8 md:px-16 text-white z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl max-w-xl mb-6">{subtitle}</p>
          <button
            aria-label={ctaText}
            onClick={onCtaClick}
            className="px-6 py-3 bg-blue-600 rounded shadow transition-transform hover:scale-105"
          >
            {ctaText}
          </button>
        </motion.div>
        
        {/* Right side - Image */}
        <div className="flex-1 relative">
          <Image
            src={backgroundImageUrl}
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
        </div>
      </div>
    </header>
  );
}
