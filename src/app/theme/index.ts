// theme.ts
export const theme = {
  colors: {
    background: '#f9fafb',
    text: '#1f2937',
    primary: '#3b82f6',
    primaryHover: '#272EF5', // Darker shade for hover
    danger: '#ef4444',
    border: '#d1d5db',
    label: '#374151',
    spinnerTrack: '#E5E7EB',
    spinner: '#3B82F6',
    success: '#10B981',
    satisfactory: '#6EE7B7',
    warning: '#F59E0B',
    info: '#6366F1',
  },
  fonts: {
    body: 'var(--font-body), sans-serif',
    mono: '"The Sans Plain", monospace',
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  radii: {
    sm: '4px',
    md: '6px',
    lg: '12px',
  },
  fontSizes: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
