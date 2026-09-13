import { ArrowLeft } from 'lucide-react';

export default function ViewPageDestination({ destination, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <button type="button" onClick={onBack} className="mb-6 flex items-center gap-2 text-blue-600">
        <ArrowLeft size={18} /> Back to destinations
      </button>
      {destination ? (
        <article className="max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {destination.image && <img src={destination.image} alt={destination.name} className="h-64 w-full object-cover" />}
          <div className="space-y-4 p-6">
            <h1 className="text-3xl font-bold">{destination.name}</h1>
            <p>{destination.country}</p>
            <p>{destination.description || 'No description available.'}</p>
            <dl className="grid grid-cols-3 gap-4">
              <div><dt className="text-sm text-slate-500">Status</dt><dd>{destination.status}</dd></div>
              <div><dt className="text-sm text-slate-500">Active tours</dt><dd>{destination.activeTours ?? 0}</dd></div>
              <div><dt className="text-sm text-slate-500">Bookings</dt><dd>{destination.bookings ?? 0}</dd></div>
            </dl>
          </div>
        </article>
      ) : <p>No destination selected.</p>}
    </div>
  );
}
