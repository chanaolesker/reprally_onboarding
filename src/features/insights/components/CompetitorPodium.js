'use client'

import { useEffect, useState } from 'react'
import { formatRating, formatDistance } from '@/utils/competitorUtils'

export default function CompetitorPodium({ competitors, userStoreName, storeTypeName }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 420)
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])
  if (!competitors || competitors.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Competitors Found</h3>
        <p className="text-gray-500">
          We couldn&apos;t find any competing stores in your area.
        </p>
      </div>
    )
  }

  const sortedCompetitors = [...competitors].sort((a, b) => {
    if (a.google_rating !== b.google_rating) {
      return (b.google_rating || 0) - (a.google_rating || 0)
    }
    return (b.google_rating_count || 0) - (a.google_rating_count || 0)
  })

  const firstPlace = sortedCompetitors[0]
  const secondPlace = sortedCompetitors[1]
  const thirdPlace = sortedCompetitors[2]

  const PodiumPosition = ({ store, position, height, isCenter = false }) => {
    if (!store) return null

    const isUserStore = store.name === userStoreName
    const backgroundColor = position === 1 ? '#fbbf24' : position === 2 ? '#d1d5db' : '#fb923c'
    const textColor = position === 1 ? '#92400e' : position === 2 ? '#374151' : '#9a3412'
    const nameFontSize = isMobile ? '14px' : '18px'
    const infoFontSize = isMobile ? '14px' : '18px'
    const cardMinWidth = isMobile ? '100px' : '120px'
    const cardMaxWidth = isMobile ? '120px' : '140px'

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          marginBottom: '12px',
          padding: '8px',
          borderRadius: '8px',
          border: `2px solid ${isUserStore ? '#014c40' : '#e5e7eb'}`,
          backgroundColor: isUserStore ? '#f0f9f7' : 'white',
          minWidth: cardMinWidth,
          maxWidth: cardMaxWidth
        }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{
              fontWeight: '600',
              fontSize: nameFontSize,
              marginBottom: '4px',
              color: isUserStore ? '#014c40' : '#111827'
            }}>
              {store.name}
              {isUserStore && (
                <span style={{ 
                  display: 'block', 
                  fontSize: '10px', 
                  color: '#014c40', 
                  marginTop: '2px' 
                }}>
                  Your Store
                </span>
              )}
            </h4>
            <div style={{ fontSize: infoFontSize, color: '#4b5563' }}>
              {formatRating(store.google_rating, store.google_rating_count)}
            </div>
            <div style={{ fontSize: infoFontSize, color: '#6b7280' }}>
              {formatDistance(store.distance)}
            </div>
          </div>
        </div>

        <div 
          style={{ 
            width: '100px',
            height: `${height}px`,
            backgroundColor: backgroundColor,
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderBottom: 'none'
          }}
        >
          <span 
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: textColor
            }}
          >
            {position}
          </span>
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px 8px 0 0',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        gap: isMobile ? '8px' : '12px',
        marginBottom: '24px',
        minHeight: isMobile ? '160px' : '200px'
      }}>
        <PodiumPosition store={secondPlace} position={2} height={60} />
        <PodiumPosition store={firstPlace} position={1} height={80} isCenter={true} />
        <PodiumPosition store={thirdPlace} position={3} height={40} />
      </div>
      <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <p>Ranked by Google rating and review count</p>
        {competitors.length > 3 && (
          <p style={{ marginTop: '4px' }}>
            Showing top 3 of {competitors.length} competitors found
          </p>
        )}
      </div>
    </div>
  )
}



