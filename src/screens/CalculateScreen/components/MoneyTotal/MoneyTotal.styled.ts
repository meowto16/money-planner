import { Box, styled } from '@mui/material'

export const MoneyTotalContainer = styled(Box)({
  overflow: 'hidden',
  padding: '8px 0',
})

export const MoneyTotal = styled(Box)({
  position: 'relative',
})

export const MoneyTotalResetIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '-60px',
  top: '0',
  width: '60px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.error.main,
  color: 'white',
  willChange: 'opacity',
}))

export const MoneyTotalEditIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '-60px',
  top: '0',
  width: '60px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  willChange: 'opacity',
}))