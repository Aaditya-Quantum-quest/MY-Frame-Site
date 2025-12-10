// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { PackagePlus, Trash2, Edit3 } from 'lucide-react';

// export default function ProductsAdminPage() {
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [price, setPrice] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   // protect route: only admin
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

//   // load products
//   useEffect(() => {
//     if (checking) return;
//     const token = localStorage.getItem('token');

//     axios
//       .get('http://localhost:4000/api/admin/products', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setProducts(res.data))
//       .catch((err) => {
//         const msg =
//           err.response?.data?.message ||
//           err.message ||
//           'Failed to load products';
//         setErrorMsg(msg);
//       });
//   }, [checking]);

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     try {
//       const token = localStorage.getItem('token');
//       const endpoint = editingId 
//         ? `http://localhost:4000/api/admin/products/${editingId}`
//         : 'http://localhost:4000/api/admin/products';

//       const method = editingId ? axios.put : axios.post;

//       const res = await method(endpoint, {
//         title,
//         slug,
//         price: Number(price),
//         imageUrl,
//         category,
//         description,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (editingId) {
//         setProducts((prev) =>
//           prev.map((p) => (p._id === editingId ? res.data.product : p))
//         );
//         setEditingId(null);
//       } else {
//         setProducts((prev) => [res.data.product, ...prev]);
//       }

//       setTitle('');
//       setSlug('');
//       setPrice('');
//       setImageUrl('');
//       setCategory('');
//       setDescription('');
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.message ||
//         'Failed to save product';
//       setErrorMsg(msg);
//     }
//   };

//   const handleEdit = (product) => {
//     setTitle(product.title);
//     setSlug(product.slug);
//     setPrice(product.price);
//     setImageUrl(product.imageUrl);
//     setCategory(product.category);
//     setDescription(product.description);
//     setEditingId(product._id);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(
//         `http://localhost:4000/api/admin/products/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//       if (editingId === id) {
//         setEditingId(null);
//         // Reset form
//         setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
//         setCategory(''); setDescription('');
//       }
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.message ||
//         'Failed to delete product';
//       setErrorMsg(msg);
//     }
//   };

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
//         <h1 className="text-3xl font-bold mb-8 text-gray-900">
//           Frame Products Admin
//         </h1>

//         {/* Add/Edit Product Form */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//             {editingId ? 'Edit Product' : 'Add New Product'}
//             <PackagePlus className="w-6 h-6 text-blue-600" />
//           </h2>

//           {errorMsg && (
//             <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
//               {errorMsg}
//             </div>
//           )}

//           <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Title
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Golden Frame 24x36"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Slug
//               </label>
//               <input
//                 type="text"
//                 value={slug}
//                 onChange={(e) => setSlug(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="golden-frame-24x36"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price (₹)
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="1299"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Wooden Frames"
//                 required
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Image URL
//               </label>
//               <input
//                 type="url"
//                 value={imageUrl}
//                 onChange={(e) => setImageUrl(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="https://example.com/frame.jpg"
//                 required
//               />
//               {imageUrl && (
//                 <img
//                   src={imageUrl}
//                   alt="Preview"
//                   className="mt-3 w-32 h-32 object-cover rounded-lg border"
//                 />
//               )}
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
//                 placeholder="Premium quality golden wooden frame..."
//               />
//             </div>

//             <div className="md:col-span-2 flex gap-4">
//               <button
//                 type="submit"
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 {editingId ? 'Update Product' : 'Add Product'}
//               </button>
//               {editingId && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setEditingId(null);
//                     setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
//                     setCategory(''); setDescription('');
//                   }}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Products List */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="px-8 py-6 border-b border-gray-200">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               All Products ({products.length})
//             </h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
//                     Image
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Title
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
//                     Price
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">
//                     Category
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-8 py-4">
//                       <img
//                         src={product.imageUrl}
//                         alt={product.title}
//                         className="w-16 h-16 object-cover rounded-lg"
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">
//                         {product.title}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {product.slug}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 hidden md:table-cell">
//                       <span className="text-lg font-semibold text-gray-900">
//                         ₹{product.price}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 hidden lg:table-cell">
//                       <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                         {product.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(product)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <Edit3 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(product._id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {products.length === 0 && (
//             <div className="text-center py-12">
//               <PackagePlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <p className="text-lg text-gray-500">No products found. Add your first frame!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }



'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PackagePlus, Trash2, Edit3, Image, Tag, DollarSign, FileText, X } from 'lucide-react';

export default function ProductsAdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  // protect route: only admin
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

  // load products
  useEffect(() => {
    if (checking) return;
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:4000/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          err.message ||
          'Failed to load products';
        setErrorMsg(msg);
      });
  }, [checking]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      const endpoint = editingId
        ? `http://localhost:4000/api/admin/products/${editingId}`
        : 'http://localhost:4000/api/admin/products';

      const method = editingId ? axios.put : axios.post;

      const res = await method(endpoint, {
        title,
        slug,
        price: Number(price),
        imageUrl,
        category,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (editingId) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? res.data.product : p))
        );
        setEditingId(null);
      } else {
        setProducts((prev) => [res.data.product, ...prev]);
      }

      setTitle('');
      setSlug('');
      setPrice('');
      setImageUrl('');
      setCategory('');
      setDescription('');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to save product';
      setErrorMsg(msg);
    }
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setSlug(product.slug);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setCategory(product.category);
    setDescription(product.description);
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:4000/api/admin/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
        setCategory(''); setDescription('');
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to delete product';
      setErrorMsg(msg);
    }
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Product Management
          </h1>
          <p className="text-purple-300">Manage your frame inventory and pricing</p>
        </div>

        {/* Add/Edit Product Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              {editingId ? (
                <>
                  <Edit3 className="w-7 h-7 text-amber-400" />
                  Edit Product
                </>
              ) : (
                <>
                  <PackagePlus className="w-7 h-7 text-emerald-400" />
                  Add New Product
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
                  setCategory(''); setDescription('');
                }}
                className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="group">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Product Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Golden Frame 24x36"
                required
              />
            </div>

            {/* Slug */}
            <div className="group">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="golden-frame-24x36"
                required
              />
            </div>

            {/* Price */}
            <div className="group">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="1299"
                required
              />
            </div>

            {/* Category */}
            <div className="group">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Wooden Frames"
                required
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="https://example.com/frame.jpg"
                required
              />
              {imageUrl && (
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl border border-white/20 shadow-lg"
                  />
                  <span className="text-sm text-purple-300">Preview</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                placeholder="Premium quality golden wooden frame..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="md:col-span-2 flex gap-4">
              <button
                onClick={handleAddProduct}
                className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02]"
              >
                {editingId ? (
                  <>
                    <Edit3 className="w-5 h-5" />
                    Update Product
                  </>
                ) : (
                  <>
                    <PackagePlus className="w-5 h-5" />
                    Add Product
                  </>
                )}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
                    setCategory(''); setDescription('');
                  }}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-purple-300 font-medium rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <PackagePlus className="w-6 h-6 text-purple-400" />
              All Products
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full">
                {products.length}
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-purple-300">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    Product Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 hidden md:table-cell">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 hidden lg:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="relative">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-xl border border-white/20 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white text-lg">
                        {product.title}
                      </div>
                      <div className="text-sm text-purple-400 mt-1">
                        {product.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xl font-bold text-emerald-400">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="px-3 py-1.5 bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2.5 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-amber-500/30"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-red-500/30"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <PackagePlus className="w-20 h-20 text-purple-400/50 mx-auto mb-4" />
              <p className="text-xl text-purple-300 mb-2">No products found</p>
              <p className="text-sm text-purple-400">Add your first frame to get started!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}