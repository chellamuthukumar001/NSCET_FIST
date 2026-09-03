import React, { useState, useEffect } from 'react';
import {
  Search,
  Play,
  Sparkles,
  X,
  Clock,
  Film,
  RefreshCw,
  Layers,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { searchVideosApi, getRelatedVideosApi, VideoSearchResult } from '../../services/videoSearchService';
import { useCopilot } from '../../context/CopilotContext';

interface SearchAndWatchSectionProps {
  initialQuery?: string;
}

const TOPIC_SUGGESTIONS = [
  { label: 'DBMS Normalization', query: 'DBMS normalization 1NF 2NF 3NF BCNF', dept: 'CSE' },
  { label: 'CPU Scheduling', query: 'operating systems CPU scheduling round robin', dept: 'CSE' },
  { label: 'Dynamic Programming', query: 'dynamic programming knapsack shortest path', dept: 'CSE' },
  { label: 'AVL Tree Rotations', query: 'AVL tree rotations data structures', dept: 'CSE' },
  { label: 'Computer Networks', query: 'computer networks TCP IP OSI model routing', dept: 'CSE' },
  { label: 'RSA Cryptography', query: 'RSA algorithm public key cryptography', dept: 'CSE' },
  { label: 'Compiler LL(1)', query: 'compiler design lexical analysis LL1 parsing', dept: 'CSE' },
  { label: 'ARM Cortex & IoT', query: 'ARM cortex architecture embedded systems GPIO', dept: 'ECE' },
  { label: 'K-Maps & Verilog', query: 'digital systems Karnaugh map Verilog HDL', dept: 'ECE' },
  { label: 'Deep Learning CNN', query: 'convolutional neural networks ResNet deep learning', dept: 'AI&DS' },
];

export const SearchAndWatchSection: React.FC<SearchAndWatchSectionProps> = ({ initialQuery = 'DBMS' }) => {
  const { openCopilot } = useCopilot();

  const [query, setQuery] = useState(initialQuery);
  const [selectedDept, setSelectedDept] = useState<'ALL' | 'CSE' | 'ECE' | 'AI&DS'>('ALL');
  const [selectedDuration, setSelectedDuration] = useState<'any' | 'medium' | 'long'>('medium');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<VideoSearchResult[]>([]);
  const [sourceInfo, setSourceInfo] = useState<string>('');
  const [isCached, setIsCached] = useState<boolean>(false);
  const [searchedQuery, setSearchedQuery] = useState<string>('');

  const [activeVideo, setActiveVideo] = useState<VideoSearchResult | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<VideoSearchResult[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const performSearch = async (searchTerm: string, dept = selectedDept, dur = selectedDuration) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    setLoading(true);
    setSearchedQuery(trimmed);

    try {
      const res = await searchVideosApi(trimmed, {
        department: dept === 'ALL' ? undefined : dept,
        duration: dur,
        limit: 12,
      });

      setVideos(res.data || []);
      setSourceInfo(res.source || 'Online Educational Vault');
      setIsCached(Boolean(res.cached));
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(initialQuery);
  }, []);

  useEffect(() => {
    if (activeVideo) {
      setLoadingRelated(true);
      getRelatedVideosApi(activeVideo.videoId, activeVideo.title)
        .then((res) => setRelatedVideos(res))
        .finally(() => setLoadingRelated(false));
    } else {
      setRelatedVideos([]);
    }
  }, [activeVideo]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleChipClick = (chipQuery: string, dept: string) => {
    setQuery(chipQuery);
    setSelectedDept(dept as any);
    performSearch(chipQuery, dept as any);
  };

  return (
    <div className="space-y-6">
      
      {/* Search Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173B2F] via-[#1C483A] to-[#122A22] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#C49A55]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#6FA9C9]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C49A55]/40 text-xs font-bold uppercase tracking-wider text-[#C49A55]">
            <Globe className="w-3.5 h-3.5" />
            <span>Search & Watch • Open Educational Video Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Search & Watch Verified Engineering Lectures
          </h2>

          <p className="text-xs sm:text-sm text-[#DCE7E1] leading-relaxed">
            Search open-source academic video repositories (NPTEL, MIT OpenCourseWare, FreeCodeCamp & YouTube Education). Videos play <strong className="text-white font-bold">directly inside CampusIQ</strong> via official embedded player without redirecting away.
          </p>

          {/* Search Input Bar */}
          <form onSubmit={handleFormSubmit} className="relative flex items-center pt-2">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, e.g. 'DBMS normalization', 'CPU scheduling', 'AVL tree', 'RSA cryptography'..."
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-black/40 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C49A55] shadow-inner"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs p-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#D97736] hover:from-[#b08744] hover:to-[#c2672b] disabled:opacity-50 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Academic Topic Chips */}
          <div className="pt-1 space-y-1.5">
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
              Suggested Engineering Topics:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TOPIC_SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => handleChipClick(s.query, s.dept)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 cursor-pointer transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#C49A55]" />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Ribbon & Source Metadata */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
        {/* Department Filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-gray-500 uppercase text-[10px] font-bold">Department:</span>
          {(['ALL', 'CSE', 'ECE', 'AI&DS'] as const).map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDept(d);
                performSearch(query, d, selectedDuration);
              }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                selectedDept === d
                  ? 'bg-[#173B2F] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d === 'ALL' ? 'All Engineering' : d}
            </button>
          ))}
        </div>

        {/* Quota & Source Indicators */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
          {isCached ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Cache Hit (0 Quota Units)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>Source: {sourceInfo}</span>
            </span>
          )}

          <span className="px-2 py-1 rounded-lg bg-gray-50 text-gray-600 font-mono text-[10px] border border-gray-200">
            {videos.length} Lectures Found
          </span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-3xl bg-white border border-gray-200 p-4 shadow-sm space-y-3 animate-pulse">
              <div className="w-full h-44 rounded-2xl bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && videos.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
          <Film className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-800">No Educational Lectures Found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            We could not find videos matching '{searchedQuery}'. Try a broader engineering term like 'Database', 'Operating Systems', 'Algorithms', or 'Networks'.
          </p>
          <button
            onClick={() => performSearch('DBMS')}
            className="px-4 py-2 rounded-xl bg-[#173B2F] text-white text-xs font-bold cursor-pointer hover:bg-[#285443] transition-colors"
          >
            Show Popular DBMS Lectures
          </button>
        </div>
      )}

      {/* Video Results Grid */}
      {!loading && videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.videoId}
              onClick={() => setActiveVideo(vid)}
              className="group rounded-3xl bg-white border border-gray-200 hover:border-[#173B2F]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#C49A55] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C49A55]" />
                  <span>{vid.durationCategory === 'long' ? 'Comprehensive' : 'Standard'}</span>
                </div>

                {/* Department Tag */}
                {vid.department && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#173B2F]/90 text-white text-[9px] font-bold uppercase tracking-wider">
                    {vid.department}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                    <span className="truncate max-w-[160px] text-emerald-800 font-bold">
                      {vid.channelName}
                    </span>
                    <span className="font-mono text-[10px]">{vid.publishedAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#173B2F] transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C49A55] flex items-center gap-1">
                    <Film className="w-3 h-3" />
                    <span>Embedded In-Platform</span>
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-[#173B2F] group-hover:bg-[#285443] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* EMBEDDED YOUTUBE IFRAME PLAYER MODAL (SAME PAGE - NO REDIRECT TO YOUTUBE)   */}
      {/* ========================================================================= */}
      {activeVideo && (
        <div 
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#101815] border-2 border-[#C49A55]/40 text-white shadow-2xl flex flex-col scrollbar-thin scrollbar-thumb-white/20"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 bg-[#173B2F] flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2.5 truncate max-w-2xl">
                <div className="p-1.5 rounded-xl bg-white/10 text-[#C49A55]">
                  <Film className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] uppercase font-bold text-[#C49A55] block">
                    In-Platform Embedded Lecture Player • {activeVideo.channelName}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {activeVideo.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCopilot('Explain the key concepts from this lecture: ' + activeVideo.title)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C49A55] hover:bg-[#D97736] text-white text-xs font-bold shadow cursor-pointer transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Copilot ✨</span>
                </button>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Close Player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded IFrame Player Container (NO REDIRECT) */}
            <div className="w-full aspect-video bg-black relative">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Details & Meta */}
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                  <span className="font-bold text-[#C49A55] text-sm">
                    {activeVideo.channelName}
                  </span>
                  <span>Published: {activeVideo.publishedAt}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeVideo.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                  {activeVideo.description}
                </p>
              </div>

              {/* Related Educational Videos (Click to Swap Instantly) */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C49A55]" />
                  <span>Related Educational Modules (Click to Watch Immediately):</span>
                </h4>

                {loadingRelated ? (
                  <div className="flex items-center gap-2 text-xs text-gray-400 py-4">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#C49A55]" />
                    <span>Loading related syllabus lectures...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {relatedVideos.map((rel) => (
                      <div
                        key={rel.videoId}
                        onClick={() => setActiveVideo(rel)}
                        className="group p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex flex-col justify-between space-y-2"
                      >
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900">
                          <img src={rel.thumbnailUrl} alt={rel.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-4 h-4 fill-white text-white" />
                          </div>
                        </div>
                        <h5 className="text-[11px] font-bold text-gray-200 group-hover:text-[#C49A55] line-clamp-2">
                          {rel.title}
                        </h5>
                        <span className="text-[9px] text-gray-400 block truncate">
                          {rel.channelName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
