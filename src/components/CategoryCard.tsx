import type { CheatsheetCategory, CheatsheetCommand } from '../data/cheatsheet';

interface CategoryCardProps {
  category: CheatsheetCategory;
  searchQuery?: string;
  onPracticeCategory: (category: CheatsheetCategory, command?: CheatsheetCommand) => void;
  fullHeight?: boolean;
}

export function CategoryCard({
  category,
  searchQuery = '',
  onPracticeCategory,
  fullHeight = false,
}: CategoryCardProps) {
  const query = searchQuery.toLowerCase().trim();

  // Filter commands if there's a search query
  const filteredCommands = query
    ? category.commands.filter(
        (cmd) =>
          cmd.keys.some((k) => k.toLowerCase().includes(query)) ||
          cmd.description.toLowerCase().includes(query) ||
          category.title.toLowerCase().includes(query),
      )
    : category.commands;

  if (filteredCommands.length === 0) {
    return null;
  }

  return (
    <div
      id={category.id}
      className={`bg-gray-900/90 border border-gray-800 hover:border-gray-700/80 rounded-xl p-3 sm:p-4 shadow-lg flex flex-col justify-between transition-colors overflow-hidden ${
        fullHeight ? 'h-full max-h-full' : 'h-[65vh] sm:h-[520px] max-h-[65vh] sm:max-h-[520px]'
      }`}
    >
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Category Header */}
        <div className="shrink-0 flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
          <button
            onClick={() => onPracticeCategory(category)}
            className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-1.5 hover:text-emerald-400 transition-colors text-left group cursor-pointer min-w-0"
            title={`Practice ${category.title} in Gym`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform shrink-0" />
            <span className="truncate">{category.title}</span>
            <span className="opacity-0 group-hover:opacity-100 text-xs text-emerald-400 transition-opacity shrink-0">⚡</span>
          </button>
          <span className="text-[10px] sm:text-xs text-gray-500 font-mono shrink-0 ml-2">
            {filteredCommands.length} {filteredCommands.length === 1 ? 'cmd' : 'cmds'}
          </span>
        </div>

        {category.description && (
          <p className="shrink-0 text-[11px] sm:text-xs text-gray-400 mb-2 italic line-clamp-1">
            {category.description}
          </p>
        )}

        {/* Commands List - Scrollable within Card */}
        <ul className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-1 sm:space-y-1.5 overscroll-contain">
          {filteredCommands.map((cmd, idx) => (
            <li
              key={idx}
              onClick={() => onPracticeCategory(category, cmd)}
              className="p-1.5 sm:p-2 -mx-1 rounded-lg transition-colors cursor-pointer hover:bg-gray-800/60 active:bg-gray-800 flex flex-col justify-center"
              title="Click to practice this command in the Gym"
            >
              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                {cmd.keys.map((key, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-1.5 py-0.5 bg-gray-950 border border-gray-700/90 rounded text-[10px] sm:text-xs font-mono font-medium text-emerald-400 shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
                {cmd.notes && (
                  <span className="text-[10px] sm:text-[11px] text-gray-500 italic">({cmd.notes})</span>
                )}
              </div>
              <div className="text-gray-300 text-[11px] sm:text-xs leading-relaxed">
                {cmd.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips section if available */}
      {category.tips && category.tips.length > 0 && !query && (
        <div className="shrink-0 mt-2 pt-2 border-t border-gray-800/70 space-y-1">
          {category.tips.map((tip, tIdx) => (
            <div key={tIdx} className="text-[10px] sm:text-[11px] text-amber-300/80 leading-snug flex items-start gap-1.5">
              <span className="shrink-0 text-amber-400">💡</span>
              <span className="line-clamp-2">{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
