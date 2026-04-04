import Image from 'next/image';
import RevealFx from './RevealFx';

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
        <div className="flex-1 flex flex-col justify-center items-start px-8 md:px-16 text-white z-10">
          <RevealFx translateY={20} delay={0} duration={0.8}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          </RevealFx>
          
          <RevealFx translateY={30} delay={0.2} duration={0.8}>
            <p className="text-xl md:text-2xl max-w-xl mb-6">{subtitle}</p>
          </RevealFx>
          
          <RevealFx translateY={20} delay={0.4} duration={0.8}>
            <button
              aria-label={ctaText}
              onClick={onCtaClick}
              className="px-6 py-3 bg-white-600 rounded shadow transition-transform hover:scale-105"
            >
              {ctaText}
            </button>
          </RevealFx>
        </div>
        
        {/* Right side - Image */}
        <div className="flex-1 relative">
          <RevealFx>
            <Image
              src={backgroundImageUrl}
              alt="Hero background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </RevealFx>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
        </div>
      </div>
    </header>
  );
}
