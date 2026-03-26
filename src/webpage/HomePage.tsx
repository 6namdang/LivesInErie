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
                image: 'https://images.squarespace-cdn.com/content/v1/64890c08b14f8044b088a7db/309dd239-05f5-4c22-8bc6-01ce7b1d60ea/downtownerie_06302023-7.jpg'
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
{/* 9. TRANSPORTATION & ACCESS - UPDATED WITH LINKS */}
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
                description: 'Daily flights to major hubs including Chicago, Detroit, and Charlotte. TSA PreCheck available.',
                url: 'https://www.erieairport.org/'
              },
              { 
                title: 'I-90 Interstate', 
                subtitle: 'Coast to Coast', 
                description: 'Direct highway access spanning from Seattle to Boston. 15 minutes to highway from downtown.',
                url: null // Kept static as requested
              },
              { 
                title: 'EMTA Public Transit', 
                subtitle: '26 Routes', 
                description: 'Comprehensive bus system covering Erie County. Affordable, reliable, and expanding.',
                url: 'https://ride-the-e.com/apps/'
              }
            ].map((item, i) => {
              const Wrapper = item.url ? 'a' : 'div';
              return (
                <Wrapper 
                  key={i} 
                  href={item.url || undefined}
                  target={item.url ? "_blank" : undefined}
                  rel={item.url ? "noopener noreferrer" : undefined}
                  className={`group block p-6 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl border border-white/5 transition-all duration-500 ${item.url ? 'hover:scale-[1.02] cursor-pointer hover:border-blue-500/50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-blue-400 font-bold mb-1">{item.subtitle}</p>
                      <h4 className="text-xl font-black uppercase italic">{item.title}</h4>
                    </div>
                    {item.url && (
                      <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-blue-400">↗</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </Wrapper>
              );
            })}
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
<section className="relative py-20 lg:py-32 bg-[#ffffff] overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative">
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      
      {/* Visual Component - Left Column */}
      <div className="w-full lg:w-1/2 relative group">
        {/* Floating Arrows SVG from your source code */}
        <div className="absolute -top-12 -left-8 w-44 md:w-56 z-20 pointer-events-none transform -rotate-12 transition-transform duration-700 group-hover:rotate-0">
          <img 
            src="https://liveinames.com/wp-content/uploads/2025/01/arrows-2-05.svg" 
            alt="Decorative arrows" 
            className="w-full h-auto opacity-90 drop-shadow-xl"
          />
        </div>

        {/* Hero Image with custom border-radius and shadow */}
        <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-[4/4.5] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all duration-500 group-hover:scale-[1.01]">
          <img 
            src="https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=1200" 
            alt="Erie Waterfront" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-60" />
        </div>

        {/* Background decorative shape to mimic Elementor motion elements */}
        <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-50 rounded-[3rem] -z-10 translate-x-4 translate-y-4" />
      </div>

      {/* Content Component - Right Column */}
      <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-8">
        <div className="space-y-2">
          <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
            Experience the 814
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[85px] font-[900] text-[#1a1a1a] uppercase italic leading-[0.85] tracking-tighter">
            Explore <br />
            <span className="text-blue-600">The Lake</span>
          </h2>
        </div>

        <div className="max-w-xl">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium opacity-90">
            Erie is your destination for fun and entertainment, offering endless opportunities to play. 
            Enjoy a vibrant calendar of events, from local festivals to live performances at the Warner Theatre. 
            Explore unique boutiques downtown, or cheer on the SeaWolves at UPMC Park. 
            Savor diverse dining options, from bayfront seafood to cozy local cafes. 
            Whether you’re catching a show, shopping for something special, or indulging in local cuisine, Erie has something for everyone.
          </p>
        </div>

        {/* Caret Buttons (View-Only) */}
        <div className="flex flex-wrap gap-2.5 pt-4">
          {[
            { label: "Play in Erie", primary: true },
            { label: "Attractions" },
            { label: "Calendar" },
            { label: "Sports & Outdoors" },
            { label: "Itineraries" },
            { label: "Magazine Features" }
          ].map((btn, idx) => (
            <div 
              key={idx}
              className={`
                flex items-center gap-2 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300
                ${btn.primary 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-[#141414] text-white hover:bg-blue-600'}
              `}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.374 41.655" className="w-full h-full fill-current">
                  <path d="M-14.929-38.172a1.67,1.67,0,0,0-.831,1.455V-27.3a1.634,1.634,0,0,0,.847,1.455,1.66,1.66,0,0,0,1.679,0l29-16.739a1.653,1.653,0,0,0,.847-1.455v-4.812a1.616,1.616,0,0,0-.847-1.455l-29-16.739a1.66,1.66,0,0,0-1.679,0,1.616,1.616,0,0,0-.847,1.455v9.416a1.634,1.634,0,0,0,.847,1.455L-3.1-47.892a1.633,1.633,0,0,1,.831,1.455,1.634,1.634,0,0,1-.847,1.455Z" transform="translate(15.76 67.272)" />
                </svg>
              </span>
              {btn.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Large Ghost Typography Background Decor */}
  <div className="absolute -bottom-16 -right-16 select-none pointer-events-none opacity-[0.04]">
    <span className="text-[25rem] font-black italic uppercase leading-none text-blue-900">
      ERIE
    </span>
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