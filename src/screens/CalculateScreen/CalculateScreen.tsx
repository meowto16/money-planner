import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { moneyActions, moneySelectors } from '../../store/money.slice'

import { AppBar, Box, IconButton, Container, Stack, Typography, styled } from '@mui/material'
import MoneyTotal from '../../components/MoneyTotal/MoneyTotal'
import MoneyItems from '../../components/MoneyItems/MoneyItems'
import SortMoneyItemsButton from '../../components/MoneyItems/components/SortMoneyItemsButton/SortMoneyItemsButton'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const ResetIconButton = styled(IconButton)({
  '&': {
    color: 'white'
  }
})

const CalculateScreen = () => {
  const dispatch = useDispatch()

  const isCostsEmpty = useSelector(moneySelectors.isCostsEmpty)

  const handleResetTotalMoney: React.MouseEventHandler = () => {
    dispatch(moneyActions.resetToInitialState())
  }

  return (
    <Box pb={4}>
      <AppBar position="static">
        <Container>
          <Box display="flex" alignItems="center" justifyContent="space-between" py={1} minHeight="56px">
            <Typography variant="h5" component="h1">Расчет денег</Typography>
            <ResetIconButton onClick={handleResetTotalMoney} color="default" title="Сбросить">
              <RestartAltIcon />
            </ResetIconButton>
          </Box>
        </Container>
      </AppBar>
      <Container>
        <Stack sx={{ width: '100%' }} py={3} spacing={4}>
          <Box>
            <MoneyTotal />
          </Box>
          {!isCostsEmpty && (
            <Box>
              <SortMoneyItemsButton />
            </Box>
          )}
          <Box>
            <MoneyItems />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default CalculateScreen