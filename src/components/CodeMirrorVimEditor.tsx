import { useEffect, useRef, useCallback } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { vim } from '@replit/codemirror-vim';

export interface CursorPos {
  row: number;
  col: number;
}

export interface CodeMirrorVimEditorProps {
  value: string;
  onChange?: (value: string, cursor: CursorPos) => void;
  onKey?: (key: string) => void;
  className?: string;
  minHeight?: string;
  autoFocus?: boolean;
}

const customTheme = EditorView.theme({
  '&': {
    fontSize: '13.5px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  '.cm-content': {
    caretColor: '#38bdf8',
    fontFamily: "'JetBrains Mono', monospace",
    padding: '8px 0',
  },
  '.cm-panels': {
    backgroundColor: '#090d16 !important',
    borderTop: '1px solid #1e293b',
    color: '#94a3b8',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
  },
  '.cm-vim-panel': {
    padding: '5px 12px',
    fontFamily: "'JetBrains Mono', monospace",
    color: '#34d399',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  '.cm-vim-panel input': {
    backgroundColor: 'transparent !important',
    border: 'none !important',
    outline: 'none !important',
    color: '#f1f5f9 !important',
    fontFamily: "'JetBrains Mono', monospace !important",
    fontSize: '12px !important',
  },
});

export function CodeMirrorVimEditor({
  value,
  onChange,
  onKey,
  className = '',
  minHeight = '140px',
  autoFocus = true,
}: CodeMirrorVimEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onKeyRef = useRef(onKey);
  const initialValueRef = useRef(value);

  useEffect(() => {
    onChangeRef.current = onChange;
    onKeyRef.current = onKey;
  }, [onChange, onKey]);

  const getCursorFromView = useCallback((view: EditorView): CursorPos => {
    const pos = view.state.selection.main.head;
    const line = view.state.doc.lineAt(pos);
    return {
      row: line.number - 1,
      col: pos - line.from,
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc: initialValueRef.current,
      extensions: [
        basicSetup,
        javascript(),
        oneDark,
        customTheme,
        vim({ status: true }),
        EditorView.theme({
          '&': { minHeight },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged || update.selectionSet) {
            const docStr = update.state.doc.toString();
            const cur = getCursorFromView(update.view);
            onChangeRef.current?.(docStr, cur);
          }
        }),
        EditorView.domEventHandlers({
          keydown: (e) => {
            if (e.key && e.key.length === 1) {
              onKeyRef.current?.(e.key);
            } else if (['Escape', 'Enter', 'Backspace'].includes(e.key)) {
              onKeyRef.current?.(e.key);
            }
          },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    if (autoFocus) {
      setTimeout(() => {
        view.focus();
      }, 50);
    }

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [minHeight, autoFocus, getCursorFromView]);

  // Update doc if value changes externally (e.g. switching category or resetting buffer)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
        selection: { anchor: 0 },
      });
      const cur = getCursorFromView(view);
      onChange?.(value, cur);
    }
  }, [value, onChange, getCursorFromView]);

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-800 shadow-xl flex flex-col bg-gray-900 ${className}`}>
      <div ref={containerRef} className="flex-1 overflow-auto" />
    </div>
  );
}
