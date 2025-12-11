'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import GallerySection from '@/components/section/GallerySection';
import Hero from '@/components/section/Hero';
import ShowCase from '@/components/section/ShowCase';
import HeadingTitle from '@/components/ui/HeadingTitle';
import ProductPage from '@/components/section/Products';

const Home = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // useEffect(() => {
  //   const token = typeof window !== 'undefined'
  //     ? localStorage.getItem('token')
  //     : null;

  //   if (!token) {
  //     router.replace('/signup'); // redirect if not logged in
  //   } else {
  //     setChecking(false);        // token exists → show home
  //   }
  // }, [router]);


  // if (checking) {
  //   return (
  //     <main className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-600">Loading...</p>
  //     </main>
  //   );
  // }

  return (
    <Fragment>
      <Hero />
      <HeadingTitle />
      <ShowCase />
      <GallerySection />
      <ProductPage />
    </Fragment>
  );
};

export default Home;
