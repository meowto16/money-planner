import React, { memo } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'

import { CostsItem } from '../../../../../../store/money.slice'
import numberFormat, { numberUnformat } from '../../../../../../utils/numberFormat'

import * as S from './MoneyItem.styled'
import HorizontalSwipe, { SwipeHandler } from '../../../../../../components/HorizontalSwipe'
import { SWIPE_LEFT_MIN_DISTANCE, SWIPE_RIGHT_MIN_DISTANCE } from './constants'

export interface MoneyItemProps {
    placeholder: string
    id: CostsItem['id']
    name: CostsItem['name']
    amount: CostsItem['amount']
    percent: number
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
  onChangeName,
  onChangeAmount,
  onChangePercent,
  onDelete
}) => {
  const handleSwipeLeft: SwipeHandler = (event, diff) => {
    const isSwipedEnough = diff >= SWIPE_LEFT_MIN_DISTANCE
    console.log('swipe left', isSwipedEnough, diff)

    if (isSwipedEnough) {
      onDelete(id)
    }
  }

  const handleSwipeRight: SwipeHandler = (event, diff) => {
    const isSwipedEnough = diff >= SWIPE_RIGHT_MIN_DISTANCE
    console.log('swipe right', isSwipedEnough, diff)
  }

  const haveRange = Boolean(onChangePercent)

  return (
    <HorizontalSwipe onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
      {({ handleTouchStart, handleTouchMove, handleTouchEnd, isSwiping, swipeDistance }) => (
        <S.MoneyItem
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translate3d(${-swipeDistance}px, 0, 0)`,
            transition: !isSwiping ? '0.15s ease-in transform' : undefined,
          }}
        >
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
              value={amount === 0 ? '' : `${numberFormat.format(amount)}`}
              variant="standard"
              size="small"
              fullWidth
            />
            {haveRange && (
              <S.MoneyItemRange>
                <S.MoneyItemRangeInput
                  type="range"
                  value={percent}
                  step={0.5}
                  min={0}
                  max={100}
                  onTouchStart={e => e.stopPropagation()}
                  onTouchMove={e => e.stopPropagation()}
                  onTouchEnd={e => e.stopPropagation()}
                  onChange={e => onChangePercent!({ id, amount, percent: +e.target.value })}
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
              <S.MoneyItemDeleteButton onClick={() => onDelete(id)}>
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