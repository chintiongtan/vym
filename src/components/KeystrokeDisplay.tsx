

interface KeystrokeDisplayProps {
  keys: string[];
  className?: string;
}

const KEY_DISPLAY_MAP: Record<string, string> = {
  Escape: 'Esc',
  Backspace: '⌫',
  Enter: '↵',
  ' ': '␣',
};

/**
 * Shows the recent keystrokes the user has pressed.
 */
export function KeystrokeDisplay({ keys, className = '' }: KeystrokeDisplayProps) {
  // Show last 12 keys
  const recentKeys = keys.slice(-12);

  if (recentKeys.length === 0) {
    return (
      <div className={`flex items-center gap-1 min-h-[2rem] ${className}`}>
        <span className="text-gray-600 text-xs italic">Type your Vim commands...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 flex-wrap min-h-[2rem] ${className}`}>
      <span className="text-gray-500 text-xs mr-1">Keys:</span>
      {recentKeys.map((key, i) => (
        <kbd
          key={i}
          className="px-1.5 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs font-mono text-gray-300 min-w-[1.5rem] text-center"
        >
          {KEY_DISPLAY_MAP[key] ?? key}
        </kbd>
      ))}
    </div>
  );
}
