import Hero2 from '@/components/section/Hero2'
import ProductsByCategory from '@/components/section/Products'
import React, { Fragment } from 'react'

// export const metadata ={
//   title:'Framed Acrylic Photo'
// }

const Framed_Acrylic_Photo = () => {
    return (
        <Fragment>

            <Hero2 title="Framed Acrylic Photo" subtitle="Elegance in every frame" tagline="This framed acrylic photo combines vibrant clarity, premium glossy finish, and a sleek border, creating a durable, modern display perfect for decorating walls, gifting, and showcasing cherished memories beautifully" />
             <ProductsByCategory category='Framed Acrylic Photo' Heading='Framed Acrylic Photo' />
        </Fragment>
    )
}

export default Framed_Acrylic_Photo