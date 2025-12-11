    // 'use client';

    // import { useEffect, useState } from 'react';
    // import axios from 'axios';
    // // import ProductGrid from '@/components/section/Products  '; // your UI component

    // // map URL slug -> Mongo category string
    // const CATEGORY_MAP = {
    // 'acrylic-photo': 'Acrylic Photo',
    // 'wall-clock': 'Wall Clock',
    // 'table-frame': 'Table Frame',
    // };

    // export default function ProductsByCategoryPage({ params }) {
    // const { slug } = params;              // e.g. "acrylic-photo"
    // const category = CATEGORY_MAP[slug];  // e.g. "Acrylic Photo"

    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    // useEffect(() => {
    //     if (!category) return; // unknown slug

    //     const fetchProducts = async () => {
    //     try {
    //         setLoading(true);
    //         setError('');
    //         const res = await axios.get('http://localhost:4000/api/products', {
    //         params: { category }, // sends ?category=Acrylic%20Photo
    //         });
    //         setProducts(res.data);
    //     } catch (err) {
    //         const msg =
    //         err.response?.data?.message ||
    //         err.message ||
    //         'Failed to load products';
    //         setError(msg);
    //     } finally {
    //         setLoading(false);
    //     }
    //     };


        
    //     fetchProducts();
    // }, [category]);

    // if (!category) {
    //     return <div className="p-8 text-red-500">Unknown category</div>;
    // }

    // return (
    //     <ProductGrid
    //     title={category}
    //     products={products}
    //     loading={loading}
    //     error={error}
    //     />
    // );
    // }
