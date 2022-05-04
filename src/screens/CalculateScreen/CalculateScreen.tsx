import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { moneyActions, moneySelectors } from '../../store/money.slice'

import { AppBar, Box, IconButton, Container, Stack, Typography, styled } from '@mui/material'
import MoneyTotal from '../../components/MoneyTotal/MoneyTotal'
import MoneyItems from '../../components/MoneyItems/MoneyItems'
import SortMoneyItemsButton from '../../components/MoneyItems/components/SortMoneyItemsButton/SortMoneyItemsButton'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import useConfirmDialog from '../../components/ConfirmDialog/useConfirmDialog'

const ResetIconButton = styled(IconButton)({
  '&': {
    color: 'white'
  }
})

const CalculateScreen = () => {
  const dispatch = useDispatch()
  const { confirmDialog: resetConfirmDialog, openConfirmDialog } = useConfirmDialog({
    title: 'Вы действительно хотите сбросить всё?',
    onConfirm: () => dispatch(moneyActions.resetToInitialState()),
    buttons: {
      cancel: {
        text: 'Нет'
      },
      confirm: {
        text: 'Да, сбросить',
        ButtonProps: {
          color: 'warning'
        }
      },
    }
  })

  const isCostsEmpty = useSelector(moneySelectors.isCostsEmpty)

  return (
    <Box pb={4}>
      <AppBar position="static">
        <Container>
          <Box display="flex" alignItems="center" justifyContent="space-between" py={1} minHeight="56px">
            <Typography variant="h5" component="h1">Расчет денег</Typography>
            <ResetIconButton onClick={openConfirmDialog} color="default" title="Сбросить">
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
      {resetConfirmDialog}
    </Box>
  )
}

export default CalculateScreen