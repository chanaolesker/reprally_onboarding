import { headerStyles } from '@/shared/styles/common'

export default function PageHeader({ title, subtitle }) {
  return (
    <div style={headerStyles.container}>
      <div style={{ marginBottom: '24px' }}>
        <img 
          src="/logo.webp" 
          alt="RepRally Logo" 
          style={headerStyles.logo}
        />
      </div>
      {title && (
        <p style={headerStyles.title}>
          {title}
        </p>
      )}
      {subtitle && (
        <p style={{ ...headerStyles.title, fontSize: '16px', marginTop: '8px' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}



