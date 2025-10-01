'use client'

export default function StoreTypeBubble({ 
  storeType, 
  isSelected, 
  onChange 
}) {
  return (
    <label
      className={`relative flex items-center justify-center px-4 py-3 border-2 rounded-full cursor-pointer transition-all hover:shadow-lg ${
        isSelected
          ? 'border-primary-600 bg-primary-600 text-white'
          : 'border-gray-300 hover:border-primary-300 bg-white'
      }`}
    >
      <input
        type="radio"
        name="storeType"
        value={storeType.id}
        checked={isSelected}
        onChange={() => onChange(storeType.id)}
        className="sr-only"
      />
      <span className={`font-medium text-center whitespace-nowrap ${
        isSelected ? 'text-white' : 'text-gray-900'
      }`}>
        {storeType.display_name}
      </span>
    </label>
  )
}


