import { useEffect, useRef, useState } from 'react';
import { http } from '../api/http';
import type { Community } from "../types/community";

// Leaflet global declaration
declare const L: any;

interface ModalProps {
    community: Community;
    onClose: () => void;
}

export default function CommunityModal({ community, onClose }: ModalProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletInstance = useRef<any>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const initializeMap = async () => {
        setLoading(true);
        
        // Prepare the address for your specific Java backend
        const query = community.address.toLowerCase().includes("erie") 
            ? community.address 
            : `${community.address}, Erie, PA`;

        console.log(query);
        try {
            const response = await http.get(`/api/geocoding`, {
                params: { address: query }
            });
            console.log(response);

            const data = response.data; // This is now your Map<String, Double>
            console.log(data);
            // UPDATED: No more data[0] check, your backend returns the object directly
            if (data && data.lat && data.lon && mapRef.current) {
                const { lat, lon } = data;

                if (!leafletInstance.current) {
                    leafletInstance.current = L.map(mapRef.current).setView([lat, lon], 16);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap'
                    }).addTo(leafletInstance.current);

                    L.marker([lat, lon])
                        .addTo(leafletInstance.current)
                        .bindPopup(`<strong>${community.name}</strong>`)
                        .openPopup();
                }
            }
        } catch (err) {
            console.error("Geocoding failed via Java Backend:", err);
        } finally {
            setLoading(false);
        }
    };

    initializeMap();

    return () => {
        if (leafletInstance.current) {
            leafletInstance.current.remove();
            leafletInstance.current = null;
        }
    };
}, [community]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0e2a58]/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative border border-white/20">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-8 right-8 z-[2000] w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg font-bold hover:bg-[#15a7d6] hover:text-white transition-all"
                >
                    ✕
                </button>

                {/* Info Panel */}
                <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto bg-white flex flex-col">
                    <button onClick={onClose} className="text-[#15a7d6] text-[10px] font-[900] uppercase tracking-[0.2em] mb-12 text-left hover:underline italic">
                        ← Back to Erie List
                    </button>
                    
                    <span className="text-[10px] font-[900] uppercase tracking-widest text-[#15a7d6] mb-3 block">{community.type}</span>
                    <h2 className="text-4xl md:text-6xl font-[900] text-[#0e2a58] italic uppercase leading-[0.85] mb-12 tracking-tighter">
                        {community.name}
                    </h2>

                    <div className="space-y-10">
                        <div className="border-l-4 border-[#15a7d6] pl-6">
                            <h4 className="text-[10px] font-[900] uppercase tracking-widest text-gray-300 mb-2">Location</h4>
                            <p className="text-[#0e2a58] font-bold text-xl leading-snug">{community.address}</p>
                        </div>

                        {community.phoneNumber && (
                            <div className="border-l-4 border-gray-100 pl-6">
                                <h4 className="text-[10px] font-[900] uppercase tracking-widest text-gray-300 mb-2">Phone</h4>
                                <a href={`tel:${community.phoneNumber}`} className="text-[#15a7d6] font-bold text-xl hover:underline">
                                    {community.phoneNumber}
                                </a>
                            </div>
                        )}

                        {community.websiteUrl && (
                            <div className="pt-6">
                                <a href={community.websiteUrl} target="_blank" rel="noreferrer" 
                                   className="inline-block bg-[#0e2a58] text-white px-12 py-5 rounded-2xl font-[900] uppercase text-xs tracking-[0.2em] hover:bg-[#15a7d6] transition-all shadow-xl">
                                    Visit Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Panel */}
                <div className="w-full md:w-1/2 bg-gray-50 relative border-l border-gray-100 min-h-[400px]" ref={mapRef}>
                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-20">
                            <div className="w-10 h-10 border-4 border-[#15a7d6] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[10px] font-[900] uppercase tracking-widest text-gray-400 mt-4">Locating in Erie...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}