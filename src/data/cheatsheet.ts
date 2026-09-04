export interface CheatsheetCommand {
  keys: string[];
  description: string;
  category: string;
  notes?: string;
  tip?: string;
}

export interface CheatsheetCategory {
  id: string;
  title: string;
  description?: string;
  practiceSnippet: string;
  commands: CheatsheetCommand[];
  tips?: string[];
}

export const CHEATSHEET_CATEGORIES: CheatsheetCategory[] = [
  {
    id: 'cursor-movement',
    title: 'Cursor Movement',
    description: 'Fundamental navigation motions to traverse characters, words, lines, and blocks effortlessly.',
    practiceSnippet: `// --- Cursor Movement Practice ---
// Try: w, b, e (words) | 0, ^, $ (line bounds) | gg, G (file bounds)
// Try: f=, t), ; (find & till) | {, } (code blocks) | % (match parens)

function processTransaction(userId, amount, currency = "USD") {
  const account = getAccount(userId);
  if (!account || !account.isActive) {
    throw new Error("Invalid account status");
  }

  const feeRate = calculateFee(account.tier, amount);
  const total = amount + (amount * feeRate);

  // Validate balance before proceeding
  if (account.balance < total) {
    return { success: false, reason: "INSUFFICIENT_FUNDS" };
  }

  account.balance -= total;
  recordAuditLog("DEBIT", userId, total, currency);
  return { success: true, transactionId: generateUUID(), balance: account.balance };
}

function calculateFee(tier, amount) {
  if (tier === "VIP") return 0.01;
  if (tier === "PREMIUM") return 0.02;
  return 0.035;
}`,
    commands: [
      { keys: ['h'], description: 'Move cursor left', category: 'Cursor Movement' },
      { keys: ['j'], description: 'Move cursor down', category: 'Cursor Movement' },
      { keys: ['k'], description: 'Move cursor up', category: 'Cursor Movement' },
      { keys: ['l'], description: 'Move cursor right', category: 'Cursor Movement' },
      { keys: ['gj'], description: 'Move cursor down (wrapped multi-line text)', category: 'Cursor Movement' },
      { keys: ['gk'], description: 'Move cursor up (wrapped multi-line text)', category: 'Cursor Movement' },
      { keys: ['H'], description: 'Move to top of screen (High)', category: 'Cursor Movement' },
      { keys: ['M'], description: 'Move to middle of screen (Middle)', category: 'Cursor Movement' },
      { keys: ['L'], description: 'Move to bottom of screen (Low)', category: 'Cursor Movement' },
      { keys: ['w'], description: 'Jump forwards to start of next word', category: 'Cursor Movement' },
      { keys: ['W'], description: 'Jump forwards to start of word (words include punctuation)', category: 'Cursor Movement' },
      { keys: ['e'], description: 'Jump forwards to end of current/next word', category: 'Cursor Movement' },
      { keys: ['E'], description: 'Jump forwards to end of word (including punctuation)', category: 'Cursor Movement' },
      { keys: ['b'], description: 'Jump backwards to start of word', category: 'Cursor Movement' },
      { keys: ['B'], description: 'Jump backwards to start of word (including punctuation)', category: 'Cursor Movement' },
      { keys: ['ge'], description: 'Jump backwards to end of previous word', category: 'Cursor Movement' },
      { keys: ['%'], description: 'Move cursor to matching pair: (), {}, []', category: 'Cursor Movement' },
      { keys: ['0'], description: 'Jump to the start of the line', category: 'Cursor Movement' },
      { keys: ['^'], description: 'Jump to first non-blank character of line', category: 'Cursor Movement' },
      { keys: ['$'], description: 'Jump to the end of the line', category: 'Cursor Movement' },
      { keys: ['g_'], description: 'Jump to last non-blank character of line', category: 'Cursor Movement' },
      { keys: ['gg'], description: 'Go to the first line of the document', category: 'Cursor Movement' },
      { keys: ['G'], description: 'Go to the last line of the document', category: 'Cursor Movement' },
      { keys: ['{n}G', '{n}gg'], description: 'Go to line {n} (e.g. 15G)', category: 'Cursor Movement' },
      { keys: ['fx'], description: 'Jump forward to next occurrence of character x', category: 'Cursor Movement' },
      { keys: ['tx'], description: 'Jump forward to before character x', category: 'Cursor Movement' },
      { keys: ['Fx'], description: 'Jump backward to occurrence of character x', category: 'Cursor Movement' },
      { keys: ['Tx'], description: 'Jump backward to after character x', category: 'Cursor Movement' },
      { keys: [';'], description: 'Repeat previous f, t, F, or T movement', category: 'Cursor Movement' },
      { keys: [','], description: 'Repeat previous f, t, F, or T movement backwards', category: 'Cursor Movement' },
      { keys: ['}'], description: 'Jump to next paragraph / code block', category: 'Cursor Movement' },
      { keys: ['{'], description: 'Jump to previous paragraph / code block', category: 'Cursor Movement' },
      { keys: ['zz'], description: 'Center current line on screen', category: 'Cursor Movement' },
      { keys: ['zt'], description: 'Scroll line to top of screen', category: 'Cursor Movement' },
      { keys: ['zb'], description: 'Scroll line to bottom of screen', category: 'Cursor Movement' },
      { keys: ['Ctrl+d'], description: 'Scroll down half a page', category: 'Cursor Movement' },
      { keys: ['Ctrl+u'], description: 'Scroll up half a page', category: 'Cursor Movement' },
      { keys: ['Ctrl+f'], description: 'Scroll forward a full page', category: 'Cursor Movement' },
      { keys: ['Ctrl+b'], description: 'Scroll backward a full page', category: 'Cursor Movement' },
      { keys: ['Ctrl+e'], description: 'Scroll window down one line without moving cursor', category: 'Cursor Movement' },
      { keys: ['Ctrl+y'], description: 'Scroll window up one line without moving cursor', category: 'Cursor Movement' },
    ],
    tips: [
      'Prefix any motion with a number to repeat it: 5j moves down 5 lines, 3w advances 3 words.',
      'Combine motions with operators: d4w deletes 4 words, y$ yanks to end of line.',
    ],
  },
  {
    id: 'editing',
    title: 'Editing & Operators',
    description: 'Surgical text replacement, line joins, casing changes, and the ubiquitous dot repeat.',
    practiceSnippet: `// --- Editing & Operators Practice ---
// Try: r (replace char), s (substitute), cw / ciw (change word)
// Try: C or c$ (change to EOL), J (join lines), u (undo), . (dot repeat)

function parseUserData() {
  var oldName = "Johnathan";
  var oldRole = "Developer";
  var oldCity = "San Francisco";

  // Practice 'J' on these broken lines below:
  const query = "SELECT * FROM users "
    + "WHERE active = true "
    + "ORDER BY created_at DESC";

  // Practice 'xp' to fix this typo: 'teh' -> 'the'
  console.log("Welcome to teh dashboard");

  // Practice '.' repeat: change 'var' to 'const' with 'ciwconst<Esc>'
  // then move down and press '.' on the other 'var's
  var token = "abc-123";
  var maxRetries = 3;
}`,
    commands: [
      { keys: ['r{c}'], description: 'Replace single character under cursor with {c}', category: 'Editing' },
      { keys: ['R'], description: 'Enter Replace mode until Esc is pressed', category: 'Editing' },
      { keys: ['J'], description: 'Join line below to current line with a space', category: 'Editing' },
      { keys: ['gJ'], description: 'Join line below without inserting space', category: 'Editing' },
      { keys: ['cc'], description: 'Change (replace) entire line', category: 'Editing' },
      { keys: ['C', 'c$'], description: 'Change (replace) to end of line', category: 'Editing' },
      { keys: ['ciw'], description: 'Change inside word', category: 'Editing' },
      { keys: ['caw'], description: 'Change a word (including trailing space)', category: 'Editing' },
      { keys: ['ci"'], description: 'Change inside double quotes', category: 'Editing' },
      { keys: ['ci('], description: 'Change inside parentheses', category: 'Editing' },
      { keys: ['ci{'], description: 'Change inside curly braces', category: 'Editing' },
      { keys: ['s'], description: 'Delete character and enter insert mode (substitute)', category: 'Editing' },
      { keys: ['S'], description: 'Delete line and enter insert mode (same as cc)', category: 'Editing' },
      { keys: ['xp'], description: 'Transpose two letters (delete and paste after)', category: 'Editing' },
      { keys: ['u'], description: 'Undo last change', category: 'Editing' },
      { keys: ['Ctrl+r'], description: 'Redo last undone change', category: 'Editing' },
      { keys: ['.'], description: 'Repeat last editing command (The Dot Repeat)', category: 'Editing' },
      { keys: ['g~'], description: 'Switch case up to motion', category: 'Editing' },
      { keys: ['gu'], description: 'Change to lowercase up to motion', category: 'Editing' },
      { keys: ['gU'], description: 'Change to uppercase up to motion (e.g. gUiw to uppercase word)', category: 'Editing' },
    ],
    tips: [
      'The dot repeat (.) is one of Vim’s greatest power tools: perform an edit with ciw or daw, navigate, and press . to replay it.',
    ],
  },
  {
    id: 'cut-and-paste',
    title: 'Cut and Paste (Yank & Put)',
    description: 'Yanking, deleting, and putting lines, words, and blocks without touching the mouse.',
    practiceSnippet: `// --- Cut and Paste Practice ---
// Try: dd (delete line), yy (yank line), p / P (put after/before)
// Try: ddp (swap line down), ddkP (swap line up), yiw / diw (yank/delete word)

function buildUserProfile() {
  // Step 3 is currently first! Use 'ddp' or 'dd' & 'p' to reorder:
  console.log("Step 3: Render dashboard");
  console.log("Step 1: Authenticate user");
  console.log("Step 2: Fetch profile data");

  // Move this return statement to the end of the function using 'ddkP' or 'dd' & 'p':
  return { status: "complete" };

  const finalSettings = applyTheme("dark");
  validateSessionToken();
}`,
    commands: [
      { keys: ['yy', 'Y'], description: 'Yank (copy) current line', category: 'Cut and Paste' },
      { keys: ['2yy'], description: 'Yank (copy) 2 lines', category: 'Cut and Paste' },
      { keys: ['yw'], description: 'Yank characters from cursor to start of next word', category: 'Cut and Paste' },
      { keys: ['yiw'], description: 'Yank word under cursor', category: 'Cut and Paste' },
      { keys: ['y$'], description: 'Yank to end of line', category: 'Cut and Paste' },
      { keys: ['p'], description: 'Put (paste) clipboard content after cursor / below line', category: 'Cut and Paste' },
      { keys: ['P'], description: 'Put (paste) before cursor / above line', category: 'Cut and Paste' },
      { keys: ['gp'], description: 'Paste after cursor and place cursor at end of pasted text', category: 'Cut and Paste' },
      { keys: ['gP'], description: 'Paste before cursor and place cursor at end of pasted text', category: 'Cut and Paste' },
      { keys: ['dd'], description: 'Delete (cut) current line', category: 'Cut and Paste' },
      { keys: ['2dd'], description: 'Delete (cut) 2 lines', category: 'Cut and Paste' },
      { keys: ['dw'], description: 'Delete word from cursor to start of next word', category: 'Cut and Paste' },
      { keys: ['diw'], description: 'Delete inside word', category: 'Cut and Paste' },
      { keys: ['daw'], description: 'Delete around word (including space)', category: 'Cut and Paste' },
      { keys: ['di"'], description: 'Delete inside double quotes', category: 'Cut and Paste' },
      { keys: ['da"'], description: 'Delete around double quotes (removes quotes too)', category: 'Cut and Paste' },
      { keys: ['di{'], description: 'Delete inside curly braces', category: 'Cut and Paste' },
      { keys: ['D', 'd$'], description: 'Delete (cut) to end of line', category: 'Cut and Paste' },
      { keys: ['x'], description: 'Delete character under cursor', category: 'Cut and Paste' },
      { keys: ['ddp'], description: 'Swap current line with the line below (move line down)', category: 'Cut and Paste' },
      { keys: ['ddkP'], description: 'Swap current line with the line above (move line up)', category: 'Cut and Paste' },
    ],
    tips: [
      'Move lines effortlessly without visual mode or clipboard gymnastics: ddp moves a line down, ddkP moves it up.',
    ],
  },
  {
    id: 'text-objects',
    title: 'Text Objects',
    description: 'Target inner or outer words, quotes, brackets, and tags when combined with operators (d, c, y, v).',
    practiceSnippet: `// --- Text Objects Practice ---
// Try: ciw (change inside word), diw / daw (delete word)
// Try: ci" or di" (inside quotes), da" (around quotes)
// Try: ci( or di( (inside parens), di{ or da{ (curly braces)

function configureServer(host, port, debugMode) {
  const message = "Connecting to remote database instance...";
  const config = {
    apiKey: "sk-live-9876543210-secret",
    timeoutMs: 5000,
    retryPolicy: {
      attempts: 3,
      backoff: "exponential"
    }
  };

  function logger(level, msg, metadata) {
    if (debugMode) {
      console.log(\`[\${level}] \${msg}: \${JSON.stringify(metadata)}\`);
    }
  }

  return logger("INFO", message, config);
}`,
    commands: [
      { keys: ['iw'], description: 'Inner word (does not include surrounding spaces)', category: 'Text Objects' },
      { keys: ['aw'], description: 'A word (includes trailing/leading whitespace)', category: 'Text Objects' },
      { keys: ['i"', "i'", 'i`'], description: 'Inside quotes (between quotes, excludes delimiters)', category: 'Text Objects' },
      { keys: ['a"', "a'", 'a`'], description: 'Around quotes (includes the quote marks)', category: 'Text Objects' },
      { keys: ['i(', 'i)', 'ib'], description: 'Inside parentheses / parameters', category: 'Text Objects' },
      { keys: ['a(', 'a)', 'ab'], description: 'Around parentheses (includes parens)', category: 'Text Objects' },
      { keys: ['i{', 'i}', 'iB'], description: 'Inside curly braces (function/object body)', category: 'Text Objects' },
      { keys: ['a{', 'a}', 'aB'], description: 'Around curly braces (includes braces)', category: 'Text Objects' },
      { keys: ['i[', 'i]'], description: 'Inside square brackets (arrays)', category: 'Text Objects' },
      { keys: ['a[', 'a]'], description: 'Around square brackets', category: 'Text Objects' },
      { keys: ['it'], description: 'Inside XML/HTML tag (<tag>content</tag>)', category: 'Text Objects' },
      { keys: ['at'], description: 'Around XML/HTML tag (including tags)', category: 'Text Objects' },
      { keys: ['ip'], description: 'Inner paragraph', category: 'Text Objects' },
      { keys: ['ap'], description: 'A paragraph (includes blank line)', category: 'Text Objects' },
    ],
    tips: [
      'Pattern: [Operator] + [i/a] + [Delimiter]. E.g. diw = Delete Inside Word, ca" = Change Around Quotes, yip = Yank Inside Paragraph.',
    ],
  },
  {
    id: 'visual-mode',
    title: 'Visual Mode & Marking',
    description: 'Select text character-by-character, line-by-line, or in vertical rectangular columns.',
    practiceSnippet: `// --- Visual Mode Practice ---
// Try: v (character-wise), V (line-wise), Ctrl+v (visual block / column)
// In Visual Line (V): press j to select lines, then d (delete) or y (yank) or > (indent)
// In Visual Block (Ctrl+v): select down with j, press I, type "const ", press Esc

id = 101;
name = "Alpha";
status = "active";
priority = 5;

// Block to comment out or indent:
function calculateTax(subtotal) {
  const rate = 0.0825;
  const delivery = 5.00;
  return (subtotal * (1 + rate)) + delivery;
}`,
    commands: [
      { keys: ['v'], description: 'Start character-wise visual mode', category: 'Visual Mode' },
      { keys: ['V'], description: 'Start linewise visual mode', category: 'Visual Mode' },
      { keys: ['Ctrl+v'], description: 'Start visual block mode (column selection)', category: 'Visual Mode' },
      { keys: ['o'], description: 'Move to other end of visual selection area', category: 'Visual Mode' },
      { keys: ['O'], description: 'Move to other corner of visual block', category: 'Visual Mode' },
      { keys: ['d', 'x'], description: 'Delete selected text / lines', category: 'Visual Mode' },
      { keys: ['y'], description: 'Yank (copy) selected text / lines', category: 'Visual Mode' },
      { keys: ['c'], description: 'Change selected text (delete and enter insert mode)', category: 'Visual Mode' },
      { keys: ['>'], description: 'Indent selected lines right', category: 'Visual Mode' },
      { keys: ['<'], description: 'Outdent selected lines left', category: 'Visual Mode' },
      { keys: ['~'], description: 'Toggle case of characters in selection', category: 'Visual Mode' },
      { keys: ['u'], description: 'Make entire selection lowercase', category: 'Visual Mode' },
      { keys: ['U'], description: 'Make entire selection uppercase', category: 'Visual Mode' },
      { keys: ['I'], description: 'In visual block mode: insert text before column across all selected lines', category: 'Visual Mode' },
      { keys: ['A'], description: 'In visual block mode: append text after column across all selected lines', category: 'Visual Mode' },
      { keys: ['Esc'], description: 'Exit visual mode back to normal mode', category: 'Visual Mode' },
    ],
    tips: [
      'Multi-cursor in Vim: Press Ctrl+v, select multiple lines downwards with j, press I, type your text, and hit Esc — the text appears on every line!',
    ],
  },
  {
    id: 'indentation',
    title: 'Indent & Alignment',
    description: 'Format, indent, and realign single lines, blocks, or the entire document.',
    practiceSnippet: `// --- Indentation Practice ---
// Try: >> (indent line), << (outdent line)
// Try: V (visual line) + > / < (indent/outdent block)
// Try: gg=G (re-indent entire file) or =% (auto-indent block on brace)

function computeAnalytics(items) {
// This block is misaligned:
const valid = items.filter(x => x.score > 0);
    const total = valid.reduce((acc, curr) => acc + curr.score, 0);
        const average = valid.length > 0 ? total / valid.length : 0;

if (average >= 90) {
return "Grade A";
} else if (average >= 80) {
return "Grade B";
} else {
return "Grade C";
}
}`,
    commands: [
      { keys: ['>>'], description: 'Indent current line right one shiftwidth', category: 'Indent & Alignment' },
      { keys: ['<<'], description: 'De-indent current line left one shiftwidth', category: 'Indent & Alignment' },
      { keys: ['>%'], description: 'Indent block with () or {} (cursor placed on brace)', category: 'Indent & Alignment' },
      { keys: ['<%'], description: 'De-indent block with () or {} (cursor on brace)', category: 'Indent & Alignment' },
      { keys: ['=='], description: 'Auto-indent current line based on syntax', category: 'Indent & Alignment' },
      { keys: ['=%'], description: 'Auto-indent entire block between matching () or {}', category: 'Indent & Alignment' },
      { keys: ['gg=G'], description: 'Re-indent entire file according to syntax rules', category: 'Indent & Alignment' },
      { keys: ['3=='], description: 'Auto-indent 3 lines from cursor', category: 'Indent & Alignment' },
      { keys: ['>ib'], description: 'Indent inner block with parentheses', category: 'Indent & Alignment' },
    ],
    tips: [
      'Quick auto-format: gg=G reformats the entire file’s indentation according to indentation rules.',
    ],
  },
  {
    id: 'search-replace',
    title: 'Search & Replace',
    description: 'Find text patterns, repeat searches forward and backward, and execute substitutions.',
    practiceSnippet: `// --- Search & Replace Practice ---
// Try: /query + Enter, then n (next) and N (previous)
// Try: * on any word under cursor to search for all occurrences
// Try: :%s/oldText/newText/g to replace across the buffer
// Try: :s/debug/info/g on a single line

function executeBatchOperations() {
  const logger = createLogger("debug");
  logger.log("Batch start: processing item 1");
  logger.log("Batch update: item 1 completed");
  logger.log("Batch start: processing item 2");
  logger.log("Batch update: item 2 completed");
  logger.log("Batch finish: all items processed");

  const debugFlag = true;
  if (debugFlag) {
    logger.log("Detailed debug metrics collected");
  }
}`,
    commands: [
      { keys: ['/pattern'], description: 'Search forward for pattern', category: 'Search & Replace' },
      { keys: ['?pattern'], description: 'Search backward for pattern', category: 'Search & Replace' },
      { keys: ['n'], description: 'Repeat search in same direction (next match)', category: 'Search & Replace' },
      { keys: ['N'], description: 'Repeat search in opposite direction (prev match)', category: 'Search & Replace' },
      { keys: ['*'], description: 'Search forward for the exact word under cursor', category: 'Search & Replace' },
      { keys: ['#'], description: 'Search backward for the exact word under cursor', category: 'Search & Replace' },
      { keys: [':%s/old/new/g'], description: 'Replace all occurrences of "old" with "new" in whole file', category: 'Search & Replace' },
      { keys: [':%s/old/new/gc'], description: 'Replace with confirmation prompt for each occurrence', category: 'Search & Replace' },
      { keys: [':s/old/new/g'], description: 'Replace all occurrences of "old" with "new" on current line only', category: 'Search & Replace' },
      { keys: [':noh'], description: 'Clear active search highlighting', category: 'Search & Replace' },
    ],
    tips: [
      'In search and replace confirmation (:s/.../gc), press y to replace, n to skip, a for all, q to quit.',
    ],
  },
  {
    id: 'registers',
    title: 'Registers & Clipboard',
    description: 'Store and retrieve text in named, numeric, system, and black-hole registers.',
    practiceSnippet: `// --- Registers Practice ---
// Try: "ayiw (yank word into register 'a')
// Try: "byy (yank line into register 'b')
// Try: "ap and "bp to paste from specific registers
// Try: :reg to view contents of all registers
// Try: "_dd to delete line into black hole register (preserves clipboard)

const headerTitle = "Welcome to Vym";
const defaultTheme = "dark-mode";
const sessionTimeout = 3600;

function renderSettings() {
  // Destination line 1:
  const slotA = "";
  // Destination line 2:
  const slotB = "";
}`,
    commands: [
      { keys: [':reg'], description: 'Show contents of all registers', category: 'Registers & Clipboard' },
      { keys: ['"ay'], description: 'Yank into named register "a"', category: 'Registers & Clipboard' },
      { keys: ['"ap'], description: 'Paste contents of named register "a"', category: 'Registers & Clipboard' },
      { keys: ['"+y'], description: 'Yank into OS system clipboard', category: 'Registers & Clipboard' },
      { keys: ['"+p'], description: 'Paste from OS system clipboard', category: 'Registers & Clipboard' },
      { keys: ['"0p'], description: 'Paste last yanked text (unaffected by deletions)', category: 'Registers & Clipboard' },
      { keys: ['"_dd'], description: "Delete line into the black hole register (doesn't overwrite clipboard)", category: 'Registers & Clipboard' },
    ],
    tips: [
      'Register 0 ("0p) is a lifesaver: it always holds the last yanked text, even if you subsequently delete text with x or dd!',
    ],
  },
  {
    id: 'macros',
    title: 'Macros (Record & Playback)',
    description: 'Automate repetitive workflows by recording keystrokes into a register and playing them back.',
    practiceSnippet: `// --- Macros Practice (Record & Playback) ---
// Try recording a macro:
// 1. Move cursor to start of line 1 (qa starts recording to register 'a')
// 2. Press ^ (or 0), type I, enter 'export ', hit Esc, press j (move down)
// 3. Press q to stop recording.
// 4. Press @a to replay once, or 3@a to replay on the remaining lines!

const API_ENDPOINT = "https://api.vym.dev/v1";
const TIMEOUT_SECONDS = 30;
const MAX_CONCURRENT_REQUESTS = 10;
const CACHE_TTL_MS = 60000;
const RETRY_DELAY_MS = 500;`,
    commands: [
      { keys: ['qa'], description: 'Record macro into register "a"', category: 'Macros' },
      { keys: ['q'], description: 'Stop recording macro', category: 'Macros' },
      { keys: ['@a'], description: 'Play back macro "a"', category: 'Macros' },
      { keys: ['@@'], description: 'Re-run last executed macro', category: 'Macros' },
      { keys: ['10@a'], description: 'Run macro "a" 10 times consecutively', category: 'Macros' },
    ],
    tips: [
      'Make macros reproducible: start your macro by moving to a reliable landmark (e.g. 0 to line start, or ^ to first non-blank char) and end with j so repeating with @@ steps down line by line.',
    ],
  },
  {
    id: 'marks-jumps',
    title: 'Marks & Jump List',
    description: 'Bookmark locations in files and jump across your edit and navigation history.',
    practiceSnippet: `// --- Marks & Jump List Practice ---
// Try: ma (set mark 'a' here)
// Move around: gg (top), G (bottom), /search
// Jump back: \`a (exact mark position) or 'a (start of mark line)
// Jump history: Ctrl+o (go older), Ctrl+i (go newer)

function topOfFile() {
  console.log("First section - mark here with 'ma'");
}

// ... intermediate section ...
function middleSection() {
  const intermediateValue = 42;
  return intermediateValue * 2;
}

// ... bottom section ...
function bottomOfFile() {
  console.log("Last section - jump back to mark 'a' with \`a");
}`,
    commands: [
      { keys: ['ma'], description: 'Set mark "a" at current cursor position', category: 'Marks & Jump List' },
      { keys: ['`a'], description: 'Jump to exact cursor position of mark "a"', category: 'Marks & Jump List' },
      { keys: ["'a"], description: 'Jump to beginning (first non-blank) of line with mark "a"', category: 'Marks & Jump List' },
      { keys: ['``'], description: 'Jump back to position before last jump', category: 'Marks & Jump List' },
      { keys: ['`.'], description: 'Jump to position of last edit in current file', category: 'Marks & Jump List' },
      { keys: ['Ctrl+o'], description: 'Go to older position in jump list', category: 'Marks & Jump List' },
      { keys: ['Ctrl+i'], description: 'Go to newer position in jump list', category: 'Marks & Jump List' },
      { keys: [':jumps'], description: 'Display list of jump history', category: 'Marks & Jump List' },
      { keys: [':marks'], description: 'Display list of active marks', category: 'Marks & Jump List' },
    ],
    tips: [
      'Use Ctrl+o like the browser "Back" button: jump around code with search or marks, then press Ctrl+o to retrace your path.',
    ],
  },
  {
    id: 'windows-tabs',
    title: 'Windows & Tabs',
    description: 'Manage viewport splits and tabbed layouts right inside Vim.',
    practiceSnippet: `// --- Windows & Tabs Practice ---
// Try Ex commands:
// :sp (horizontal split)
// :vsp (vertical split)
// Ctrl+w w (cycle window focus)
// Ctrl+w c or :close (close current split)
// :tabnew (open new tab)
// gt / gT (next / prev tab)

function splitWindowDemo() {
  const description = "CodeMirror Vim supports split navigation and tab commands!";
  console.log(description);
  return true;
}`,
    commands: [
      { keys: [':sp', ':split'], description: 'Split window horizontally', category: 'Windows & Tabs' },
      { keys: [':vsp', ':vsplit'], description: 'Split window vertically', category: 'Windows & Tabs' },
      { keys: ['Ctrl+w w'], description: 'Cycle focus between open split windows', category: 'Windows & Tabs' },
      { keys: ['Ctrl+w h/j/k/l'], description: 'Move focus to window left/down/up/right', category: 'Windows & Tabs' },
      { keys: ['Ctrl+w c', ':close'], description: 'Close current window pane', category: 'Windows & Tabs' },
      { keys: ['Ctrl+w ='], description: 'Make all split windows equal height and width', category: 'Windows & Tabs' },
      { keys: [':tabnew'], description: 'Open a new tab page', category: 'Windows & Tabs' },
      { keys: ['gt', ':tabn'], description: 'Go to next tab page', category: 'Windows & Tabs' },
      { keys: ['gT', ':tabp'], description: 'Go to previous tab page', category: 'Windows & Tabs' },
      { keys: [':tabclose'], description: 'Close current tab', category: 'Windows & Tabs' },
    ],
  },
  {
    id: 'global-ex',
    title: 'Global & Exiting',
    description: 'File saving, discarding changes, quitting, and built-in help commands.',
    practiceSnippet: `// --- Ex Commands Practice ---
// Try:
// :w (simulate save)
// :noh (clear search highlighting)
// :%s/foo/bar/g (global substitute)
// :g/console/d (delete all lines matching 'console')

function debugWorker() {
  console.log("DEBUG: Starting task 1");
  const result1 = doWork(1);
  console.log("DEBUG: Task 1 finished");

  console.log("DEBUG: Starting task 2");
  const result2 = doWork(2);
  console.log("DEBUG: Task 2 finished");

  return [result1, result2];
}`,
    commands: [
      { keys: [':w'], description: 'Write (save) the file', category: 'Global & Exiting' },
      { keys: [':q'], description: 'Quit Vim (fails if unsaved changes exist)', category: 'Global & Exiting' },
      { keys: [':q!'], description: 'Quit Vim discarding all unsaved changes', category: 'Global & Exiting' },
      { keys: [':wq', ':x', 'ZZ'], description: 'Write (save) and exit', category: 'Global & Exiting' },
      { keys: [':qa'], description: 'Quit all open windows/buffers', category: 'Global & Exiting' },
      { keys: [':h {topic}'], description: 'Open Vim manual/help for {topic} (e.g. :h motion.txt)', category: 'Global & Exiting' },
    ],
  },
];
