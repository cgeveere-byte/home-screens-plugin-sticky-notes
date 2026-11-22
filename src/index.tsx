import React, { useEffect, useState } from 'react';

export default function StickyNotes({ config = {}, style = {} }) {
  const {
    pages = [],
    defaultDuration = 8,
    fontSize = 1.1,
    color = '#fef08a',
    textColor = '#1c1917',
  } = config;

  const validPages = (pages || []).filter((p) => p && p.text && String(p.text).trim());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (validPages.length <= 1) return;
    const duration = (validPages[index]?.duration || 0) > 0
      ? validPages[index].duration
      : defaultDuration;
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % validPages.length);
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [index, validPages, defaultDuration]);

  const current = validPages[index] || { text: 'No notes' };
  const bg = current.color && String(current.color).trim() ? current.color : color;
  const fg = current.textColor && String(current.textColor).trim() ? current.textColor : textColor;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: bg,
        color: fg,
        borderRadius: 8,
        padding: '16px 18px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: `${fontSize}em`,
        fontWeight: 500,
        lineHeight: 1.35,
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...style,
      }}
    >
      {current.text}
    </div>
  );
}
