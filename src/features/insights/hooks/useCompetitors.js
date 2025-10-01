import { useState, useEffect } from 'react'
import { findTopCompetitors } from '@/utils/competitorUtils'

export const useCompetitors = (formData) => {
  const [competitors, setCompetitors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadCompetitors = async (data) => {
    if (!data) return
    try {
      setIsLoading(true)
      setError(null)
      if (!data.addressComponents || !data.addressComponents.latitude || !data.addressComponents.longitude) {
        const fallbackLat = 40.7128
        const fallbackLon = -74.0060
        const result = await findTopCompetitors(fallbackLat, fallbackLon, data.storeType, 3)
        setCompetitors(result.competitors)
        return
      }
      const result = await findTopCompetitors(
        data.addressComponents.latitude,
        data.addressComponents.longitude,
        data.storeType,
        3
      )
      setCompetitors(result.competitors)
    } catch (error) {
      setError(error.message || 'Unable to load competitor data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const retry = () => {
    if (formData) loadCompetitors(formData)
  }

  useEffect(() => {
    if (formData) loadCompetitors(formData)
  }, [formData])

  return { competitors, isLoading, error, retry }
}


