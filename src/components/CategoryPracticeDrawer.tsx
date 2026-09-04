import { useState, useCallback } from 'react';
import type { CheatsheetCategory, CheatsheetCommand } from '../data/cheatsheet';
import { CodeMirrorVimEditor } from './CodeMirrorVimEditor';
import { KeystrokeDisplay } from './KeystrokeDisplay';

interface CategoryPracticeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  category: CheatsheetCategory | null;
  selectedCommand: CheatsheetCommand | null;
  onSelectCommand: (command: CheatsheetCommand) => void;
}

export function CategoryPracticeDrawer(props: CategoryPracticeDrawerProps) {
  if (!props.isOpen || !props.category) return null;
  return <CategoryPracticeContent key={props.category.id} {...props} category={props.category} />;
}

function CategoryPracticeContent({
  onClose,
  category,
  selectedCommand,
  onSelectCommand,
}: CategoryPracticeDrawerProps & { category: CheatsheetCategory }) {
  const [keystrokes, setKeystrokes] = useState<string[]>([]);
  const [resetKey, setResetKey] = useState(0);

  // Default to first command if none selected
  const activeCommand = selectedCommand || category.commands[0] || null;

  const handleKey = useCallback((key: string) => {
    setKeystrokes((prev) => [...prev.slice(-15), key]);
  }, []);

  const handleResetBuffer = () => {
    setKeystrokes([]);
    setResetKey((prev) => prev + 1);
  };

  const currentIndex = category.commands.findIndex(
    (c) => c.keys.join(',') === activeCommand?.keys.join(',') && c.description === activeCommand?.description
  );

  const handleNextCommand = () => {
    if (currentIndex >= 0 && currentIndex < category.commands.length - 1) {
      onSelectCommand(category.commands[currentIndex + 1]);
    }
  };

  const handlePrevCommand = () => {
    if (currentIndex > 0) {
      onSelectCommand(category.commands[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full sm:max-w-2xl lg:max-w-3xl bg-gray-950 border-l border-gray-800 h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="p-3.5 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-emerald-400 text-base sm:text-lg font-bold">⚡</span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide truncate">
                {category.title}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {category.commands.length} cmds
              </span>
            </div>
            {category.description && (
              <p className="text-xs text-gray-400 mt-1 max-w-xl line-clamp-2 sm:line-clamp-none">
                {category.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors shrink-0"
            title="Close Gym (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Selected Command Spotlight */}
        {activeCommand && (
          <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-gray-900/40 border-b border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeCommand.keys.map((key, idx) => (
                  <kbd
                    key={idx}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-950 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-mono font-bold rounded shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-medium leading-snug">
                {activeCommand.description}
                {activeCommand.notes && (
                  <span className="text-xs text-gray-400 italic ml-1.5">({activeCommand.notes})</span>
                )}
              </div>
            </div>

            {/* Next / Previous command buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-gray-800/50">
              <button
                onClick={handlePrevCommand}
                disabled={currentIndex <= 0}
                className="px-2.5 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous command in category"
              >
                ← Prev
              </button>
              <span className="text-[11px] text-gray-500 font-mono px-1">
                {currentIndex + 1}/{category.commands.length}
              </span>
              <button
                onClick={handleNextCommand}
                disabled={currentIndex >= category.commands.length - 1}
                className="px-2.5 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next command in category"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Commands Quick Selector Strip */}
        <div className="px-3.5 sm:px-5 py-2 bg-gray-950 border-b border-gray-800 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-gray-500 shrink-0 text-[11px] font-medium mr-1">Cmds:</span>
          {category.commands.map((cmd, idx) => {
            const isSelected = activeCommand?.keys.join(',') === cmd.keys.join(',') && activeCommand?.description === cmd.description;
            return (
              <button
                key={idx}
                onClick={() => onSelectCommand(cmd)}
                className={`px-2 py-1 rounded text-xs font-mono transition-all shrink-0 border ${isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-xs'
                    : 'bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-gray-200 border-gray-800'
                  }`}
                title={cmd.description}
              >
                {cmd.keys.join(', ')}
              </button>
            );
          })}
        </div>

        {/* Editor Practice Area */}
        <div className="flex-1 p-3.5 sm:p-5 overflow-auto flex flex-col gap-3 min-h-0">
          <div className="flex-1 flex flex-col min-h-[220px] sm:min-h-[280px]">
            <CodeMirrorVimEditor
              key={`${category.id}-${resetKey}`}
              value={category.practiceSnippet}
              onKey={handleKey}
              minHeight="220px"
              className="flex-1"
              autoFocus={true}
            />
          </div>

          {/* Keystrokes Bar & Editor Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-2 border-t border-gray-800/80">
            <div className="flex-1 min-w-0">
              <KeystrokeDisplay keys={keystrokes} />
            </div>

            <button
              onClick={handleResetBuffer}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-xs font-medium border border-gray-700 transition-colors shrink-0 flex items-center justify-center gap-1.5"
              title="Reset buffer to original practice code"
            >
              <span>↺</span>
              <span>Reset Buffer</span>
            </button>
          </div>

          {/* Category Tips / Cheatsheet Hint Footer */}
          {category.tips && category.tips.length > 0 && (
            <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl space-y-1 text-xs">
              <div className="text-amber-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <span>💡</span> Category Pro Tips
              </div>
              {category.tips.map((tip, tIdx) => (
                <p key={tIdx} className="text-gray-400 text-xs leading-relaxed">
                  {tip}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
