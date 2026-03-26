import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { http } from '../api/http';
import type { Community } from '../types/community';

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lon) map.setView([lat, lon], 16, { animate: true });
    }, [lat, lon, map]);
    return null;
}

export default function CommunityPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapLoading, setIsMapLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeType, setActiveType] = useState<string | null>(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const res = await http.get<Community[]>('/api/community');
                setCommunities(Array.isArray(res.data) ? res.data : []);
            } catch (e) {
                console.error('Failed to fetch communities:', e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCommunities();
    }, []);

    useEffect(() => {
        if (!selectedCommunity) { setCoords(null); return; }
        const geocode = async () => {
            setIsMapLoading(true);
            setCoords(null);
            try {
                const res = await http.get<{ lat: number; lon: number }>(
                    `/api/geocoding?address=${encodeURIComponent(selectedCommunity.address)}`
                );
                setCoords(res.data);
            } catch (e) {
                console.error('Geocoding failed:', e);
            } finally {
                setIsMapLoading(false);
            }
        };
        geocode();
    }, [selectedCommunity]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCommunity(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const allTypes = useMemo(() => {
        const types = communities.map(c => c.type);
        return [...new Set(types)].sort();
    }, [communities]);

    const groupedCommunities = useMemo(() => {
        const filtered = communities.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = activeType ? c.type === activeType : true;
            return matchesSearch && matchesType;
        });

        return filtered.reduce<Record<string, Community[]>>((acc, c) => {
            if (!acc[c.type]) acc[c.type] = [];
            acc[c.type].push(c);
            return acc;
        }, {});
    }, [communities, searchTerm, activeType]);

    const totalFiltered = Object.values(groupedCommunities).flat().length;

    return (
        <div className="min-h-screen bg-[#f9fafb] font-sans">
            {/* Minimal Header */}
            <header className="bg-[#15a7d6] pt-24 pb-16 px-6 text-center text-white">
                <h1 className="text-5xl font-[900] italic uppercase tracking-tighter">Erie Directory</h1>
                <p className="mt-2 text-white/80 text-xs font-black uppercase tracking-[0.2em]">
                    {!isLoading && `${communities.length} Organizations`}
                </p>
            </header>

            <div className="max-w-7xl mx-auto px-6 mt-12 pb-20 flex flex-col md:flex-row gap-12">
                
                {/* Fixed Sidebar Controls */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-8 space-y-8">
                        
                        {/* Search Section */}
                        <section>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">
                                Search Directory
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type name..."
                                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl text-sm outline-none focus:border-[#15a7d6] focus:ring-4 focus:ring-[#15a7d6]/5 transition-all shadow-sm"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 text-xs"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* Filter Section */}
                        <section>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">
                                Categories
                            </label>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => setActiveType(null)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                                            activeType === null
                                                ? 'bg-[#15a7d6] text-white shadow-lg shadow-[#15a7d6]/20'
                                                : 'text-gray-500 hover:bg-white hover:shadow-sm'
                                        }`}
                                    >
                                        All Types
                                    </button>
                                </li>
                                {allTypes.map(type => (
                                    <li key={type}>
                                        <button
                                            onClick={() => setActiveType(type === activeType ? null : type)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                                                activeType === type
                                                    ? 'bg-[#15a7d6] text-white shadow-lg shadow-[#15a7d6]/20'
                                                    : 'text-gray-500 hover:bg-white hover:shadow-sm'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-8 h-8 border-4 border-[#15a7d6] border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Loading Erie Data...</p>
                        </div>
                    ) : totalFiltered === 0 ? (
                        <div className="bg-white rounded-[3rem] py-32 text-center border-2 border-dashed border-gray-100">
                            <p className="text-gray-300 text-xs font-black uppercase tracking-widest">
                                No results match your filters.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {Object.entries(groupedCommunities)
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(([type, items]) => (
                                    <section key={type} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-4 mb-8">
                                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#15a7d6]">
                                                {type}
                                            </h2>
                                            <div className="flex-1 h-px bg-gray-100" />
                                            <span className="text-[10px] text-gray-300 font-black">{items.length}</span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {items.map(item => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => setSelectedCommunity(item)}
                                                    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <h3 className="text-lg font-[900] text-[#0e2a58] italic uppercase group-hover:text-[#15a7d6] transition-colors leading-none mb-4">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-[11px] text-gray-400 font-medium italic">
                                                            📍 {item.address}
                                                        </p>
                                                    </div>
                                                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#0e2a58] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                                            View Map →
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Modal Overlay */}
            {selectedCommunity && (
                <div
                    className="fixed inset-0 z-[100] bg-[#0e2a58]/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={e => { if (e.target === e.currentTarget) setSelectedCommunity(null); }}
                >
                    <div className="bg-white rounded-[3rem] w-full max-w-5xl h-[600px] flex flex-col md:flex-row overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
                        <button
                            onClick={() => setSelectedCommunity(null)}
                            className="absolute top-6 right-8 z-[110] bg-white w-10 h-10 rounded-full shadow-lg font-bold text-gray-400 hover:text-black"
                        >✕</button>

                        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white">
                            <span className="text-[10px] font-black text-[#15a7d6] uppercase tracking-[0.2em] mb-4">
                                {selectedCommunity.type}
                            </span>
                            <h2 className="text-4xl font-[900] italic uppercase text-[#0e2a58] leading-none mb-8">
                                {selectedCommunity.name}
                            </h2>
                            <div className="space-y-4">
                                <p className="text-gray-500 text-sm font-medium">📍 {selectedCommunity.address}</p>
                                {selectedCommunity.phoneNumber && <p className="text-gray-500 text-sm font-medium">📞 {selectedCommunity.phoneNumber}</p>}
                                {selectedCommunity.websiteUrl && (
                                    <a href={selectedCommunity.websiteUrl} target="_blank" className="inline-block mt-4 text-[#15a7d6] font-black text-[10px] uppercase tracking-widest border-b-2 border-[#15a7d6] pb-1">
                                        Open Website ↗
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 bg-gray-50 relative border-l border-gray-100">
                            {coords ? (
                                <MapContainer center={[coords.lat, coords.lon]} zoom={16} className="h-full w-full">
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[coords.lat, coords.lon]}>
                                        <Popup>{selectedCommunity.name}</Popup>
                                    </Marker>
                                    <RecenterMap lat={coords.lat} lon={coords.lon} />
                                </MapContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center gap-3">
                                    {isMapLoading ? <div className="w-6 h-6 border-2 border-[#15a7d6] border-t-transparent rounded-full animate-spin" /> : <p className="text-gray-300 italic font-bold">Location not found</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}