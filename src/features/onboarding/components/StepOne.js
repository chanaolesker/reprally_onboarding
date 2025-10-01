'use client'

import { useState, useEffect } from 'react'
import { isValidEmail, formatPhoneNumber, isValidPhoneNumber, isNewJerseyAddress, extractAddressComponents } from '@/features/onboarding/utils/validation'
import InfoPopup from '@/shared/components/InfoPopup'
import FormField from '@/features/onboarding/components/FormField'
import FormButton from '@/features/onboarding/components/FormButton'
import StepTitle from '@/shared/components/StepTitle'

export default function StepOne({ formData, setFormData, onNext, errors, setErrors }) {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)
  const [autocomplete, setAutocomplete] = useState(null)
  const [addressError, setAddressError] = useState('')
  const [showNJErrorPopup, setShowNJErrorPopup] = useState(false)

  useEffect(() => {
    const loadGooglePlaces = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleLoaded(true)
        initializeAutocomplete()
      } else {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => {
          setIsGoogleLoaded(true)
          initializeAutocomplete()
        }
        document.head.appendChild(script)
      }
    }

    loadGooglePlaces()
  }, [])

  const initializeAutocomplete = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const input = document.getElementById('address-input')
      if (input) {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(input, {
          componentRestrictions: { country: 'us' },
          fields: ['address_components', 'formatted_address', 'geometry']
        })

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace()
          if (place.address_components) {
            if (!isNewJerseyAddress(place.address_components)) {
              setShowNJErrorPopup(true)
              setFormData(prev => ({ ...prev, address: '', addressComponents: null }))
            } else {
              setAddressError('')
              const addressComponents = extractAddressComponents(place)
              setFormData(prev => ({ 
                ...prev, 
                address: place.formatted_address,
                addressComponents 
              }))
            }
          }
        })

        setAutocomplete(autocompleteInstance)
      }
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    handleInputChange('phone', formatted)
  }

  const validateStep = () => {
    const newErrors = {}
    if (!formData.storeName.trim()) newErrors.storeName = 'Store name is required'
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email address'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!isValidPhoneNumber(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) onNext()
  }

  return (
    <div className="space-y-6">
      <StepTitle>Tell us who you are</StepTitle>
      <FormField
        id="storeName"
        label="Store Name"
        value={formData.storeName}
        onChange={(e) => handleInputChange('storeName', e.target.value)}
        placeholder="Enter store name"
        error={errors.storeName}
        required
      />
      <div>
        <FormField
          id="address-input"
          label="Store Address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Start typing your address..."
          error={errors.address}
          required
          disabled={!isGoogleLoaded}
          autoComplete="new-password"
          additionalProps={{ name: 'address-field', 'data-form-type': 'other' }}
        />
        {!isGoogleLoaded && (
          <p className="mt-1 text-sm text-gray-500">Loading address autocomplete...</p>
        )}
      </div>
      <FormField
        id="contactName"
        label="Contact Name"
        value={formData.contactName}
        onChange={(e) => handleInputChange('contactName', e.target.value)}
        placeholder="Enter contact name"
        error={errors.contactName}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email address"
          error={errors.email}
          required
        />
        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          error={errors.phone}
          required
        />
      </div>
      <div className="flex justify-center pt-6">
        <FormButton onClick={handleNext}>Next</FormButton>
      </div>
      <InfoPopup
        isOpen={showNJErrorPopup}
        onClose={() => {
          setShowNJErrorPopup(false)
          setFormData(prev => ({ ...prev, address: '' }))
        }}
        title="Service Area Information"
        message="This app version is currently only available for stores in New Jersey. Please select an address in NJ to continue."
        type="info"
        position="top-center"
      />
    </div>
  )
}



