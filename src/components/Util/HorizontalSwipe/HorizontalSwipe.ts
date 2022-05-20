import React, { useState } from 'react'

export type SwipeHandler = (event: React.TouchEvent, diff: number) => void

export interface HorizontalSwipeProps {
    onSwipeLeft?: SwipeHandler
    onSwipeRight?: SwipeHandler
    onSwipeMove?: SwipeHandler
    children: React.ReactElement
}

const HorizontalSwipe: React.FC<HorizontalSwipeProps> = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeMove,
  children
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchStart(e.changedTouches[0].screenX)
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStart === null) {
      return
    }

    const touchEnd = e.changedTouches[0].screenX
    const diff = touchStart - touchEnd

    onSwipeMove?.(e, diff)
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStart === null) {
      return
    }

    const touchEnd = e.changedTouches[0].screenX
    const diff = touchStart - touchEnd
    const isSwipeLeft = diff > 0
    const isSwipeRight = diff < 0

    if (isSwipeLeft) {
      onSwipeLeft?.(e, diff)
    }

    if (isSwipeRight) {
      onSwipeRight?.(e, diff)
    }

    setTouchStart(null)
  }

  return React.cloneElement(children, {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  })
}

export default HorizontalSwipe