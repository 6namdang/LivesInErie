import { useEffect, useState } from "react";
import { http } from "../api/http.ts";
import type { Job } from "../types/jobs.ts";

export default function JobPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // --- Pagination state ---
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [totalPages] = useState(5);

    // --- Fetch jobs from backend ---
    const fetchJobs = () => {
        setLoading(true);
        http.get(`/api/jobs?page=${page}&size=${size}`)
            .then(response => {
                setJobs(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchJobs();
    }, [page]);

    const filteredJobs = jobs.filter(job =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Generate numbered page buttons ---
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-[1140px] mx-auto px-4">

                {/* --- SEARCH --- */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <h3 className="text-gray-900 font-bold mb-2 text-lg">Search</h3>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search Erie Jobs by Keyword"
                                className="w-full pl-4 pr-10 py-3 rounded border border-gray-300 focus:border-[#10a7dc] outline-none transition-all placeholder:text-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute right-3 top-3.5 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- HEADER --- */}
                <div className="hidden md:flex border-b border-gray-200 py-4 px-4 bg-[#fcfcfc]">
                    <div className="w-1/2 text-gray-900 font-bold text-base">Job Title</div>
                    <div className="w-1/4 text-gray-900 font-bold text-base">Company</div>
                    <div className="w-1/4 text-gray-900 font-bold text-base">City</div>
                </div>

                {/* --- JOBS LIST --- */}
                <div className="flex flex-col">
                    {loading ? (
                        <div className="py-20 text-center text-gray-400 animate-pulse">
                            Scanning Erie for opportunities...
                        </div>
                    ) : filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="flex flex-col md:flex-row md:items-center py-4 px-4 border-b border-[#23376D2B] bg-white transition-all hover:bg-gray-50"
                        >
                            {/* Job Title */}
                            <div className="md:w-1/2 mb-1 md:mb-0">
                                <a
                                    href={job.jobUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#10a7dc] font-bold text-[1.1em] hover:text-[#1d346e] hover:underline transition-colors flex items-center gap-1"
                                >
                                    {job.jobTitle}
                                    <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                </a>
                            </div>

                            {/* Company */}
                            <div className="md:w-1/4 text-[0.95em] text-gray-700">
                                <span className="md:hidden font-bold text-gray-900">Company: </span>
                                {job.companyName}
                            </div>

                            {/* City */}
                            <div className="md:w-1/4 text-[0.95em] text-gray-700">
                                <span className="md:hidden font-bold text-gray-900">City: </span>
                                {job.cityName}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- PAGINATION --- */}
                <div className="mt-10 flex flex-wrap justify-center items-center gap-2 border-t border-gray-100 pt-8">
                    <button
                        className="px-4 py-2 text-gray-400"
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                    >
                        &lt; Previous
                    </button>

                    {pageNumbers.map(num => (
                        <button
                            key={num}
                            className={`px-4 py-2 rounded font-bold ${num === page ? "bg-[#1d346e] text-white" : "border border-gray-200 hover:bg-gray-50"}`}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50"
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}
