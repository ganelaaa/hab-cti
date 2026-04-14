"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function LiteratureSearch() {
  // --- 1. STATE MANAGEMENT ---
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Database States
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter States
  const [activeFilters, setActiveFilters] = useState({
    Salinity: '',
    Species: '',
    Technology: '',
    Scale: '',
    Type: ''
  });

  const filterOptions = {
    Salinity: ['Freshwater', 'Brackish', 'Marine', 'Hypersaline'],
    Species: ['Karenia brevis', 'Microcystis', 'Alexandrium', 'Cyanobacteria'],
    Technology: ['Chemical', 'Biological', 'Physical', 'Mechanical'],
    Scale: ['Lab', 'Mesocosm', 'Field', 'Full-Scale'],
    Type: ['Journal Article', 'White Paper', 'Case Study', 'Video Report']
  };

  const handleFilterChange = (category, selectedValue) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [category]: selectedValue
    }));
  };

  // --- 2. DATABASE FETCH LOGIC ---
  const fetchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/literature?search=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
    setIsLoading(false);
  };
 
  // --- 3. LIVE SEARCH (DEBOUNCING) ---
  useEffect(() => {
    // Skip the very first render on the home screen if the box is empty
    if (!hasSearched && searchQuery.trim() === '') return;

    // If typing starts on the home screen, instantly flip to the Results View
    if (!hasSearched && searchQuery.trim() !== '') {
      setHasSearched(true);
    }

    // Wait 300ms after the user STOPS typing before hitting the database
    const delayDebounceFn = setTimeout(() => {
      fetchResults(searchQuery);
    }, 300);

    // Cleanup: If they press a key before 300ms, cancel the previous timer
    return () => clearTimeout(delayDebounceFn);
    
  }, [searchQuery, hasSearched]);
  

  // --- 4. HANDLE SEARCH BUTTON CLICK / ENTER KEY ---
  const handleSearch = (e) => {
    e.preventDefault();
    // We no longer call fetchResults() here because the useEffect handles it automatically!
    // We just ensure the UI flips to the results view if it hasn't already.
    if (!hasSearched) {
      setHasSearched(true);      
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full text-black">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:underline">&larr; Home</Link>
          <span>&gt;</span>
          <span>Literature</span>
          <span>&gt;</span>
          <span className="font-bold text-black">Literature Search</span>
        </div>

        {/* =========================================
            VIEW 1: INITIAL SEARCH (HERO)
            ========================================= */}
        {!hasSearched && (
          <div className="flex flex-col items-center justify-center mt-12">
            <h1 className="text-5xl font-bold text-[#0056b3] mb-2">Literature Search</h1>
            <p className="text-lg text-gray-600 mb-10">Discover relevant studies, articles, and insights — all in one place.</p>
            
            <form onSubmit={handleSearch} className="w-full max-w-3xl relative flex items-center mb-6">
              <span className="absolute left-4 text-gray-400 text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="What research are you looking for today?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-4 pl-12 pr-32 focus:outline-none focus:border-[#0056b3] text-lg text-black"
              />
              <button type="submit" className="absolute right-2 bg-[#0056b3] text-white px-8 py-2 rounded font-medium hover:bg-blue-800 transition">
                Search
              </button>
            </form>

            {/* Dynamic Filter Dropdowns */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl mt-4">
              <span className="font-bold text-[#0056b3]">Filter by:</span>
              {Object.entries(filterOptions).map(([category, options]) => (
                <select 
                  key={category} 
                  value={activeFilters[category]}
                  onChange={(e) => handleFilterChange(category, e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:border-[#0056b3] cursor-pointer"
                >
                  <option value="" disabled>{category}</option>
                  {options.map((optionName) => (
                    <option key={optionName} value={optionName}>{optionName}</option>
                  ))}
                </select>
              ))}
            </div>

            {/* Data Partners Placeholder */}
            <div className="mt-32 text-center">
              <p className="text-sm font-bold text-gray-400 uppercase mb-4">Data Partners</p>
              <div className="flex justify-center gap-8 opacity-70">
                <span className="font-bold text-[#0056b3]">NOAA</span>
                <span className="font-bold text-green-600">IMET</span>
                <span className="font-bold text-blue-500">MOTE</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            VIEW 2: SEARCH RESULTS DASHBOARD
            ========================================= */}
        {hasSearched && (
          <div>
            <h1 className="text-4xl font-bold text-black mb-8 text-center">
              Your search results for "{searchQuery}"
            </h1>
            
            <form onSubmit={handleSearch} className="w-full relative flex items-center mb-6 max-w-4xl mx-auto">
              <span className="absolute left-4 text-gray-400">🔍</span>
              <input 
                autoFocus // <--- THIS PREVENTS THE CURSOR FROM DISAPPEARING!
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-400 rounded py-3 pl-10 pr-24 focus:outline-none text-black"
              />
              <button type="submit" className="absolute right-2 bg-[#0056b3] text-white px-6 py-1.5 rounded font-medium">
                Search
              </button>
            </form>

            <div className="flex gap-8 mt-8">
              {/* LEFT SIDEBAR */}
              <aside className="w-1/4 border border-gray-300 rounded-lg p-5 h-fit shadow-sm">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h3 className="font-bold text-lg text-black">Filter</h3>
                  <button className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded">Clear All</button>
                </div>
                
                {/* Dynamically generating sidebar checkboxes from your options */}
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="mb-6">
                    <h4 className="font-bold text-sm mb-3 text-black">{category}</h4>
                    {options.slice(0, 4).map(optionName => (
                      <label key={optionName} className="flex items-center gap-3 mb-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" className="accent-[#0056b3] w-4 h-4" /> {optionName}
                      </label>
                    ))}
                  </div>
                ))}
              </aside>

              {/* RIGHT AREA: MYSQL RESULTS */}
              <div className="w-3/4 space-y-8">
                {isLoading ? (
                  <p className="text-gray-500">Loading publications from database...</p>
                ) : results.length === 0 ? (
                  <p className="text-gray-500">No results found.</p>
                ) : (
                  results.map((pub, index) => (
                    <div key={pub.id} className="flex gap-5 border-b border-gray-200 pb-8">
                      <div className="w-8 h-8 rounded-full bg-[#0056b3] text-white flex items-center justify-center font-bold shrink-0 text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{pub.resource_type}</span>
                        
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="block text-xl font-bold text-[#0056b3] underline mb-1 hover:text-blue-800">
                          {pub.title}
                        </a>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {pub.authors} <br/>
                          {pub.publication_year}; {pub.publisher_info}
                        </p>
                        
                        <p className="text-sm text-gray-800 leading-relaxed mb-4">
                          {pub.abstract}
                        </p>

                        {/* Database Tags */}
                        {pub.tags && pub.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {pub.tags.map((tag, tagIndex) => (
                              <span key={`${pub.id}-${tag}-${tagIndex}`} className="bg-blue-50 text-[#0056b3] px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}