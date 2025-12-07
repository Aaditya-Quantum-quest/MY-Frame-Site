import Link from 'next/link';

export default function AcrylicPage() {
  const frames = [
    { id: 'single', name: 'Single Photo', img: 'https://via.placeholder.com/300x400/4A90E2/white?text=Single+Photo' },
    { id: 'collage', name: '4 Photos', img: 'https://via.placeholder.com/300x400/E94B3C/white?text=4+Photos' },
    { id: 'clock', name: 'Photo Clock', img: 'https://via.placeholder.com/300x400/50C878/white?text=Photo+Clock' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Acrylic Photos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frames.map((frame) => (
            <Link key={frame.id} href={`/editor?frame=${frame.id}`} className="block">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                <img src={frame.img} alt={frame.name} className="w-full h-64 object-cover rounded-xl mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{frame.name}</h3>
                <p className="text-lg text-gray-600">₹999 onwards</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
