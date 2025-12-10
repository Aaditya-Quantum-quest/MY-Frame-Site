// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { Receipt } from 'lucide-react';

// export default function OrdersAdminPage() {
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [errorMsg, setErrorMsg] = useState('');

//   // protect route: admin only
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
//   }, [router]);

//   // load orders
//   useEffect(() => {
//     if (checking) return;
//     const token = localStorage.getItem('token');

//     axios
//       .get('http://localhost:4000/api/admin/orders', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setOrders(res.data))
//       .catch((err) => {
//         const msg =
//           err.response?.data?.message ||
//           err.message ||
//           'Failed to load orders';
//         setErrorMsg(msg);
//       });
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
//         <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
//           <Receipt className="w-6 h-6 text-orange-500" />
//           Orders
//         </h1>

//         {errorMsg && (
//           <p className="mb-3 text-sm text-red-500">{errorMsg}</p>
//         )}

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   #
//                 </th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   Customer
//                 </th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   Email
//                 </th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   Items
//                 </th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   Total
//                 </th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   Status
//                 </th>
//                 <th className="px-4 py-2 text-left font-semibold text-gray-700">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((o, index) => (
//                 <tr
//                   key={o._id}
//                   className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//                 >
//                   <td className="px-4 py-2 text-gray-600">
//                     {index + 1}
//                   </td>
//                   <td className="px-4 py-2 text-gray-900 font-medium">
//                     {o.user?.name || '—'}
//                   </td>
//                   <td className="px-4 py-2 text-gray-700">
//                     {o.user?.email || '—'}
//                   </td>
//                   <td className="px-4 py-2 text-gray-700">
//                     {o.items
//                       ?.map(
//                         (it) =>
//                           `${it.product?.title || 'Item'} x${it.quantity}`
//                       )
//                       .join(', ') || '—'}
//                   </td>
//                   <td className="px-4 py-2 text-gray-900 font-semibold">
//                     ₹{o.totalAmount ?? 0}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
//                       {o.status || 'pending'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 text-gray-500">
//                     {o.createdAt
//                       ? new Date(o.createdAt).toLocaleString()
//                       : '—'}
//                   </td>
//                 </tr>
//               ))}
//               {orders.length === 0 && !errorMsg && (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-4 py-4 text-center text-gray-500"
//                   >
//                     No orders yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// }



'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Receipt, User, Mail, Package, Calendar, IndianRupee, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function OrdersAdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // protect route: admin only
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
  }, [router]);

  // load orders
  useEffect(() => {
    if (checking) return;
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:4000/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          err.message ||
          'Failed to load orders';
        setErrorMsg(msg);
      });
  }, [checking]);

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const getStatusColor = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    if (statusLower === 'completed' || statusLower === 'delivered') {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
    if (statusLower === 'processing' || statusLower === 'shipped') {
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
    if (statusLower === 'cancelled' || statusLower === 'failed') {
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
    return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  };

  const getStatusIcon = (status) => {
    const statusLower = (status || 'pending').toLowerCase();
    if (statusLower === 'completed' || statusLower === 'delivered') {
      return <CheckCircle className="w-3 h-3" />;
    }
    return <Clock className="w-3 h-3" />;
  };

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-purple-200 mt-4 font-medium">Checking permissions...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Receipt className="w-10 h-10 text-purple-400" />
            Orders Management
          </h1>
          <p className="text-purple-300">Track and manage customer orders</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-300 text-sm">{errorMsg}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-300 text-xs uppercase tracking-wider font-semibold">Total Orders</p>
                <p className="text-2xl font-bold text-white">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-300 text-xs uppercase tracking-wider font-semibold">Total Revenue</p>
                <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-300 text-xs uppercase tracking-wider font-semibold">Avg Order Value</p>
                <p className="text-2xl font-bold text-white">₹{avgOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <Receipt className="w-6 h-6 text-purple-400" />
              All Orders
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full">
                {orders.length}
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider hidden lg:table-cell">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider hidden md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o, index) => (
                  <tr key={o._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-300 font-bold text-sm border border-purple-500/30">
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {o.user?.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-purple-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {o.user?.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-start gap-2 text-purple-300 text-sm">
                        <Package className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          {o.items?.length > 0 ? (
                            o.items.map((it, i) => (
                              <div key={i} className="mb-1">
                                {it.product?.title || 'Item'} <span className="text-purple-400">x{it.quantity}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-purple-500">No items</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xl font-bold text-emerald-400">
                        ₹{(o.totalAmount || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(o.status)}`}>
                        {getStatusIcon(o.status)}
                        {(o.status || 'pending').charAt(0).toUpperCase() + (o.status || 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-purple-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }) : 'N/A'}
                      </div>
                      {o.createdAt && (
                        <div className="text-xs text-purple-500 ml-6 mt-1">
                          {new Date(o.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && !errorMsg && (
            <div className="text-center py-16">
              <Receipt className="w-20 h-20 text-purple-400/50 mx-auto mb-4" />
              <p className="text-xl text-purple-300 mb-2">No orders yet</p>
              <p className="text-sm text-purple-400">Orders will appear here once customers start purchasing</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}