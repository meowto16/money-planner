import React, { useCallback, memo } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

import { CostsItem } from '../../../../../../store/money.slice'
import { numberFormat, numberUnformat } from '../../../../../../utils/numberFormat'

import * as S from './MoneyItem.styled'
import HorizontalSwipe, { SwipeHandler } from '../../../../../../components/HorizontalSwipe'
import { SWIPE_LEFT_MIN_DISTANCE, SWIPE_RIGHT_MIN_DISTANCE } from './constants'
import { Slider } from '@mui/material'

export interface MoneyItemProps {
    placeholder: string
    id: CostsItem['id']
    name: CostsItem['name']
    amount: CostsItem['amount']
    percent: number
    haveCategory: boolean
    onToggleCategory: (id: CostsItem['id'], haveCategory: boolean) => void
    onChangeName: (props: { id: CostsItem['id'], name: CostsItem['name'] }) => void
    onChangeAmount: (props: { id: CostsItem['id'], amount: CostsItem['amount'] }) => void
    onChangePercent?: (props: { id: CostsItem['id'], amount: CostsItem['amount'], percent: number }) => void
    onDelete: (id: CostsItem['id']) => void
}

const MoneyItem: React.FC<MoneyItemProps> = ({
  id,
  name,
  amount,
  percent = 0,
  placeholder,
  haveCategory,
  onToggleCategory,
  onChangeName,
  onChangeAmount,
  onChangePercent,
  onDelete
}) => {
  const handleSwipeLeft: SwipeHandler = useCallback((event, diff) => {
    const isSwipedEnough = diff >= SWIPE_LEFT_MIN_DISTANCE

    if (isSwipedEnough) {
      onDelete(id)
    }
  }, [])

  const handleSwipeRight: SwipeHandler = useCallback((event, diff) => {
    const isSwipedEnough = diff >= SWIPE_RIGHT_MIN_DISTANCE

    if (isSwipedEnough) {
      onToggleCategory(id, haveCategory)
    }
  }, [])

  const haveRange = Boolean(onChangePercent)

  return (
    <HorizontalSwipe onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
      {({ handleTouchStart, handleTouchMove, handleTouchEnd, isSwiping, swipeDistance }) => (
        <S.MoneyItem
          $haveCategory={haveCategory}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translate3d(${-swipeDistance}px, 0, 0)`,
            transition: !isSwiping ? '0.15s ease-in transform' : undefined,
          }}
        >
          <S.MoneyItemAddCategoryAction style={{
            opacity: `${-swipeDistance / SWIPE_LEFT_MIN_DISTANCE}`,
            transition: !isSwiping ? '0.15s ease-in opacity' : undefined,
          }}>
            <S.MoneyItemAddCategory>
              <S.MoneyItemAddCategoryButton>
                <BookmarksIcon />
              </S.MoneyItemAddCategoryButton>
            </S.MoneyItemAddCategory>
          </S.MoneyItemAddCategoryAction>
          <S.MoneyItemInputs $haveRange={haveRange}>
            <S.MoneyItemName
              onChange={(e) => {
                onChangeName({
                  id: id,
                  name: e.target.value
                })
              }}
              value={name}
              variant="standard"
              placeholder={placeholder}
              size="small"
              fullWidth
            />
            <S.MoneyItemCost
              autoFocus
              inputProps={{
                inputMode: 'numeric'
              }}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                'data-percent': (Math.round(percent / 0.5) * 0.5) + '%'
              }}
              placeholder="0"
              onChange={(e) => {
                onChangeAmount({
                  id: id,
                  amount: numberUnformat(e.target.value)
                })
              }}
              value={amount === 0 ? '' : `${numberFormat(amount)}`}
              variant="standard"
              size="small"
              fullWidth
            />
            {haveRange && (
              <S.MoneyItemRange
                onTouchStart={e => e.stopPropagation()}
              >
                <Slider
                  value={percent}
                  step={0.5}
                  min={0}
                  max={100}
                  onChange={(e, value) => onChangePercent!({
                    id,
                    amount,
                    percent: value as number
                  })}
                  data-percent="0.5%"
                />
              </S.MoneyItemRange>
            )}
          </S.MoneyItemInputs>
          <S.MoneyItemDeleteAction style={{
            opacity: `${swipeDistance / SWIPE_LEFT_MIN_DISTANCE}`,
            transition: !isSwiping ? '0.15s ease-in opacity' : undefined,
          }}>
            <S.MoneyItemDelete>
              <S.MoneyItemDeleteButton>
                <DeleteIcon />
              </S.MoneyItemDeleteButton>
            </S.MoneyItemDelete>
          </S.MoneyItemDeleteAction>
        </S.MoneyItem>
      )}
    </HorizontalSwipe>
  )
}

export default memo(MoneyItem)
