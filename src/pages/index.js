'use client'

import { useState } from 'react'
import StepOne from '@/features/onboarding/components/StepOne'
import StepTwo from '@/features/onboarding/components/StepTwo'
import PageHeader from '@/features/insights/components/PageHeader'
import { useFormDataSimple } from '@/features/onboarding/hooks/useFormDataSimple'
import { layout } from '@/shared/styles/common'

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const { 
    formData, 
    setFormData,
    updateFormData, 
    saveToSession, 
    isLoading, 
    setIsLoading, 
    errors, 
    setErrors 
  } = useFormDataSimple({
    storeName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    addressComponents: null,
    storeType: '',
    storeTypeName: ''
  })

  const handleNext = () => setCurrentStep(2)
  const handleBack = () => setCurrentStep(1)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const storeTypeName = formData.storeTypeName || 'Unknown'
      const dataToStore = { ...formData, storeTypeName }
      saveToSession(dataToStore)
      await new Promise(resolve => setTimeout(resolve, 1000))
      window.location.href = '/insights'
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={layout.container}>
        <PageHeader title="Welcome! Let's help your store stay competitive" />
        <div style={layout.card}>
          {currentStep === 1 ? (
            <StepOne
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              errors={errors}
              setErrors={setErrors}
            />
          ) : (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
        {errors.submit && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errors.submit}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


