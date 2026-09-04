import { useState, useMemo, useRef, useEffect } from 'react';
import { CHEATSHEET_CATEGORIES, type CheatsheetCategory, type CheatsheetCommand } from '../data/cheatsheet';
import { CategoryCard } from './CategoryCard';

interface CheatsheetViewProps {
  onPracticeCategory: (category: CheatsheetCategory, command?: CheatsheetCommand) => void;
}

export function CheatsheetView({
  onPracticeCategory,
}: CheatsheetViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If pressing / and not in an input/textarea
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape clears search and blurs
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCommandsCount = useMemo(() => {
    return CHEATSHEET_CATEGORIES.reduce((acc, cat) => acc + cat.commands.length, 0);
  }, []);

  // Filtered categories
  const displayedCategories = useMemo(() => {
    let list = CHEATSHEET_CATEGORIES;
    if (selectedCategory) {
      list = list.filter((cat) => cat.id === selectedCategory);
    }
    return list;
  }, [selectedCategory]);

  const matchingCommandsCount = useMemo(() => {
    if (!searchQuery.trim()) return totalCommandsCount;
    const q = searchQuery.toLowerCase().trim();
    return CHEATSHEET_CATEGORIES.reduce((acc, cat) => {
      const matches = cat.commands.filter(
        (cmd) =>
          cmd.keys.some((k) => k.toLowerCase().includes(q)) ||
          cmd.description.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q),
      );
      return acc + matches.length;
    }, 0);
  }, [searchQuery, totalCommandsCount]);

  return (
    <div className="flex-1 min-h-0 flex flex-col max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-2 sm:py-3 overflow-hidden">
      {/* Top Banner / Hero - Compact & Responsive */}
      <div className="shrink-0 mb-2 sm:mb-3 pb-2 sm:pb-2.5 border-b border-gray-800/80">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <h1 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
            Vim Cheat Sheet
          </h1>
        </div>
        <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5 max-w-2xl leading-relaxed">
          Click any category title or command row to practice in the interactive gym drawer.
        </p>
      </div>

      {/* Search & Filter Bar - Shrink 0 */}
      <div className="shrink-0 pb-2 mb-2 border-b border-gray-800/60">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by key or description (e.g. ciw, ddp, replace)..."
              className="w-full pl-8.5 sm:pl-9.5 pr-8 sm:pr-10 py-1.5 sm:py-2 bg-gray-900 border border-gray-700/90 rounded-lg text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-gray-200 px-1 py-0.5 rounded"
                >
                  ✕
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-[10px] font-mono text-gray-400">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* Matches Counter */}
          <div className="text-[11px] sm:text-xs text-gray-400 font-mono shrink-0 flex items-center gap-1.5 justify-between sm:justify-end">
            <span>
              {matchingCommandsCount} / {totalCommandsCount} commands
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap text-[11px] sm:text-xs font-medium transition-colors ${selectedCategory === null
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-900 text-gray-400 hover:text-gray-200 border border-gray-800'
              }`}
          >
            All Categories
          </button>
          {CHEATSHEET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap text-[11px] sm:text-xs font-medium transition-colors ${selectedCategory === cat.id
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-gray-200 border border-gray-800'
                }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Cheatsheet Cards Scroll Area - Flex 1 min-h-0 */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-0.5 sm:pr-1 pb-4">
        {selectedCategory ? (
          <div className="h-full max-h-full flex flex-col">
            {displayedCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                searchQuery={searchQuery}
                onPracticeCategory={onPracticeCategory}
                fullHeight={true}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            {displayedCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                searchQuery={searchQuery}
                onPracticeCategory={onPracticeCategory}
              />
            ))}
          </div>
        )}

        {matchingCommandsCount === 0 && (
          <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800 mt-4">
            <div className="text-2xl mb-1.5">🔍</div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-1">No matching commands found</h3>
            <p className="text-gray-400 text-xs">
              Try searching for a different keyword, shortcut, or clear filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-3 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
