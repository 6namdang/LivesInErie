import { Link } from 'react-router';
import { colleges, images } from '../types/college';
import WeatherDashboard from '../functions/WeatherDashboard';

export const HomePage = () => {
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

      {/* 6. HOUSING & AFFORDABILITY */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-600">Cost of Living</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85]">
                Actually <br/> <span className="text-blue-600">Affordable</span>
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-lg">
                Erie offers the rare combination of lakefront living and economic accessibility. Own a home, build equity, and actually afford the life you want—all while living on one of America's Great Lakes.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <p className="text-4xl font-black text-blue-600">18%</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Below National Average</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-black text-green-600">$950</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Avg Monthly Rent</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Housing', erie: '$102k', national: '$280k', savings: '+63%' },
                { label: 'Utilities', erie: '$145', national: '$171', savings: '+15%' },
                { label: 'Groceries', erie: '$320', national: '$385', savings: '+17%' },
                { label: 'Transportation', erie: '$180', national: '$220', savings: '+18%' }
              ].map((item, i) => (
                <div key={i} className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-black uppercase">{item.label}</h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">{item.savings}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 font-bold">Erie</p>
                      <p className="text-2xl font-black text-blue-600">{item.erie}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase text-gray-400 font-bold">US Average</p>
                      <p className="text-lg font-bold text-gray-400 line-through">{item.national}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEIGHBORHOODS */}
      <section className="py-24 px-6 md:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none mb-4">
              Your <span className="text-blue-500">Neighborhood</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              From historic districts to waterfront communities, find where you belong.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Downtown Erie', 
                vibe: 'Urban Revival',
                description: 'Walkable streets, historic architecture, and a thriving arts scene. Loft living meets waterfront access.',
                price: '$125k avg',
                image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
              },
              { 
                name: 'Millcreek Township', 
                vibe: 'Family Suburban',
                description: 'Top-rated schools, shopping centers, and safe neighborhoods. The classic American suburb done right.',
                price: '$165k avg',
                image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800'
              },
              { 
                name: 'Harbor Creek', 
                vibe: 'Waterfront Living',
                description: 'Lake Erie views, marina access, and small-town charm. Wake up to sunrise over the water.',
                price: '$190k avg',
                image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
              }
            ].map((neighborhood, i) => (
              <div key={i} className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer">
                <img 
                  src={neighborhood.image} 
                  alt={neighborhood.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-black text-blue-400 mb-2">{neighborhood.vibe}</p>
                  <h3 className="text-3xl font-black uppercase italic mb-3">{neighborhood.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {neighborhood.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <p className="text-lg font-black">{neighborhood.price}</p>
                    <span className="text-blue-400 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 9. TRANSPORTATION & ACCESS */}
      <section className="py-24 px-6 md:px-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85]">
              Perfectly <br/> <span className="text-blue-600">Connected</span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-lg">
              Erie sits at the crossroads of major highways, with direct access to Cleveland, Pittsburgh, Buffalo, and Toronto. Work locally, or commute regionally—you're connected to it all.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { city: 'Pittsburgh', time: '2h 15m', distance: '128 mi' },
                { city: 'Cleveland', time: '1h 45m', distance: '100 mi' },
                { city: 'Buffalo', time: '1h 30m', distance: '90 mi' },
                { city: 'Toronto', time: '3h 30m', distance: '190 mi' }
              ].map((route, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">To {route.city}</p>
                  <p className="text-2xl font-black text-blue-600 mb-1">{route.time}</p>
                  <p className="text-xs text-gray-500 font-medium">{route.distance} drive</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[
              { 
                title: 'Erie International Airport', 
                subtitle: 'ERI', 
                description: 'Daily flights to major hubs including Chicago, Detroit, and Charlotte. TSA PreCheck available.' 
              },
              { 
                title: 'I-90 Interstate', 
                subtitle: 'Coast to Coast', 
                description: 'Direct highway access spanning from Seattle to Boston. 15 minutes to highway from downtown.' 
              },
              { 
                title: 'EMTA Public Transit', 
                subtitle: '26 Routes', 
                description: 'Comprehensive bus system covering Erie County. Affordable, reliable, and expanding.' 
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-blue-400 font-bold mb-1">{item.subtitle}</p>
                    <h4 className="text-xl font-black uppercase italic">{item.title}</h4>
                  </div>
                  <span className="text-2xl group-hover:rotate-45 transition-transform">→</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SEASONS & CLIMATE */}
      <section className="py-24 px-6 md:px-20 bg-[#0a0a0a] text-white">
        <WeatherDashboard />
      </section>


      {/* 11. TESTIMONIALS */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-600 mb-4">Real Stories</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none">
              Why They <br/> <span className="text-blue-600">Moved</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                title: 'Tech Entrepreneur',
                from: 'From San Francisco',
                quote: 'I left Silicon Valley for Erie and never looked back. Built my startup here for 1/10th the cost, with better work-life balance and actual seasons.',
                year: '2023'
              },
              {
                name: 'Marcus Williams',
                title: 'Manufacturing Engineer',
                from: 'From Detroit',
                quote: 'Erie offered everything—great job at WABTEC, affordable housing, and I can walk to the beach after work. The American dream still exists here.',
                year: '2022'
              },
              {
                name: 'Emma Rodriguez',
                title: 'Remote Marketing Director',
                from: 'From NYC',
                quote: 'Traded my $3,000 studio for a lakefront house with a yard. Still do the same job, but now I actually have money left over to enjoy life.',
                year: '2024'
              }
            ].map((testimonial, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-2xl hover:border-blue-500 transition-all duration-500">
                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-blue-600 mb-4">{testimonial.from} • {testimonial.year}</p>
                <p className="text-lg leading-relaxed text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-black text-gray-900">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CALL TO ACTION */}
      <section className="py-32 px-6 md:px-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black mb-4">Make The Move</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-[0.85]">
            Your <br/> Next Chapter <br/> Starts Here
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Join the growing community of people discovering that Erie isn't just affordable—it's a place where you can actually build the life you want.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/jobs" className="bg-white text-blue-900 px-10 py-5 rounded-full text-sm font-black uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Browse Jobs
            </Link>
            <Link to="/ready-to-move" className="border-2 border-white text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-wider hover:bg-white hover:text-blue-900 transition-all duration-300">
              Request Info Pack
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div>
              <p className="text-4xl font-black mb-2">96K</p>
              <p className="text-xs uppercase tracking-wider opacity-70">Population</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-2">40mi</p>
              <p className="text-xs uppercase tracking-wider opacity-70">Of Coastline</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-2">229</p>
              <p className="text-xs uppercase tracking-wider opacity-70">Years of History</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-white pt-24 pb-8 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
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