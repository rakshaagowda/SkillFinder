import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Code, Trophy, Palette, Users, Gamepad2, Globe, Zap, Languages as LangIcon, LayoutGrid } from 'lucide-react';
import SkillCard from './SkillCard';

export default function Dashboard({ user }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [mode, setMode] = useState("both");
  const [lang, setLang] = useState("any");
  const [location, setLocation] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debounce search and location
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlatforms();
    }, 500);
    return () => clearTimeout(timer);
  }, [query, category, mode, lang, location]);

  const fetchPlatforms = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (category !== 'all') params.append('category', category);
    if (mode !== 'both') params.append('mode', mode);
    if (lang !== 'any') params.append('language', lang);
    if (location) params.append('location', location);

    fetch(`http://localhost:3000/api/platforms?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setPlatforms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch platforms", err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to learn? (e.g., Python, Swimming)"
                className="w-full bg-dark-card border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dark-accent shadow-lg shadow-violet-900/5 transition-all"
              />
            </div>

            {(mode === 'offline' || mode === 'both') && (
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter City (e.g., Bengaluru, Mumbai)"
                  className="w-full bg-dark-card border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dark-accent shadow-lg shadow-violet-900/5 transition-all"
                />
              </div>
            )}
          </div>

          {/* Animated Horizontal Filters */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: 'all', label: 'All', icon: LayoutGrid },
                { id: 'academic', label: 'Academic', icon: Code },
                { id: 'soft', label: 'Soft Skills', icon: Users },
                { id: 'artistic', label: 'Artistic', icon: Palette },
                { id: 'sports', label: 'Sports', icon: Trophy },
                { id: 'co-curricular', label: 'Co-curricular', icon: Gamepad2 },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105
                    ${category === cat.id
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25 ring-2 ring-violet-400/20'
                      : 'bg-dark-card text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50'}
                  `}
                >
                  <cat.icon className={`w-4 h-4 ${category === cat.id ? 'animate-pulse' : ''}`} />
                  <span className="font-medium">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Extended Filters (Mode & Language) */}
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-dark-card/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-500">

              {/* Mode Toggle */}
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-violet-400" /> Learning Mode
                </label>
                <div className="flex bg-dark-bg p-1 rounded-xl border border-slate-700/50 w-fit">
                  {[
                    { id: 'both', label: 'Any' },
                    { id: 'online', label: 'Online' },
                    { id: 'offline', label: 'Offline' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`
                        px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300
                        ${mode === m.id
                          ? 'bg-violet-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                      `}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Scroll */}
              <div className="flex-1 space-y-3 overflow-hidden">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <LangIcon className="w-4 h-4 text-emerald-400" /> Language
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-linear-fade">
                  {["any", "English", "Hindi", "Kannada", "Telugu", "Tamil", "Marathi", "Bengali", "Spanish", "French"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`
                        px-4 py-2 rounded-lg text-sm border transition-all duration-200 whitespace-nowrap
                        ${lang === l
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                          : 'bg-dark-bg border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}
                      `}
                    >
                      {l === 'any' ? 'Any Language' : l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading platforms...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map(item => (
              <SkillCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && platforms.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-dark-card inline-block p-4 rounded-full mb-4">
              <Filter className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
