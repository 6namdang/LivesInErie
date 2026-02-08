import { useState, useEffect, useMemo } from 'react';
import { http } from '../api/http';
import type { Community } from "../types/community";
import CommunityModal from '../functions/CommunityCard';

export default function CommunityPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await http.get<Community[]>('/api/community');
                setCommunities(response.data);
            } catch (error) {
                console.error("Error fetching Erie directory data:", error);
            }
        };
        fetchCommunities();
    }, []);

    const categories = useMemo(() => {
        const types = communities.map(c => c.type);
        return [...new Set(types)].sort(); 
    }, [communities]);

    const filteredData = useMemo(() => {
        return communities.filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedType === "" || c.type === selectedType)
        );
    }, [searchTerm, selectedType, communities]);

    return (
        <div className="min-h-screen bg-[#f9fafb] font-['Inter_Tight',sans-serif]">
            {/* Hero Section */}
            <header className="bg-[#15a7d6] pt-40 pb-24 px-4 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter italic mb-4">
                        Erie Directory
                    </h1>
                    <div className="h-1 w-20 bg-white mx-auto mb-6"></div>
                    <p className="text-xl opacity-90 font-medium italic">Supporting the Erie community.</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="flex flex-col md:flex-row gap-12">
                    
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-1/4">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-32">
                            <h2 className="text-2xl font-[900] uppercase tracking-tighter text-[#0e2a58] mb-8 italic">Filters</h2>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-[900] uppercase tracking-[0.2em] text-gray-400 mb-3">Search Erie</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 text-sm focus:border-[#15a7d6] outline-none transition-all"
                                        placeholder="Organization name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-[900] uppercase tracking-[0.2em] text-gray-400 mb-3">Category</label>
                                    <select 
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 text-sm outline-none focus:border-[#15a7d6] cursor-pointer"
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <main className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredData.map((item) => (
                                <div key={item.id} onClick={() => setSelectedCommunity(item)} className="cursor-pointer">
                                    <CommunityCard community={item} />
                                </div>
                            ))}
                        </div>

                        {filteredData.length === 0 && (
                            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-100 mt-8">
                                <p className="text-gray-300 font-[900] uppercase tracking-widest italic">No results found in Erie.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {selectedCommunity && (
                <CommunityModal 
                    community={selectedCommunity} 
                    onClose={() => setSelectedCommunity(null)} 
                />
            )}
        </div>
    );
}

function CommunityCard({ community }: { community: Community }) {
    return (
        <article className="bg-white group p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col justify-between">
            <div>
                <span className="px-4 py-1.5 rounded-full bg-[#15a7d6]/10 text-[#15a7d6] text-[10px] font-[900] uppercase tracking-widest mb-6 inline-block">
                    {community.type}
                </span>
                <h3 className="text-2xl font-[900] text-[#0e2a58] leading-[1.1] mb-6 group-hover:text-[#15a7d6] transition-colors uppercase italic tracking-tighter">
                    {community.name}
                </h3>
                <p className="text-sm text-gray-400 font-semibold leading-relaxed">
                    📍 {community.address}
                </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 text-[#0e2a58] font-[900] uppercase text-[10px] tracking-[0.2em] group-hover:text-[#15a7d6] flex justify-between">
                View Details <span>→</span>
            </div>
        </article>
    );
}