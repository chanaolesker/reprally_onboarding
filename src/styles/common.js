// Common styles for consistent UI across the application

export const colors = {
  primary: {
    50: '#f0f9f7',
    100: '#dcf2ed',
    200: '#bce5db',
    300: '#8dd1c2',
    400: '#57b5a4',
    500: '#3ca08b',
    600: '#2d8172',
    700: '#25685c',
    800: '#014c40',
    900: '#014c40',
    950: '#002f28'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },
  podium: {
    gold: '#fbbf24',
    silver: '#d1d5db',
    bronze: '#fb923c'
  }
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px'
}

export const typography = {
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px'
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
}

export const layout = {
  container: {
    maxWidth: '672px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    padding: '24px'
  }
}

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary[800],
    color: 'white',
    padding: '8px 24px',
    borderRadius: '6px',
    border: 'none',
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'inline-block'
  },
  primaryHover: {
    backgroundColor: '#01332a'
  }
}

export const headerStyles = {
  container: {
    textAlign: 'center',
    marginBottom: spacing.xl
  },
  logo: {
    height: '64px',
    margin: '0 auto',
    display: 'block',
    marginBottom: spacing.lg
  },
  title: {
    fontSize: typography.sizes.xl,
    color: colors.gray[700],
    fontWeight: typography.weights.medium
  }
}
