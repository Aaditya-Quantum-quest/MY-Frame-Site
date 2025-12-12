import Hero2 from '@/components/section/Hero2'
import React, { Fragment } from 'react'
import ProductsByCategory from '@/components/section/Products'

// export const metadata ={
//   title:'Acrylic Keychains'
// }

const Acrylic_Keychains = () => {
    return (
        <Fragment>

            <Hero2 title="Acrylic Keychains" subtitle="Carry memories anywhere" tagline="These acrylic keychains combine vibrant printing, durable clarity, and smooth edges, offering a lightweight, stylish way to carry your favorite memories wherever you go with convenience" />
            <ProductsByCategory category='Acrylic Keychains' Heading='Acrylic Keychains' />
  

        </Fragment>
    )
}

export default Acrylic_Keychains;