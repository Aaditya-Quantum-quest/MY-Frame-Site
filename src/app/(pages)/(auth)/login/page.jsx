'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function ModernLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:4000/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      // 1) save token
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      // 2) compute and save isAdmin
      const isAdmin = !!res.data.user?.isAdmin;   // <── define variable
      localStorage.setItem('isAdmin', String(isAdmin));

      setSuccessMsg(res.data.message || 'Login successful');

      // 3) redirect based on role
      setTimeout(() => {
        if (isAdmin) {
          router.push('/dashboard');   // admin
        } else {
          router.push('/');            // normal user
        }
      }, 800);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-400 via-pink-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-pink-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-br from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-linear-to-br from-orange-300 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-linear-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-medium text-gray-800 text-center mb-4">
            User Login
          </h2>

          {/* Messages */}
          {errorMsg && (
            <p className="mb-3 text-sm text-red-500 text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="mb-3 text-sm text-green-600 text-center">
              {successMsg}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>

            {/* Forgot Links */}
            <div className="flex justify-center gap-2 text-sm text-gray-500">
              <button
                type="button"
                className="hover:text-pink-500 transition"
              >
                Forgot Username
              </button>
              <span>|</span>
              <button
                type="button"
                className="hover:text-pink-500 transition"
              >
                Password?
              </button>
            </div>
          </form>

          {/* Create Account Link */}
          <div className="mt-8 text-center">
            <button className="text-gray-500 hover:text-pink-500 transition inline-flex items-center gap-1 group">
              Create Your Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
