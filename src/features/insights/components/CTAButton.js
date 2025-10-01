import { buttonStyles } from '@/shared/styles/common'

export default function CTAButton({ 
  children, 
  onClick, 
  href, 
  target = '_blank',
  style = {},
  ...props 
}) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.open(href, target)
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        ...buttonStyles.primary,
        ...style
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = buttonStyles.primaryHover.backgroundColor
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = buttonStyles.primary.backgroundColor
      }}
      {...props}
    >
      {children}
    </button>
  )
}



