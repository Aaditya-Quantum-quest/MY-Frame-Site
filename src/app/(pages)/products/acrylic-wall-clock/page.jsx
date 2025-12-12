import Hero2 from '@/components/section/Hero2';
import ProductsByCategory from '@/components/section/Products';
import React, { Fragment } from 'react'

// export const metadata ={
//   title:'Acrylic Wall Clock'
// }

const Acrylic_Wall_Clock = () => {
    return (
        <Fragment>
            <Hero2 title="Acrylic Wall Clock" subtitle="Clear, modern timekeeping" tagline="This acrylic wall clock blends modern design with vibrant clarity, featuring a glossy finish, precise movement, and durable construction to elevate any room’s décor with style" />
              <ProductsByCategory category='Acrylic Wall Clock' Heading='Acrylic Wall Clock' />

        </Fragment>
    )
}

export default Acrylic_Wall_Clock;