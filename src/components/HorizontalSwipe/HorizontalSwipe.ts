import React, { useState } from 'react'
import { SWIPE_BOTTOM_MIN_DISTANCE_RESTRICTION, SWIPE_TOP_MIN_DISTANCE_RESTRICTION } from './constants'

export type SwipeHandler = (event: React.TouchEvent, diff: number) => void

export type HorizontalSwipeChildren = (props: {
  isSwiping: boolean
  swipeDistance: number
  handleTouchStart?: React.TouchEventHandler
  handleTouchMove?: React.TouchEventHandler
  handleTouchEnd?: React.TouchEventHandler
}) => React.ReactElement

export interface HorizontalSwipeProps {
    onSwipeLeft?: SwipeHandler
    onSwipeRight?: SwipeHandler
    onSwipeMove?: SwipeHandler
    children: HorizontalSwipeChildren
}

const HorizontalSwipe: React.FC<HorizontalSwipeProps> = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeMove,
  children
}) => {
  const [isSwiping, setIsSwiping] = useState<boolean>(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [swipeDistance, setSwipeDistance] = useState<number>(0)

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchStartX(e.changedTouches[0].screenX)
    setTouchStartY(e.changedTouches[0].screenY)
    setIsSwiping(true)
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX === null) {
      return
    }

    const touchEndX = e.changedTouches[0].screenX
    const diffX = touchStartX - touchEndX

    onSwipeMove?.(e, diffX)
    setSwipeDistance(diffX)
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX === null || touchStartY === null) {
      return
    }

    const touchEndY = e.changedTouches[0].screenY
    const diffY = touchStartY - touchEndY
    const isSwipeVertical =
        diffY >= SWIPE_TOP_MIN_DISTANCE_RESTRICTION
        || diffY <= SWIPE_BOTTOM_MIN_DISTANCE_RESTRICTION

    if (!isSwipeVertical) {
      const touchEndX = e.changedTouches[0].screenX
      const diffX = touchStartX - touchEndX
      const isSwipeLeft = diffX > 0
      const isSwipeRight = diffX < 0

      if (isSwipeLeft) {
        onSwipeLeft?.(e, Math.abs(diffX))
      }

      if (isSwipeRight) {
        onSwipeRight?.(e, Math.abs(diffX))
      }
    }

    setTouchStartX(null)
    setTouchStartY(null)
    setIsSwiping(false)
    setSwipeDistance(0)
  }

  return children({
    isSwiping,
    swipeDistance,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  })
}

export default HorizontalSwipe