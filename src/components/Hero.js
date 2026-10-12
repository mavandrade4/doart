
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const HERO_IMAGES = {
  background: { src: '/img1.jpeg', alt: '' },
  main: { src: '/img2.jpeg', alt: 'Duarte tattooing' },
  topRight: { src: '/img3.jpeg', alt: 'Duarte at work' },
  bottomRight: {
    src: '/img4.jpeg',
    alt: 'Duarte smiling while tattooing',
  },
};

export default function Hero() {
  const containerRef = useRef(null);
  const { background, main, topRight, bottomRight } = HERO_IMAGES;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.6]
  );

  const framesScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.15]
  );

  const framesOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 1, 0]
  );

  return (
    <section ref={containerRef} className="hero">
      <div className="hero__sticky">
        <div className="hero__canvas">
          <motion.div
            className="hero__background"
            style={{ scale: backgroundScale }}
          >
            <Image
              src={background.src}
              alt={background.alt}
              fill
              sizes="100vw"
              priority
              className="hero__image"
            />
          </motion.div>

          <motion.div
            className="hero__frames"
            style={{
              scale: framesScale,
              opacity: framesOpacity,
            }}
          >
            <div className="hero__frame hero__frame--main">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes="(min-width: 700px) 28vw, 90vw"
                className="hero__image"
              />
            </div>

            <div className="hero__frame hero__frame--top-right">
              <Image
                src={topRight.src}
                alt={topRight.alt}
                fill
                sizes="(min-width: 700px) 15vw, 45vw"
                className="hero__image"
              />
            </div>

            <div className="hero__frame hero__frame--bottom-right">
              <Image
                src={bottomRight.src}
                alt={bottomRight.alt}
                fill
                sizes="(min-width: 700px) 15vw, 45vw"
                className="hero__image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
