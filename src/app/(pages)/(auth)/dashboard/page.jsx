// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { Users, Package, Receipt, IndianRupee } from 'lucide-react';

// export default function DashboardOverview() {
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);
//   const [stats, setStats] = useState({
//     users: 0,
//     orders: 0,
//     revenue: 0,
//     products: 0,
//   });
//   const [errorMsg, setErrorMsg] = useState('');

//   // protect route
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const isAdmin = localStorage.getItem('isAdmin') === 'true';

//     if (!token) {
//       router.replace('/login');
//       return;
//     }
//     if (!isAdmin) {
//       router.replace('/');
//       return;
//     }
//     setChecking(false);

//     axios
//       .get('http://localhost:4000/api/dashboard', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         // backend already checked isAdmin; if we got here, user is admin
//         setChecking(false);
//       })
//       .catch(() => {
//         // not admin or invalid token
//         router.replace('/');
//       });
      
//   }, [router]);


//   // load stats using existing admin endpoints
//   useEffect(() => {
//     if (checking) return;
//     const token = localStorage.getItem('token');

//     async function loadStats() {
//       try {
//         const [usersRes, ordersRes, productsRes] = await Promise.all([
//           axios.get('http://localhost:4000/api/admin/users', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:4000/api/admin/orders', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:4000/api/admin/products', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const users = usersRes.data.length;
//         const orders = ordersRes.data.length;
//         const products = productsRes.data.length;
//         const revenue = ordersRes.data.reduce(
//           (sum, o) => sum + (o.totalAmount || 0),
//           0
//         );

//         setStats({ users, orders, products, revenue });
//       } catch (err) {
//         const msg =
//           err.response?.data?.message ||
//           err.message ||
//           'Failed to load dashboard stats';
//         setErrorMsg(msg);
//       }
//     }

//     loadStats();
//   }, [checking]);

//   if (checking) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600">Checking permissions...</p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 pt-24 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//           Admin Overview
//         </h1>

//         {errorMsg && (
//           <p className="mb-3 text-sm text-red-500">{errorMsg}</p>
//         )}

//         <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             icon={Users}
//             label="Customers"
//             value={stats.users}
//             color="from-sky-500 to-blue-500"
//           />
//           <StatCard
//             icon={Package}
//             label="Products"
//             value={stats.products}
//             color="from-emerald-500 to-teal-500"
//           />
//           <StatCard
//             icon={Receipt}
//             label="Orders"
//             value={stats.orders}
//             color="from-amber-500 to-orange-500"
//           />
//           <StatCard
//             icon={IndianRupee}
//             label="Revenue"
//             value={`₹${stats.revenue}`}
//             color="from-rose-500 to-pink-500"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

// function StatCard({ icon: Icon, label, value, color }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
//       <div
//         className={`w-11 h-11 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white`}
//       >
//         <Icon className="w-6 h-6" />
//       </div>
//       <div>
//         <p className="text-xs text-gray-500 uppercase tracking-wide">
//           {label}
//         </p>
//         <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Users, Package, Receipt, IndianRupee, TrendingUp, Activity } from 'lucide-react';

export default function DashboardOverview() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    products: 0,
  });
  const [errorMsg, setErrorMsg] = useState('');

  // protect route
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!token) {
      router.replace('/login');
      return;
    }
    if (!isAdmin) {
      router.replace('/');
      return;
    }
    setChecking(false);

    axios
      .get('http://localhost:4000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // backend already checked isAdmin; if we got here, user is admin
        setChecking(false);
      })
      .catch(() => {
        // not admin or invalid token
        router.replace('/');
      });
      
  }, [router]);


  // load stats using existing admin endpoints
  useEffect(() => {
    if (checking) return;
    const token = localStorage.getItem('token');

    async function loadStats() {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:4000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:4000/api/admin/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:4000/api/admin/products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const users = usersRes.data.length;
        const orders = ordersRes.data.length;
        const products = productsRes.data.length;
        const revenue = ordersRes.data.reduce(
          (sum, o) => sum + (o.totalAmount || 0),
          0
        );

        setStats({ users, orders, products, revenue });
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          'Failed to load dashboard stats';
        setErrorMsg(msg);
      }
    }

    loadStats();
  }, [checking]);

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-purple-200 mt-4 font-medium">Checking permissions...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="text-purple-300 text-sm mt-1">Welcome back! Here's your business overview</p>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-300 text-sm">{errorMsg}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Customers"
            value={stats.users.toLocaleString()}
            color="from-blue-500 to-cyan-500"
            accentColor="bg-blue-500/20"
            delay="0"
          />
          <StatCard
            icon={Package}
            label="Active Products"
            value={stats.products.toLocaleString()}
            color="from-emerald-500 to-teal-500"
            accentColor="bg-emerald-500/20"
            delay="100"
          />
          <StatCard
            icon={Receipt}
            label="Total Orders"
            value={stats.orders.toLocaleString()}
            color="from-amber-500 to-orange-500"
            accentColor="bg-amber-500/20"
            delay="200"
          />
          <StatCard
            icon={IndianRupee}
            label="Total Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            color="from-rose-500 to-pink-500"
            accentColor="bg-rose-500/20"
            delay="300"
            highlight
          />
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Quick Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-300 text-sm">Avg. Order Value</span>
                <span className="text-white font-bold">
                  ₹{stats.orders > 0 ? (stats.revenue / stats.orders).toFixed(2) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 text-sm">Orders per Customer</span>
                <span className="text-white font-bold">
                  {stats.users > 0 ? (stats.orders / stats.users).toFixed(2) : '0'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-300 text-sm">Revenue per Product</span>
                <span className="text-white font-bold">
                  ₹{stats.products > 0 ? (stats.revenue / stats.products).toFixed(2) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 text-sm">Catalog Utilization</span>
                <span className="text-white font-bold">
                  {stats.products > 0 ? ((stats.orders / stats.products) * 100).toFixed(1) : '0'}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value, color, accentColor, delay, highlight }) {
  return (
    <div 
      className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${highlight ? 'ring-2 ring-purple-500/30' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* linear overlay on hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-purple-300 text-xs uppercase tracking-wider font-semibold mb-3">
            {label}
          </p>
          <p className="text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {value}
          </p>
        </div>
        
        <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${color}`}></div>
        <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-linear-to-l ${color}`}></div>
      </div>
    </div>
  );
}