import { useState } from 'react'

export const useFormDataSimple = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const updateFormData = (updates) => {
    const newData = { ...formData, ...updates }
    setFormData(newData)
  }

  const saveToSession = (data) => {
    try {
      sessionStorage.setItem('storeFormData', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving form data to session storage:', error)
    }
  }

  const clearFormData = () => {
    setFormData(initialData)
    sessionStorage.removeItem('storeFormData')
  }

  const setFieldError = (field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const clearAllErrors = () => {
    setErrors({})
  }

  return {
    formData,
    setFormData,
    updateFormData,
    clearFormData,
    saveToSession,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    setFieldError,
    clearFieldError,
    clearAllErrors
  }
}


