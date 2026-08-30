import React from 'react';

export const GlassPanel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: string;
}> = ({ children, style, accent = '#FF5A36' }) => {
  return (
    <div
      style={{
        background: 'rgba(20, 20, 24, 0.55)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${accent}55`,
        borderRadius: 14,
        padding: '14px 22px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${accent}22`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
