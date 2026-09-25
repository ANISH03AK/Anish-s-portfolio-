import React, { useState } from 'react';
import { Database, Compass, Check, Calendar, Users, MapPin } from 'lucide-react';

interface TourPackage {
  id: number;
  name: string;
  duration: string;
  pricePerPerson: number;
  seatsRemaining: number;
  location: string;
}

const PACKAGES: TourPackage[] = [
  { id: 101, name: 'Ooty Heritage Mountain Trail', duration: '4 Days / 3 Nights', pricePerPerson: 240, seatsRemaining: 6, location: 'Tamil Nadu' },
  { id: 102, name: 'Kerala Backwaters & Houseboat', duration: '5 Days / 4 Nights', pricePerPerson: 320, seatsRemaining: 4, location: 'Kerala' },
  { id: 103, name: 'Kodaikanal Valley & Pine Forest', duration: '3 Days / 2 Nights', pricePerPerson: 180, seatsRemaining: 8, location: 'Tamil Nadu' }
];

export const TourismSimulator: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<TourPackage>(PACKAGES[0]);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [bookedStatus, setBookedStatus] = useState<string | null>(null);

  const handleBook = () => {
    setBookedStatus('TRANSACTION_COMMITTED');
    setTimeout(() => setBookedStatus(null), 2500);
  };

  const totalPrice = selectedPkg.pricePerPerson * guestCount;

  return (
    <div className="p-4 sm:p-5 bg-[#090b12] rounded-2xl border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-white tracking-wide">ONLINE TOURISM PORTAL</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">MYSQL 3NF RELATIONAL SCHEMA</span>
      </div>

      {/* Package Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPkg(pkg)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              selectedPkg.id === pkg.id
                ? 'bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/30'
                : 'bg-[#0d0f1a] border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="text-xs font-bold text-zinc-100">{pkg.name}</div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span>{pkg.location}</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/80 text-[10px] font-mono">
              <span className="text-zinc-400">{pkg.duration}</span>
              <span className="text-emerald-400 font-bold">${pkg.pricePerPerson}/ea</span>
            </div>
          </button>
        ))}
      </div>

      {/* Booking Form & SQL Transaction Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#0e111d] p-3.5 rounded-xl border border-zinc-800/80 items-center">
        {/* Booking Controls (5 cols) */}
        <div className="sm:col-span-5 space-y-3">
          <div>
            <div className="text-[10px] text-zinc-400 font-mono">SELECTED ITINERARY:</div>
            <div className="text-sm font-bold text-white">{selectedPkg.name}</div>
            <div className="text-xs text-zinc-300 font-mono mt-0.5">
              ${totalPrice} Total ({guestCount} Guests)
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Guests:</span>
            {[1, 2, 4].map((num) => (
              <button
                key={num}
                onClick={() => setGuestCount(num)}
                className={`px-2 py-0.5 rounded font-mono text-xs cursor-pointer ${
                  guestCount === num ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={handleBook}
            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Booking (ACID SQL)</span>
          </button>
        </div>

        {/* Live SQL Prepared Query (7 cols) */}
        <div className="sm:col-span-7 bg-[#06070c] p-3 rounded-xl border border-zinc-800 font-mono text-[11px] space-y-1">
          <div className="text-[10px] text-zinc-500 flex items-center gap-1">
            <Database className="w-3 h-3 text-blue-400" />
            <span>TRANSACTION ISOLATION LEVEL: REPEATABLE READ</span>
          </div>
          <pre className="text-blue-300 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
{`START TRANSACTION;
INSERT INTO bookings (pkg_id, guest_count, total_amt, status)
VALUES (${selectedPkg.id}, ${guestCount}, ${totalPrice}, 'CONFIRMED');
UPDATE package_inventory 
SET seats = seats - ${guestCount} 
WHERE pkg_id = ${selectedPkg.id};
COMMIT;`}
          </pre>
          {bookedStatus && (
            <div className="text-emerald-400 text-[10px] font-bold pt-1">
              ✓ 2 rows affected. Transaction committed with zero collision.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
