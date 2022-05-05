import { styled, TextField } from '@mui/material'

export const MoneyItemName = styled(TextField)({
  '& .MuiInput-root:before, & .MuiInput-root:after': {
    borderBottom: 'none'
  },
  '& .MuiInputAdornment-root': {
    paddingBottom: '4px',
  }
})