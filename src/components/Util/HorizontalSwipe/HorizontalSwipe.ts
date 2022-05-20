import React, { useState } from 'react'

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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [swipeDistance, setSwipeDistance] = useState<number>(0)

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchStart(e.changedTouches[0].screenX)
    setIsSwiping(true)
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStart === null) {
      return
    }

    const touchEnd = e.changedTouches[0].screenX
    const diff = touchStart - touchEnd

    onSwipeMove?.(e, diff)
    setSwipeDistance(diff)
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