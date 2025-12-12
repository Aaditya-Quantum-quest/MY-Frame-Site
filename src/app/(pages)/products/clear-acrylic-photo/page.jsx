import Hero2 from '@/components/section/Hero2';
import ProductsByCategory from '@/components/section/Products';
import React from 'react'

// export const metadata ={
//   title:'Clear Acrylic Photo'
// }

const page = () => {
  return (
    <>
      <Hero2 title="Clear Acrylic Photo" subtitle="Modern clarity, vivid depth" tagline='Showcase moments on ultra-clear acrylic with rich color, sharp detail, and a sleek glossy finish for homes, and gifts' />
       <ProductsByCategory category='Clear Acrylic Photo' Heading='Clear Acrylic Photo' />
    </>
  )
} 

export default page;