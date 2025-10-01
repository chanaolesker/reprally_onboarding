'use client'

export default function FormButton({ 
  type = 'primary',
  onClick, 
  disabled = false, 
  isLoading = false,
  children,
  className = ''
}) {
  const baseClasses = 'px-8 py-3 rounded-lg font-medium text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  
  const typeClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600',
    secondary: 'px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-primary-600'
  }

  const combinedClasses = `${baseClasses} ${typeClasses[type]} ${className}`

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Submitting...
        </div>
      ) : (
        children
      )}
    </button>
  )
}



