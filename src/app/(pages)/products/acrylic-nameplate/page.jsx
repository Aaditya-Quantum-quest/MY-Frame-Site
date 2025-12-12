import Hero2 from '@/components/section/Hero2';
import ProductsByCategory from '@/components/section/Products';
import React, { Fragment } from 'react'

// export const metadata ={
//   title:'Acrylic Nameplate'
// }


const Acrylic_NamePlate = () => {
  return (
  <Fragment>

    <Hero2 title ="Acrylic Nameplate" subtitle="Stylish identity display" tagline="This acrylic nameplate delivers vivid clarity, smooth polished edges, and a premium glossy finish, creating a modern, durable identity display perfect for homes, offices, desks, entrances, and gifting" />
      <ProductsByCategory category='Acrylic Nameplate' Heading='Acrylic Nameplate' />
  </Fragment>
  )
}

export default Acrylic_NamePlate;