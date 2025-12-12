import Hero2 from '@/components/section/Hero2'
import ProductsByCategory from '@/components/section/Products'
import React, { Fragment } from 'react'

// export const metadata ={
//   title:'Miniphoto Gallery'
// }

const Miniphoto_Gallery = () => {
    return (
        <Fragment>

            <Hero2 title="Mini Photo Gallery" subtitle="Small moments, big impact" tagline="This mini photo gallery showcases multiple memories in compact acrylic frames, offering vibrant clarity, a glossy finish, and a modern display perfect for desks, shelves, gifting, and décor" />
            <ProductsByCategory category='MiniPhoto Gallery' Heading='MiniPhoto Gallery' />
        </Fragment>
    )
}

export default Miniphoto_Gallery