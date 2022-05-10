import React, { memo } from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DeleteIcon from '@mui/icons-material/Delete'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'

import { CostsItem } from '../../../../store/money.slice'
import numberFormat from '../../../../utils/numberFormat'

import * as S from './MoneyItem.styled'

export interface MoneyItemProps {
    id: CostsItem['id']
    name: CostsItem['name']
    amount: CostsItem['amount']
    onChangeName: (props: { id: CostsItem['id'], name: CostsItem['name'] }) => void
    onChangeAmount: (props: { id: CostsItem['id'], amount: CostsItem['amount'] }) => void
    onDelete: (id: CostsItem['id']) => void
}

const MoneyItem: React.FC<MoneyItemProps> = ({
  id,
  name,
  amount,
  onChangeName,
  onChangeAmount,
  onDelete
}) => {
  return (
    <Box width="100%" border="1px solid #eee" borderRadius="3px" p={2}>
      <Box width="100%" mb={1}>
        <S.MoneyItemName
          onChange={(e) => {
            onChangeName({
              id: id,
              name: e.target.value
            })
          }}
          value={name}
          variant="standard"
          placeholder="Введите название"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ArrowCircleRightIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                onClick={() => onDelete(id)}
                position="end">
                <DeleteIcon color="error" />
              </InputAdornment>
            )
          }}
          size="small"
          fullWidth
        />
      </Box>
      <Box width="100%">
        <TextField
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyRubleIcon />
              </InputAdornment>)
          }}
          inputProps={{ inputMode: 'numeric' }}
          onChange={(e) => {
            onChangeAmount({
              id: id,
              amount: +e.target.value.replace(/[^0-9]/g, '')
            })
          }}
          value={amount === 0 ? '' : numberFormat.format(amount)}
          variant="standard"
          size="small"
          fullWidth
        />
      </Box>
    </Box>
  )
}

export default memo(MoneyItem)