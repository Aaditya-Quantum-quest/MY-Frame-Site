import Hero2 from '@/components/section/Hero2';
import ProductsByCategory from '@/components/section/Products';
import React, { Fragment } from 'react'

// export const metadata ={
//   title:'Acrylic Cutout'
// }

const Acrylin_Cutout = () => {
    return (
        <Fragment>
            {/* <Hero2 title="Acrylic Cutout" subtitle="Sharp, glossy precision" tagline="This acrylic cutout delivers vibrant clarity, smooth edges, and a premium glossy finish, creating a bold, modern display that highlights any photo with impressive detail, durability, and style" /> */}
            <ProductsByCategory category='Acrylic Cutout' Heading='Acrylic Cutout' />

        </Fragment>
    )
}

export default Acrylin_Cutout;