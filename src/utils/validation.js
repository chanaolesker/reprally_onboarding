// Email validation regex
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number formatting and validation
export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX
  if (phoneNumber.length >= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  } else if (phoneNumber.length >= 3) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  } else if (phoneNumber.length > 0) {
    return `(${phoneNumber}`
  }
  return phoneNumber
}

// Validate phone number (US format)
export const isValidPhoneNumber = (phone) => {
  const phoneNumber = phone.replace(/\D/g, '')
  return phoneNumber.length === 10
}

// Validate that address is in New Jersey
export const isNewJerseyAddress = (addressComponents) => {
  if (!addressComponents) return false
  
  // Check for New Jersey state
  const stateComponent = addressComponents.find(component => 
    component.types.includes('administrative_area_level_1')
  )
  
  return stateComponent && stateComponent.short_name === 'NJ'
}

// Extract address components from Google Places result
export const extractAddressComponents = (place) => {
  if (!place || !place.address_components) return null
  
  const components = place.address_components
  const result = {
    street: '',
    city: '',
    state: '',
    zip: '',
    fullAddress: place.formatted_address,
    latitude: null,
    longitude: null
  }
  
  components.forEach(component => {
    if (component.types.includes('street_number') || component.types.includes('route')) {
      result.street += component.long_name + ' '
    }
    if (component.types.includes('locality')) {
      result.city = component.long_name
    }
    if (component.types.includes('administrative_area_level_1')) {
      result.state = component.short_name
    }
    if (component.types.includes('postal_code')) {
      result.zip = component.long_name
    }
  })
  
  result.street = result.street.trim()
  
  // Extract coordinates from place geometry
  if (place.geometry && place.geometry.location) {
    result.latitude = place.geometry.location.lat()
    result.longitude = place.geometry.location.lng()
  }
  
  return result
}
