'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, ShoppingBag, Star } from 'lucide-react';

export default function ProductsByCategory({ category, heading }) {
    const [favorites, setFavorites] = useState(new Set());
    const [cart, setCart] = useState(new Set());
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!category) return;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await axios.get('http://localhost:4000/api/products', {
                    params: {
                        category: category,
                    }, // backend filters by category
                });
                setProducts(res.data);
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
    }, [category]);

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

    const formatPrice = (price) =>
        `₹ ${Number(price || 0).toLocaleString('en-IN')}`;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page heading */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-slate-800 mb-2">
                    {heading || category}
                </h2>
                <p className="text-slate-600">
                    Handpicked {category} products from our collection.
                </p>
            </div>

            {error && (
                <p className="mb-4 text-center text-sm text-red-500">{error}</p>
            )}
            {loading && (
                <p className="mb-4 text-center text-sm text-slate-500">
                    Loading products...
                </p>
            )}

            {!loading && products.length === 0 && !error && (
                <p className="mb-4 text-center text-sm text-slate-500">
                    No products found in this category yet.
                </p>
            )}

            {/* Product grid – reuse your existing card design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
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
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium text-slate-700">
                                        4.8
                                    </span>
                                </div>
                                <span className="text-sm text-slate-500">(120 reviews)</span>
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
                                {product.description ||
                                    'Premium quality frame for your favourite memories.'}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-slate-800">
                                    {formatPrice(product.price)}
                                </span>
                                <button className="bg-slate-800 text-white px-5 py-2 cursor-pointer rounded-full hover:bg-slate-700 transition-colors text-sm font-medium">
                                    View
                                </button>
                                <button className="bg-slate-800 text-white px-5 py-2 cursor-pointer rounded-full hover:bg-slate-700 transition-colors text-sm font-medium">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
