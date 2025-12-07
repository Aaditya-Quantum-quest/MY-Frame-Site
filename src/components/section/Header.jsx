'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartCount] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
    }
    const handleSignup = () => {
        router.push('/signup');
    }
    
    const productCategories = [
        {
            title: "ALL FRAMES",
            items: [
                "Acrylic Photo",
                "Clear Acrylic Photo",
                "Acrylic Wall Clock",
                "Framed Acrylic Photo",
                "Collage Acrylic Photo",
                "Acrylic Fridge Magnets",
                "Acrylic Cutout",
                "Acrylic Desk Photo",
                "Acrylic KeyChains",
                "Aluminium Framed Acrylic Photo",
                "Acrylic Nameplate",
                "Acrylic Monogram",
                "Miniphoto Gallery"
            ],
        },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-white shadow-md'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href='/'>
                            <div className="shrink-0 group cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <span className="text-white font-bold text-xl">S</span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hidden sm:block">
                                        ShopHub
                                    </span>
                                </div>
                            </div>

                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            <Link href="/" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-all hover:bg-green-50 rounded-lg">
                                Home
                            </Link>

                            {/* Products Mega Menu */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsProductsOpen(true)}
                                onMouseLeave={() => setIsProductsOpen(false)}
                            >
                                <button className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-all hover:bg-green-50 rounded-lg flex items-center gap-1 group">
                                    Products
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Enhanced Mega Menu Dropdown */}
                                <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ${isProductsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
                                    }`}>
                                    <div className="relative bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"></div>

                                        {productCategories.map((category, idx) => (
                                            <div key={idx} className="relative group/category">
                                                <div className="flex items-center justify-center gap-3 mb-6">
                                                    <div className="h-px w-12 bg-linear-to-r from-transparent to-green-300"></div>
                                                    <h3 className="text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-wide">
                                                        {category.title}
                                                    </h3>
                                                    <div className="h-px w-12 bg-linear-to-l from-transparent to-green-300"></div>
                                                </div>

                                                {/* Grid layout for items - 3 columns with enhanced styling */}
                                                <ul className="grid grid-cols-3 gap-x-8 gap-y-3">
                                                    {category.items.map((item, itemIdx) => (
                                                        <li key={itemIdx}>
                                                            <Link
                                                                href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                                className="group/item text-sm text-gray-700 hover:text-green-600 inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-2 relative"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></span>
                                                                <span className="font-medium">{item}</span>
                                                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-linear-to-r from-green-600 to-emerald-600 group-hover/item:w-full transition-all duration-300"></span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        <div className="mt-8 pt-6 border-t border-green-200/50">
                                            <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700">Need help finding something?</p>
                                                </div>
                                                <button className="px-6 py-2.5 bg-linear-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-green-700 hover:to-emerald-700">
                                                    Contact Support
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contactus" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-all hover:bg-green-50 rounded-lg">
                                Contact Us
                            </Link>

                            <Link href="/aboutus" className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-all hover:bg-green-50 rounded-lg">
                                About
                            </Link>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Search */}
                            <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Cart */}
                            <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all group">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Login/Account */}
                            <div className="hidden md:flex items-center gap-2">
                                <button className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium text-sm transition-all cursor-pointer hover:bg-green-50 rounded-lg" onClick={handleLogin}>
                                    Login
                                </button>
                                <button className="px-5 py-2 bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium cursor-pointer text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={handleSignup}>
                                    Sign Up
                                </button>
                            </div>

                            {/* Mobile Account Icon */}
                            <button className="md:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                                <User className="w-5 h-5" />
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 py-6 bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
                        {/* Home Link */}
                        <Link
                            href="/"
                            className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-white rounded-xl transition-all font-medium mb-2 shadow-sm"
                        >
                            Home
                        </Link>

                        {/* Products Dropdown with Mega Menu Style */}
                        <div className="mb-2">
                            <button
                                onClick={() => setIsProductsOpen(!isProductsOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-white rounded-xl transition-all font-medium shadow-sm"
                            >
                                <span className="flex items-center gap-2">
                                    Products
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                                </span>
                            </button>

                            {/* Mega Menu Content with Fixed Height and Scroll */}
                            {isProductsOpen && (
                                <div className="mt-3 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                                    {/* Header Banner */}
                                    <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-5 py-4">
                                        <h3 className="text-lg font-bold flex items-center justify-center gap-2">
                                            <span>ALL FRAMES</span>
                                        </h3>
                                    </div>

                                    {/* Scrollable Product Categories Container */}
                                    <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100">
                                        {/* Product Categories Grid */}
                                        <div className="p-4 space-y-4">
                                            {productCategories.map((category, idx) => (
                                                <div key={idx} className="bg-linear-to-br from-gray-50 to-green-50/30 rounded-xl p-4 border border-gray-100">
                                                    <h4 className="font-bold text-sm text-gray-800 mb-3 pb-2 border-b border-gray-200">
                                                        {category.title}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {category.items.map((item, itemIdx) => (
                                                            <li key={itemIdx}>
                                                                <Link
                                                                    href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    className="flex items-center justify-between text-sm text-gray-700 hover:text-green-600 hover:bg-white rounded-lg px-3 py-2 transition-all group"
                                                                    onClick={() => {
                                                                        setIsProductsOpen(false);
                                                                        setIsMobileMenuOpen(false);
                                                                    }}
                                                                >
                                                                    <span>{item}</span>
                                                                    <svg
                                                                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                    </svg>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Help Section */}
                                    <div className="bg-linear-to-r from-gray-50 to-green-50 px-5 py-4 flex items-center justify-between border-t border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">Need help finding something?</span>
                                        </div>
                                    </div>

                                    {/* Premium Badge */}
                                    <div className="bg-linear-to-r from-green-600 to-emerald-600 px-5 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            <span className="text-white text-sm font-semibold">Premium Acrylic Prints</span>
                                        </div>
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Navigation Links */}
                        <Link
                            href="/contactus"
                            className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-white rounded-xl transition-all font-medium mb-2 shadow-sm"
                        >
                            Contact Us
                        </Link>

                        <Link
                            href="/aboutus"
                            className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-white rounded-xl transition-all font-medium mb-4 shadow-sm"
                        >
                            About
                        </Link>

                        {/* Auth Buttons */}
                        <div className="pt-4 space-y-3 border-t border-gray-200">
                            <button className="w-full px-4 py-3.5 text-gray-700 hover:text-green-600 font-semibold cursor-pointer hover:bg-white rounded-xl transition-all shadow-sm border-2 border-gray-200 hover:border-green-600 flex items-center justify-center gap-2" onClick={handleLogin}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </button>

                            <button className="w-full px-4 py-3.5 bg-linear-to-r from-green-600 to-emerald-600 cursor-pointer text-white font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2" onClick={handleSignup}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>


            </nav>
        </>
    );
}
