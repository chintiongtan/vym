import { useState, useCallback, useEffect } from 'react';
import { CHEATSHEET_CATEGORIES, type CheatsheetCategory, type CheatsheetCommand } from './data/cheatsheet';
import { CheatsheetView } from './components/CheatsheetView';
import { CategoryPracticeDrawer } from './components/CategoryPracticeDrawer';

function App() {
  const [gymOpen, setGymOpen] = useState<boolean>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash.startsWith('gym');
  });

  const [activeCategory, setActiveCategory] = useState<CheatsheetCategory>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('gym/')) {
      const catId = hash.replace('gym/', '');
      const found = CHEATSHEET_CATEGORIES.find((c) => c.id === catId);
      if (found) return found;
    }
    return CHEATSHEET_CATEGORIES[0];
  });

  const [selectedCommand, setSelectedCommand] = useState<CheatsheetCommand | null>(null);

  const handlePracticeCategory = useCallback((category: CheatsheetCategory, command?: CheatsheetCommand) => {
    setActiveCategory(category);
    setSelectedCommand(command || null);
    setGymOpen(true);
    window.location.hash = `gym/${category.id}`;
  }, []);

  const handleCloseGym = useCallback(() => {
    setGymOpen(false);
    setSelectedCommand(null);
    window.location.hash = 'cheatsheet';
  }, []);

  // Sync hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'cheatsheet') {
        setGymOpen(false);
      } else if (hash.startsWith('gym')) {
        setGymOpen(true);
        if (hash.startsWith('gym/')) {
          const catId = hash.replace('gym/', '');
          const found = CHEATSHEET_CATEGORIES.find((c) => c.id === catId);
          if (found) {
            setActiveCategory(found);
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="h-screen h-[100dvh] bg-gray-950 text-gray-200 flex flex-col overflow-hidden font-sans">
      {/* Top Global Navigation Bar */}
      <header className="shrink-0 z-30 bg-gray-900/90 backdrop-blur border-b border-gray-800 px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href="#cheatsheet"
            onClick={(e) => {
              e.preventDefault();
              handleCloseGym();
            }}
            className="flex items-center gap-2 text-white font-bold text-sm sm:text-base hover:text-emerald-400 transition-colors"
          >
            <span className="text-emerald-400 text-base sm:text-lg">⌨</span>
            <span className="text-white font-extrabold tracking-tight">Vym</span>
            <span className="text-[11px] sm:text-xs text-gray-500 font-normal">| Dictionary & Gym</span>
          </a>
        </div>
      </header>

      {/* Main Cheatsheet Dictionary View */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <CheatsheetView
          onPracticeCategory={handlePracticeCategory}
        />
      </main>

      {/* Category Practice Gym Drawer */}
      <CategoryPracticeDrawer
        isOpen={gymOpen}
        onClose={handleCloseGym}
        category={activeCategory}
        selectedCommand={selectedCommand}
        onSelectCommand={setSelectedCommand}
      />
    </div>
  );
}

export default App;
