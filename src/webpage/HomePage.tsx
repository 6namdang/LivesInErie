import { Link } from 'react-router'; // Note: usually react-router-dom for web

interface College {
  name: string;
  type: string;
  students: string;
  highlight: string;
  image: string;
  website: string;
}

export const HomePage = () => {
  const images = [
    "https://www.goerie.com/gcdn/authoring/authoring-images/2026/01/23/NETN/88318777007-p-2-coldwork-012326.jpg?crop=4904,2759,x0,y0&width=3200&height=1801&format=pjpg&auto=webp",
    "https://www.luxuryapartmentserie.com/wp-content/uploads/2017/06/070707-DIDmuseum-010.jpg",
    "https://images.squarespace-cdn.com/content/v1/64890c08b14f8044b088a7db/a908c826-d199-4289-ba8a-475d84f7afe4/NPR.jpg",
    "https://www.goerie.com/gcdn/authoring/2020/02/18/NETN/ghows-PA-3922dd5d-ffb8-4679-a672-82e5b1a86d31-e7dcc66b.jpeg?width=700&height=294&fit=crop&format=pjpg&auto=webp",
    "https://www.nwpapride.org/assets/img/erie-pride-parade.webp"
  ];

  const colleges: College[] = [
    { 
        name: "Gannon University", 
        type: "Private Catholic", 
        students: "4,600+", 
        highlight: "Engineering & Health",
        image: "https://pxl-gannonedu.terminalfour.net/fit-in/900x598/filters:quality(50)/filters:format(webp)/prod01/gannon/media/gannon-university/content-assets/images/campus/erie/arch/DuskCampus_20180326_0002.jpg",
        website: "https://www.gannon.edu"
    },
    { 
        name: "Penn State Behrend", 
        type: "Public Research", 
        students: "4,000+", 
        highlight: "Applied Sciences",
        image: "https://behrend.psu.edu/sites/behrend/files/bd-website-hero-summer-4-still.png",
        website: "https://behrend.psu.edu"
    },
    { 
        name: "Mercyhurst University", 
        type: "Private Catholic", 
        students: "3,000+", 
        highlight: "Intelligence Studies",
        image: "https://www.mercyhurst.edu/sites/default/files/styles/hero_home_page_huge/public/2023-10/guidetofinancialaid_web%20%281%29.jpg?h=cd3bb837&itok=Wyupbzlj",
        website: "https://www.mercyhurst.edu"
    },
    { 
        name: "Edinboro University", 
        type: "Public University", 
        students: "3,500+", 
        highlight: "Fine Arts & Education",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbWMJ_XspV3pu88RasR78nVzRMqvBzMP1nQ&s",
        website: "https://www.edinboro.edu"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#fdfcf9] font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white text-sm md:text-base">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-start text-white px-6 md:px-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 hover:scale-100" 
            style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/3/38/Erie_PA_skyline_from_tower_observation_deck_%28cropped%29.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <p className="uppercase tracking-[0.4em] text-[9px] font-black text-blue-400 mb-2 animate-slide-up">Establish 1795 — Pennsylvania</p>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-4 italic uppercase">
            ERIE <span className="text-transparent font-outline-2 block md:inline">PA</span>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-md leading-relaxed opacity-70">
            A coastal frontier where the Great Lakes spirit meets modern innovation.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all duration-500 hover:tracking-widest uppercase">
              EXPLORE THE LAKE
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL SCROLL */}
      <section className="py-16 bg-white">
        <div className="flex overflow-hidden group">
          <div className="flex space-x-6 animate-loop-scroll group-hover:paused py-4 px-6">
            {[...images, ...images].map((img, index) => (
              <div key={index} className="relative h-[400px] w-[300px] md:w-[500px] shrink-0 overflow-hidden rounded-xl group/item">
                <img 
                  src={img} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover/item:scale-100" 
                  alt="Erie Life" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GROWTH & JOBS */}
      <section className="py-24 px-6 md:px-20 bg-[#0a0a0a] text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-6 space-y-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] uppercase italic mb-6">
                The <br/> Growth <br/> <span className="text-blue-500">Engine</span>
              </h2>
              <p className="text-base text-gray-400 leading-relaxed max-w-sm">
                We aren't just a city; we're an ecosystem. Erie is a hub for makers, visionaries, and those ready to build the future.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="relative">
                <p className="text-5xl font-black text-blue-500 leading-none">25%</p>
                <p className="uppercase text-[9px] tracking-[0.2em] text-gray-500 mt-2 font-bold">Tech Sector Growth</p>
              </div>
              <div className="relative">
                <p className="text-5xl font-black text-green-500 leading-none">$102k</p>
                <p className="uppercase text-[9px] tracking-[0.2em] text-gray-500 mt-2 font-bold">Median Home Value</p>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/jobs" className="inline-block border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all">
                View All Jobs
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-6 flex flex-col justify-center">
            {['Manufacturing', 'Healthcare', 'Cybersecurity', 'Advanced Plastics'].map((item, i) => (
              <div key={i} className="group flex items-center justify-between py-6 border-b border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-mono text-xs">0{i+1}</span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic transition-transform duration-500">{item}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDUCATION */}
      <section className="py-24 px-6 md:px-20 bg-[#fdfcf9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">Intellectual <br/> <span className="text-blue-600">Capital</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colleges.map((college, index) => (
              <a 
                key={index} 
                href={college.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative h-[400px] overflow-hidden rounded-2xl bg-black transition-all duration-700 block"
              >
                <img 
                    src={college.image} 
                    alt={college.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400 mb-1">{college.type}</p>
                    <h3 className="text-3xl font-black uppercase italic text-white mb-4 leading-none">{college.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div>
                            <p className="text-[9px] uppercase text-gray-400 font-bold mb-1">Highlight</p>
                            <p className="text-xs text-white font-medium">{college.highlight}</p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase text-gray-400 font-bold mb-1">Student Body</p>
                            <p className="text-xs text-white font-medium">{college.students}</p>
                        </div>
                    </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIFE ON THE LAKE */}
      <section className="relative py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-6xl font-black italic uppercase leading-[0.85]">The <br/> Coastal <br/> <span className="text-blue-500">Life</span></h2>
              <p className="text-lg text-gray-400 leading-relaxed font-light max-w-sm">
                Presque Isle State Park isn't just a park; it's a way of life. Seven miles of pristine sand and the world's best sunsets. 
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-5xl font-black italic">4M</p>
                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-blue-500 mt-2">Annual Visitors</p>
                </div>
                <div>
                  <p className="text-5xl font-black italic">11mi</p>
                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-blue-500 mt-2">Hiking Trails</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
               {['Art & Culture', 'Craft Breweries', 'Sports Events'].map((text, i) => (
                 <div key={i} className="group p-6 rounded-xl border border-white/5 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer flex justify-between items-center">
                   <h4 className="text-xl font-black uppercase italic tracking-tighter">{text}</h4>
                   <span className="text-lg">→</span>
                 </div>
               ))}
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-white pt-24 pb-8 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-[15vw] font-black italic leading-none opacity-5 select-none text-center">ERIE PA</h2>
            <div className="flex flex-col md:flex-row justify-between items-start mt-12 gap-12 border-b border-white/10 pb-12">
                <p className="text-gray-500 max-w-[200px] text-[10px] leading-loose uppercase tracking-[0.15em] font-medium">
                    The official guide to moving, working, and living in the Great Lakes hub.
                </p>
                <div className="grid grid-cols-2 gap-16">
                    <div className="space-y-4">
                        <p className="text-blue-500 font-black uppercase text-[10px] tracking-widest">Connect</p>
                        <div className="flex flex-col gap-2 text-xs font-bold uppercase tracking-tight">
                            <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-blue-500 font-black uppercase text-[10px] tracking-widest">Navigate</p>
                        <div className="flex flex-col gap-2 text-xs font-bold uppercase tracking-tight">
                            <Link to="/jobs" className="hover:text-blue-500 transition-colors">Jobs</Link>
                            <Link to="/education" className="hover:text-blue-500 transition-colors">Universities</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-between text-[9px] uppercase font-bold tracking-[0.3em] text-gray-600">
                <p>© 2026 Live in Erie.</p>
                <p>Great Lakes Spirit</p>
            </div>
        </div>
      </footer>

      <style>{`
        .font-outline-2 {
          -webkit-text-stroke: 1px white;
        }
        @keyframes loop-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-loop-scroll {
          animation: loop-scroll 60s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;