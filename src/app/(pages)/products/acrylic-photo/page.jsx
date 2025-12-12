'use client';

import Hero2 from '@/components/section/Hero2';
import ProductsByCategory from '@/components/section/Products';
import { Fragment } from 'react';

// export const metadata ={
//   title:'Acrylic Photo'
// }

export default function HeroSection() {
  return (
    <>
      <Fragment>
        <Hero2 title=' Acrylic Photo' subtitle="Modern Elegance in Every Detail" tagline="Transform your memories into vibrant, high-definition Acrylic Photo prints with ultra-clear acrylic, rich colors, and a sleek modern finish — perfect for homes, offices, or gifting." />
        <ProductsByCategory category="Acrylic Photo" heading="Acrylic Photo" />
      </Fragment>
    </>
  );
}
