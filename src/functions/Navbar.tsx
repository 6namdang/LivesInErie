import { Link, useLocation } from "react-router";
import { navItems } from "../types/menu"; // Ensure this path is correct
import { useState, useEffect } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Logic: Is this the home page? 
    const isHome = location.pathname === "/";
    
    // Determine theme: Switch to light theme if NOT home OR if user has scrolled
    const isLightNavbar = !isHome || scrolled;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isActive = (path?: string) => location.pathname === path;

    return (
        <nav className={`fixed top-0 w-full transition-all duration-500 z-[100] ${
            isLightNavbar 
            ? "bg-white border-b border-gray-200 py-3 shadow-md" 
            : "bg-transparent py-6"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    
        <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <img 
            src="./test.png" 
            alt="Logo" 
            className="h-16 w-auto transition-all duration-500"/></Link>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative group">
                                {item.subItems ? (
                                    <>
                                        <button className={`flex items-center text-sm font-bold tracking-wide uppercase transition-colors py-2 group-hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 ${
                                            isLightNavbar 
                                            ? "text-gray-700 hover:text-black after:bg-black" 
                                            : "text-gray-300 hover:text-white after:bg-white"
                                        }`}>
                                            {item.label}
                                            <svg className="w-3 h-3 ml-1.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Dropdown */}
                                        <div className="absolute left-0 top-full pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300">
                                            <div className="min-w-[240px] bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden p-2">
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.to}
                                                        to={subItem.to}
                                                        className={`block px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                                                            isActive(subItem.to) 
                                                            ? "bg-gray-100 text-black" 
                                                            : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                                        }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link 
                                        to={item.to!} 
                                        className={`relative text-sm font-bold tracking-wide uppercase py-2 transition-all after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
                                            isActive(item.to) ? "after:w-full" : "after:w-0 hover:after:w-full"
                                        } ${
                                            isLightNavbar 
                                            ? "text-gray-700 hover:text-black after:bg-black" 
                                            : "text-gray-300 hover:text-white after:bg-white"
                                        } ${isActive(item.to) && isLightNavbar ? "text-black" : isActive(item.to) ? "text-white" : ""}`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        <Link 
                            to="/ready-to-move"
                            className={`ml-4 flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-xl ${
                                isLightNavbar 
                                ? "bg-black text-white hover:bg-gray-800" 
                                : "bg-white text-gray-900 hover:bg-gray-200"
                            }`}
                        >
                            Ready to Move?
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 transition-colors ${isLightNavbar ? "text-black" : "text-white"}`}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed inset-0 z-[110] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
                    onClick={() => setIsOpen(false)} 
                />
                <div className={`absolute right-0 top-0 h-full w-[300px] bg-white border-l border-gray-100 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 pt-20 flex flex-col h-full">
                        {/* Mobile Logo - Always Dark for white sidebar */}
                        <img 
                            src="./test.png" 
                            alt="Logo" 
                            className="h-12 w-auto self-start mb-10"
                        />
                        <div className="space-y-6">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.subItems ? (
                                        <>
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-4">
                                                {item.label}
                                            </span>
                                            <div className="space-y-4 border-l-2 border-gray-100 ml-1 pl-4">
                                                {item.subItems.map(sub => (
                                                    <Link 
                                                        key={sub.to} 
                                                        to={sub.to} 
                                                        className={`block font-bold uppercase text-lg ${isActive(sub.to) ? "text-black" : "text-gray-500"}`}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link 
                                            to={item.to || "#"} 
                                            className={`text-2xl font-black uppercase tracking-tighter block ${isActive(item.to) ? "text-black" : "text-gray-400"}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-auto">
                            <Link 
                                to="/ready-to-move"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex justify-center bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm"
                            >
                                Ready to Move?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};