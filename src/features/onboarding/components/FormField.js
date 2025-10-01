'use client'

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete,
  additionalProps = {}
}) {
  const baseInputClasses = `w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 ${
    error ? 'border-red-500' : 'border-gray-300'
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={baseInputClasses}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        {...additionalProps}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}



