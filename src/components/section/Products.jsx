'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';






const CATEGORY_MAP = [
    {
        id: 1,
        path:"acrylic-photo",
        category: 'Acrylic Photo'
    },
    {
        id:2,
        path:"acrylic-keychains",
        category:"Acrylic Keychains"
    }
]
export default function Product() {
    const [favorites, setFavorites] = useState(new Set());
    const [cart, setCart] = useState(new Set());
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    


    // fetch products from /api/products (MERN backend)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await axios.get('http://localhost:4000/api/products', {
                    params: { category },
                }); // adjust if different
                setProducts(res.data); // expect: [{ _id, title, price, description, imageUrl, category, ... }]
            } catch (err) {
                const msg =
                    err.response?.data?.message ||
                    err.message ||
                    'Failed to load products';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
        });
    };

    const toggleCart = (id) => {
        setCart((prev) => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
        });
    };

    const formatPrice = (price) => `₹ ${Number(price || 0).toLocaleString('en-IN')}`;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            MODERN FRAMES
                        </h1>
                        <div className="flex items-center gap-6">
                            <button className="relative hover:scale-110 transition-transform">
                                <Heart className="w-6 h-6 text-slate-700" />
                                {favorites.size > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {favorites.size}
                                    </span>
                                )}
                            </button>
                            <button className="relative hover:scale-110 transition-transform">
                                <ShoppingBag className="w-6 h-6 text-slate-700" />
                                {cart.size > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cart.size}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-800 mb-3">Premium Frames Collection</h2>
                    <p className="text-slate-600 text-lg">Explore handcrafted photo frames and wall decor</p>
                </div>

                {/* Error / Loading */}
                {error && (
                    <p className="mb-4 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}
                {loading && (
                    <p className="mb-4 text-center text-sm text-slate-500">
                        Loading products...
                    </p>
                )}

                {/* Product Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden bg-slate-100 aspect-square">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                                            <button
                                                onClick={() => toggleFavorite(product._id)}
                                                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${favorites.has(product._id)
                                                    ? 'bg-red-500 text-white scale-110'
                                                    : 'bg-white/90 text-slate-700 hover:bg-red-500 hover:text-white'
                                                    }`}
                                            >
                                                <Heart
                                                    className="w-5 h-5"
                                                    fill={favorites.has(product._id) ? 'currentColor' : 'none'}
                                                />
                                            </button>
                                            <button
                                                onClick={() => toggleCart(product._id)}
                                                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${cart.has(product._id)
                                                    ? 'bg-blue-500 text-white scale-110'
                                                    : 'bg-white/90 text-slate-700 hover:bg-blue-500 hover:text-white'
                                                    }`}
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-800 px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-800 hover:text-white">
                                        Quick View
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium text-slate-700">
                                                {/* if you later store rating, use product.rating */}
                                                4.8
                                            </span>
                                        </div>
                                        <span className="text-sm text-slate-500">
                                            {/* placeholder for reviews count */}
                                            (120 reviews)
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                                        {product.title}
                                    </h3>
                                    {product.category && (
                                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                                            {product.category}
                                        </p>
                                    )}

                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                        {product.description || 'Premium quality frame for your memories.'}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-slate-800">
                                            {formatPrice(product.price)}
                                        </span>
                                        <button className="bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-700 transition-colors text-sm font-medium">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
