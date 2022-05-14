import React, { memo } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'

import { CostsItem } from '../../../../store/money.slice'
import numberFormat from '../../../../utils/numberFormat'

import * as S from './MoneyItem.styled'

export interface MoneyItemProps {
    placeholder: string
    id: CostsItem['id']
    name: CostsItem['name']
    amount: CostsItem['amount']
    percent: number
    onChangeName: (props: { id: CostsItem['id'], name: CostsItem['name'] }) => void
    onChangeAmount: (props: { id: CostsItem['id'], amount: CostsItem['amount'] }) => void
    onChangePercent: (props: { id: CostsItem['id'], amount: CostsItem['amount'], percent: number }) => void
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
  return (
    <S.MoneyItem>
      <S.MoneyItemInputs>
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
              amount: +e.target.value.replace(/[^0-9]/g, '')
            })
          }}
          value={amount === 0 ? '' : `${numberFormat.format(amount)}`}
          variant="standard"
          size="small"
          fullWidth
        />
        <S.MoneyItemRange>
          <S.MoneyItemRangeInput
            type="range"
            value={percent}
            step={0.5} 
            min={0} 
            max={100}
            onChange={(e) => onChangePercent({ id, amount, percent: +e.target.value })}
            data-percent="0.5%"
          />
        </S.MoneyItemRange>
      </S.MoneyItemInputs>
      <S.MoneyItemActions>
        <S.MoneyItemDelete>
          <S.MoneyItemDeleteButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </S.MoneyItemDeleteButton>
        </S.MoneyItemDelete>
      </S.MoneyItemActions>
    </S.MoneyItem>
  )
}

export default memo(MoneyItem)