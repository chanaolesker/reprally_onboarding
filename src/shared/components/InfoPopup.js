'use client'

export default function InfoPopup({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info',
  position = 'top-center'
}) {
  if (!isOpen) return null

  const getColors = (type) => {
    switch (type) {
      case 'warning':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', title: 'text-yellow-800', message: 'text-yellow-700', close: 'text-yellow-400 hover:text-yellow-600' }
      case 'error':
        return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', title: 'text-red-800', message: 'text-red-700', close: 'text-red-400 hover:text-red-600' }
      case 'success':
        return { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', title: 'text-green-800', message: 'text-green-700', close: 'text-green-400 hover:text-green-600' }
      default:
        return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-800', message: 'text-blue-700', close: 'text-blue-400 hover:text-blue-600' }
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      case 'error':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'success':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-center':
        return 'absolute top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md'
      case 'center':
        return 'fixed inset-0 flex items-center justify-center z-50'
      case 'top-left':
        return 'absolute top-0 left-0 z-50 w-full max-w-md'
      case 'top-right':
        return 'absolute top-0 right-0 z-50 w-full max-w-md'
      default:
        return 'absolute top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md'
    }
  }

  const colors = getColors(type)
  const icon = getIcon(type)
  const positionClasses = getPositionClasses(position)

  return (
    <div className={positionClasses}>
      <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 mx-4 shadow-sm`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className={colors.icon}>
              {icon}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${colors.title}`}>
              {title}
            </h3>
            <p className={`mt-1 text-sm ${colors.message}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className={`${colors.close} focus:outline-none transition-colors`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


