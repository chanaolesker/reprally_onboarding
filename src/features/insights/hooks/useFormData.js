import { useState, useEffect } from 'react'

export const useFormData = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedData = sessionStorage.getItem('storeFormData')
    if (storedData) {
      try {
        setFormData(JSON.parse(storedData))
      } catch (error) {
        console.error('Error parsing stored form data:', error)
      }
    }
    setHydrated(true)
  }, [])

  const saveToSession = (data) => {
    try {
      sessionStorage.setItem('storeFormData', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving form data to session storage:', error)
    }
  }

  const updateFormData = (updates, saveToStorage = false) => {
    const newData = { ...formData, ...updates }
    setFormData(newData)
    if (saveToStorage) {
      saveToSession(newData)
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
    clearAllErrors,
    hydrated
  }
}


