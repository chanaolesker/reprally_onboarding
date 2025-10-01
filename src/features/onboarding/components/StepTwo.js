'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/shared/lib/supabase'
import StoreTypeBubble from '@/shared/components/StoreTypeBubble'
import FormButton from '@/features/onboarding/components/FormButton'
import StepTitle from '@/shared/components/StepTitle'

export default function StepTwo({ formData, setFormData, onBack, onSubmit, isLoading }) {
  const [storeTypes, setStoreTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStoreTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('store_types')
          .select('*')
          .order('id')

        if (error) {
          const fallbackStoreTypes = [
            { id: 1, name: 'convenience', display_name: 'Convenience Store' },
            { id: 2, name: 'foodservice', display_name: 'Food Service' },
            { id: 3, name: 'gas', display_name: 'Gas Station' },
            { id: 4, name: 'grocery', display_name: 'Grocery Store' },
            { id: 5, name: 'gym', display_name: 'Gym' },
            { id: 6, name: 'liquor', display_name: 'Liquor Store' },
            { id: 7, name: 'tobacco_smoke', display_name: 'Tobacco & Smoke Shop' },
            { id: 8, name: 'other', display_name: 'Other' }
          ].sort((a, b) => a.id - b.id)
          setStoreTypes(fallbackStoreTypes)
          setError('')
        } else {
          setStoreTypes(data || [])
        }
      } catch (err) {
        const fallbackStoreTypes = [
          { id: 1, name: 'convenience', display_name: 'Convenience Store' },
          { id: 2, name: 'foodservice', display_name: 'Food Service' },
          { id: 3, name: 'gas', display_name: 'Gas Station' },
          { id: 4, name: 'grocery', display_name: 'Grocery Store' },
          { id: 5, name: 'gym', display_name: 'Gym' },
          { id: 6, name: 'liquor', display_name: 'Liquor Store' },
          { id: 7, name: 'tobacco_smoke', display_name: 'Tobacco & Smoke Shop' },
          { id: 8, name: 'other', display_name: 'Other' }
        ].sort((a, b) => a.id - b.id)
        setStoreTypes(fallbackStoreTypes)
        setError('')
      } finally {
        setLoading(false)
      }
    }

    fetchStoreTypes()
  }, [])

  const handleStoreTypeChange = (storeTypeId) => {
    const selectedStoreType = storeTypes.find(type => type.id === storeTypeId)
    setFormData(prev => ({ 
      ...prev, 
      storeType: storeTypeId,
      storeTypeName: selectedStoreType?.display_name || 'Unknown'
    }))
  }

  const handleSubmit = () => {
    if (!formData.storeType) {
      setError('Please select a store type')
      return
    }
    onSubmit()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading store types...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <StepTitle>What best describes your store?</StepTitle>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {storeTypes.map((storeType) => (
          <StoreTypeBubble
            key={storeType.id}
            storeType={storeType}
            isSelected={formData.storeType === storeType.id}
            onChange={handleStoreTypeChange}
          />
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <FormButton 
          type="secondary" 
          onClick={onBack} 
          disabled={isLoading}
        >
          Back
        </FormButton>
        <FormButton 
          onClick={handleSubmit} 
          disabled={isLoading || !formData.storeType}
          isLoading={isLoading}
        >
          View your competitors!
        </FormButton>
      </div>
    </div>
  )
}



