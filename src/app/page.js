import GallerySection from '@/components/section/GallerySection';
import Hero from '@/components/section/Hero';
import ShowCase from '@/components/section/ShowCase';

import React, { Fragment } from 'react'
import HeadingTitle from '@/components/ui/HeadingTitle';


const Home = () => {
  return (
    <Fragment>
      <Hero />
      <HeadingTitle />
      <ShowCase />
      <GallerySection />
    </Fragment>
  )
}

export default Home;