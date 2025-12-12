import Hero2 from '@/components/section/Hero2';
import ProductsByCategory from '@/components/section/Products';
import React, { Fragment } from 'react'

// export const metadata ={
//   title:'Collage Acrylic Photo'
// }

const Collage_Acrylic_Photo = () => {
    return (
        <Fragment>

            <Hero2 title="Collage Acrylic Photo" subtitle="Many moments, one frame" tagline="This collage acrylic photo blends multiple memories into one vibrant display, featuring glossy clarity, smooth edges, and modern durability—perfect for celebrating stories, gifting, and decorating any space beautifully" />
             <ProductsByCategory category='Collage Acrylic Photo' Heading='Collage Acrylic Photo' />
        </Fragment>
    )
}

export default Collage_Acrylic_Photo;