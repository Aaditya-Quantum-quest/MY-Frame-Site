// // src/app/(auth)/dashboard/gallery/page.jsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { ImagePlus, Trash2 } from 'lucide-react';

// export default function GalleryAdminPage() {
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);
//   const [images, setImages] = useState([]);
//   const [imageUrl, setImageUrl] = useState('');
//   const [title, setTitle] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

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

//   // load gallery
//   useEffect(() => {
//     if (checking) return;
//     const token = localStorage.getItem('token');

//     axios
//       .get('http://localhost:4000/api/admin/gallery', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setImages(res.data))
//       .catch((err) => {
//         setErrorMsg(err.response?.data?.message || 'Failed to load gallery');
//       });
//   }, [checking]);

//   const handleAddImage = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(
//         'http://localhost:4000/api/admin/gallery',
//         { title, imageUrl },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setImages((prev) => [res.data.image, ...prev]);
//       setTitle('');
//       setImageUrl('');
//     } catch (err) {
//       setErrorMsg(
//         err.response?.data?.message || 'Failed to add image'
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:4000/api/admin/gallery/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setImages((prev) => prev.filter((img) => img._id !== id));
//     } catch (err) {
//       setErrorMsg(
//         err.response?.data?.message || 'Failed to delete image'
//       );
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
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
//           <ImagePlus className="w-6 h-6 text-orange-500" />
//           Gallery Manager
//         </h1>

//         {errorMsg && (
//           <p className="mb-3 text-sm text-red-500">{errorMsg}</p>
//         )}

//         {/* Add image form */}
//         <form
//           onSubmit={handleAddImage}
//           className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-3"
//         >
//           <input
//             type="text"
//             placeholder="Image title (optional)"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
//             required
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600"
//           >
//             Add Image
//           </button>
//         </form>

//         {/* Image list */}
//         <div className="grid gap-4 md:grid-cols-3">
//           {images.map((img) => (
//             <div
//               key={img._id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
//             >
//               <img
//                 src={img.imageUrl}
//                 alt={img.title || 'Gallery image'}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-3 flex items-center justify-between">
//                 <p className="text-sm font-medium text-gray-800 truncate">
//                   {img.title || 'Untitled'}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => handleDelete(img._id)}
//                   className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           ))}
//           {images.length === 0 && (
//             <p className="text-sm text-gray-500">
//               No images yet. Add one above.
//             </p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }









'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ImagePlus, Trash2, Image, FileText, Eye } from 'lucide-react';

export default function GalleryAdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

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

  // load gallery
  useEffect(() => {
    if (checking) return;
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:4000/api/admin/gallery', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setImages(res.data))
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || 'Failed to load gallery');
      });
  }, [checking]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:4000/api/admin/gallery',
        { title, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setImages((prev) => [res.data.image, ...prev]);
      setTitle('');
      setImageUrl('');
      setPreviewUrl('');
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Failed to add image'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/admin/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Failed to delete image'
      );
    }
  };

  const handleUrlChange = (url) => {
    setImageUrl(url);
    setPreviewUrl(url);
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
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Image className="w-10 h-10 text-purple-400" />
            Gallery Manager
          </h1>
          <p className="text-purple-300">Upload and manage your frame showcase images</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-300 text-sm">{errorMsg}</p>
          </div>
        )}

        {/* Add Image Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
            <ImagePlus className="w-7 h-7 text-emerald-400" />
            Add New Image
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Image Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Beautiful Golden Frame Display"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                onClick={handleAddImage}
                className="w-full bg-linear-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02]"
              >
                <ImagePlus className="w-5 h-5" />
                Add to Gallery
              </button>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </label>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-64 flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={() => setPreviewUrl('')}
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-16 h-16 text-purple-400/30 mx-auto mb-2" />
                    <p className="text-sm text-purple-400/50">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <Image className="w-6 h-6 text-purple-400" />
              Gallery Images
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full">
                {images.length}
              </span>
            </h2>
          </div>

          {images.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-800">
                    <img
                      src={img.imageUrl}
                      alt={img.title || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {img.title || 'Untitled'}
                      </p>
                      <p className="text-xs text-purple-400 mt-1">
                        {img.createdAt ? new Date(img.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="ml-3 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all border border-red-500/30 flex-shrink-0"
                      title="Delete image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-purple-500 to-pink-500"></div>
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-linear-to-l from-purple-500 to-pink-500"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Image className="w-20 h-20 text-purple-400/50 mx-auto mb-4" />
              <p className="text-xl text-purple-300 mb-2">No images in gallery</p>
              <p className="text-sm text-purple-400">Add your first showcase image above</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}