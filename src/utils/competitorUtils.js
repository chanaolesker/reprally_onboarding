import { supabase } from '@/shared/lib/supabase'

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in miles
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

/**
 * Find competitors within a specified radius
 * @param {number} userLat - User's store latitude
 * @param {number} userLon - User's store longitude
 * @param {number} storeType - Store type ID
 * @param {number} radiusMiles - Search radius in miles
 * @returns {Promise<Array>} Array of competitor stores
 */
export async function findCompetitorsInRadius(userLat, userLon, storeType, radiusMiles) {
  try {
    // First, get all stores of the same type
    const { data: stores, error } = await supabase
      .from('stores')
      .select(`
        id,
        name,
        latitude,
        longitude,
        google_rating,
        google_rating_count,
        state
      `)
      .eq('type', storeType)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)

    if (error) {
      console.error('Error fetching stores:', error)
      return []
    }

    if (!stores || stores.length === 0) {
      return []
    }

    // Filter stores within radius and calculate distances
    const competitors = stores
      .map(store => {
        const distance = calculateDistance(userLat, userLon, store.latitude, store.longitude)
        return {
          ...store,
          distance
        }
      })
      .filter(store => store.distance <= radiusMiles)
      .sort((a, b) => {
        // Sort by rating (descending), then by rating count (descending), then by distance (ascending)
        if (a.google_rating !== b.google_rating) {
          return (b.google_rating || 0) - (a.google_rating || 0)
        }
        if (a.google_rating_count !== b.google_rating_count) {
          return (b.google_rating_count || 0) - (a.google_rating_count || 0)
        }
        return a.distance - b.distance
      })

    return competitors
  } catch (error) {
    console.error('Error in findCompetitorsInRadius:', error)
    return []
  }
}

/**
 * Find top competitors with expanding radius
 * @param {number} userLat - User's store latitude
 * @param {number} userLon - User's store longitude
 * @param {number} storeType - Store type ID
 * @param {number} maxResults - Maximum number of competitors to find (default: 3)
 * @returns {Promise<Object>} Object containing competitors and total count
 */
export async function findTopCompetitors(userLat, userLon, storeType, maxResults = 3) {
  const initialRadius = 5 // Start with 5 miles
  const maxRadius = 50 // Don't search beyond 50 miles
  const radiusIncrement = 5 // Increase radius by 5 miles each iteration

  let currentRadius = initialRadius
  let competitors = []
  let totalCompetitors = 0

  // For demo purposes, if no competitors found in database, return mock data
  let foundCompetitors = await findCompetitorsInRadius(userLat, userLon, storeType, currentRadius)
  
  if (foundCompetitors.length === 0) {
    console.log('No competitors found in database, using mock data for demo')
    // Generate mock competitors for demo
    const mockCompetitors = [
      {
        id: 1,
        name: "Corner Market Plus",
        latitude: userLat + 0.01,
        longitude: userLon + 0.01,
        google_rating: 4.5,
        google_rating_count: 127,
        state: "NJ",
        distance: 0.8
      },
      {
        id: 2,
        name: "Quick Stop Express",
        latitude: userLat - 0.02,
        longitude: userLon + 0.015,
        google_rating: 4.2,
        google_rating_count: 89,
        state: "NJ",
        distance: 1.2
      },
      {
        id: 3,
        name: "Neighborhood Store",
        latitude: userLat + 0.025,
        longitude: userLon - 0.01,
        google_rating: 4.0,
        google_rating_count: 156,
        state: "NJ",
        distance: 1.8
      }
    ]
    
    return {
      competitors: mockCompetitors,
      totalCompetitors: mockCompetitors.length,
      searchRadius: currentRadius
    }
  }

  while (currentRadius <= maxRadius && competitors.length < maxResults) {
    foundCompetitors = await findCompetitorsInRadius(userLat, userLon, storeType, currentRadius)
    
    if (foundCompetitors.length > 0) {
      totalCompetitors = foundCompetitors.length
      competitors = foundCompetitors.slice(0, maxResults)
      
      // If we found enough competitors, break
      if (competitors.length >= maxResults) {
        break
      }
    }
    
    currentRadius += radiusIncrement
  }

  return {
    competitors,
    totalCompetitors,
    searchRadius: currentRadius - radiusIncrement
  }
}

/**
 * Format rating for display
 * @param {number|null} rating - Google rating
 * @param {number|null} count - Rating count
 * @returns {string} Formatted rating string
 */
export function formatRating(rating, count) {
  if (!rating || rating === 0) {
    return 'No rating'
  }
  
  const formattedRating = rating.toFixed(1)
  const formattedCount = count ? `(${count.toLocaleString()})` : ''
  
  return `${formattedRating} ⭐ ${formattedCount}`
}

/**
 * Generate Google Maps link for a store
 * @param {string} name - Store name
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {string} Google Maps URL
 */
export function generateMapsLink(name, lat, lon) {
  const encodedName = encodeURIComponent(name)
  return `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${lat},${lon}`
}

/**
 * Format distance for display
 * @param {number} distance - Distance in miles
 * @returns {string} Formatted distance string
 */
export function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 10) / 10} mi`
  }
  return `${Math.round(distance * 10) / 10} mi`
}
