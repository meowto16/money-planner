import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'

import { moneyActions } from '../../../../../../store/money.slice'

const AddMoneyItem: React.FC = () => {
  const dispatch = useDispatch()

  const handleClick: React.MouseEventHandler = useCallback(() => {
    dispatch(moneyActions.addCostsItem())
  }, [])

  return (
    <Button variant="contained" onClick={handleClick}>Добавить расход</Button>
  )
}

export default AddMoneyItem