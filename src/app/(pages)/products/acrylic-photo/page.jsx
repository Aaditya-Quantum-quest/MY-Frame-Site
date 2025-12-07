'use client';

import Cards from '@/components/section/Cards';
import Hero2 from '@/components/section/Hero2';
import HeadingTitle from '@/components/ui/HeadingTitle';
import Image from 'next/image';
import { Fragment } from 'react';

export default function HeroSection() {
  return (
    <>
      <Fragment>
        <Hero2 title=' Acrylic Photo' subtitle="Modern Elegance in Every Detail" tagline="                Transform your memories into vibrant, high-definition Acrylic Photo prints with ultra-clear acrylic, rich colors, and a sleek modern finish — perfect for homes, offices, or gifting." />
      </Fragment>
    
      {/* <HeadingTitle /> */}

      <Cards />
    </>
  );
}
