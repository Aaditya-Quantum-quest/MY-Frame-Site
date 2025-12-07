'use client'

import React, { useState } from 'react';
import { Mail, Lock, User, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in...' : 'Signing up...', { email, password, name });
  };

  return (
    <div className="py-30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Artwork Display */}
        <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex flex-col justify-between min-h-[600px]">
          <div className="flex justify-between items-start">
            <h2 className="text-white font-semibold text-lg">Selected Works</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-white/30 text-white text-sm rounded-full hover:bg-white/10 transition">
                Sign Up
              </button>
              <button className="px-4 py-2 border border-white/30 text-white text-sm rounded-full hover:bg-white/10 transition">
                Join Us
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">UISOCIAL</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Hi Designer' : 'Create Account'}
            </h2>
            <p className="text-gray-500">Welcome to UISOCIAL</p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition"
                />
              </div>
            )}
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition"
              />
              {isLogin && (
                <div className="text-right mt-2">
                  <button className="text-red-500 text-sm hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            <div className="text-center text-gray-400 text-sm my-4">or</div>

            <button
              className="w-full py-3 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login with Google
            </button>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition shadow-lg"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-500 font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
              <Facebook className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
              <Twitter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
              <Linkedin className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
              <Instagram className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}