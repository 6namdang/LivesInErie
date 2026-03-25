import { useState, useEffect, useMemo } from 'react';
import { http } from '../api/http';
import type { Community } from "../types/community";

// Reusable Card Component
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

// Main Page Component
export default function CommunityPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            setIsLoading(true);
            try {
                const response = await http.get<Community[]>('/api/community');
                
                /**
                 * CRITICAL FIX: 
                 * Ensure response.data is actually an array before setting state.
                 * If your API returns { data: [...] }, use response.data.data
                 */
                const data = Array.isArray(response.data) ? response.data : [];
                setCommunities(data);
            } catch (error) {
                console.error("Error fetching Erie directory data:", error);
                setCommunities([]); // Fallback to empty array on error
            } finally {
                setIsLoading(false);
            }
        };
        fetchCommunities();
    }, []);

    // Defensive useMemo: ensures we don't call .map on non-arrays
    const categories = useMemo(() => {
        if (!Array.isArray(communities)) return [];
        const types = communities.map(c => c.type);
        return [...new Set(types)].sort(); 
    }, [communities]);

    // Defensive useMemo: ensures we don't call .filter on non-arrays
    const filteredData = useMemo(() => {
        if (!Array.isArray(communities)) return [];
        return communities.filter(c => 
            (c.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) &&
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
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <main className="w-full md:w-3/4">
                        {isLoading ? (
                            <div className="text-center py-20">
                                <p className="animate-pulse text-[#15a7d6] font-black uppercase tracking-widest">Loading Directory...</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredData.map((item) => (
                                        <div 
                                            key={item.id} 
                                            onClick={() => setSelectedCommunity(item)} 
                                            className="cursor-pointer"
                                        >
                                            <CommunityCard community={item} />
                                        </div>
                                    ))}
                                </div>

                                {filteredData.length === 0 && (
                                    <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-100 mt-8">
                                        <p className="text-gray-300 font-[900] uppercase tracking-widest italic">No results found in Erie.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>

            {/* Modal - Check if CommunityModal exists in your project */}
            {selectedCommunity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[3rem] p-12 max-w-2xl w-full relative">
                         <button 
                            onClick={() => setSelectedCommunity(null)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-black font-bold"
                         >
                            CLOSE ✕
                         </button>
                         <h2 className="text-4xl font-[900] italic uppercase tracking-tighter text-[#0e2a58] mb-4">
                            {selectedCommunity.name}
                         </h2>
                         <p className="text-[#15a7d6] font-bold mb-6 uppercase tracking-widest">{selectedCommunity.type}</p>
                         <p className="text-gray-600 mb-4"><strong>Address:</strong> {selectedCommunity.address}</p>
                         {/* Add more details here if your Community type has them */}
                    </div>
                </div>
            )}
        </div>
    );
}