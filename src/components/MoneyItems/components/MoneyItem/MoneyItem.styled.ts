import { Box, TextField, IconButton, styled } from '@mui/material'

export const MoneyItem = styled(Box)({
  width: '100%',
  display: 'flex',
  border: '1px solid #eee',
  borderRadius: '4px',
  boxShadow: '4px 3px 5px 1px #f0eded',
  justifyContent: 'space-between'
})

export const MoneyItemInputs = styled(Box)({
  width: '100%',
  display: 'flex',
  padding: '12px 16px',
  justifyContent: 'space-between',
})


export const MoneyItemActions = styled(Box)({
  minWidth: '60px',
})

export const MoneyItemName = styled(TextField)({
  '&': {
    width: 'auto',
  },
  '&&': {
    '& .MuiInput-root:before, & .MuiInput-root:after, & .MuiInput-root:hover:before, & .MuiInput-root:hover:after': {
      borderBottom: 'none'
    },
  },
  '& .MuiInputAdornment-root': {
    paddingBottom: '4px',
  }
})

export const MoneyItemCost = styled(TextField)({
  '&&': {
    '& .MuiInput-root:before, & .MuiInput-root:after, & .MuiInput-root:hover:before, & .MuiInput-root:hover:after': {
      borderBottom: 'none'
    },
  },
  '&': {
    minWidth: '120px',
    maxWidth: '115px',
    width: '115px',
  },
  '& .MuiInput-root::after': {
    content: '"руб."',
    transform: 'unset',
    position: 'static',
    marginLeft: '4px',
    fontSize: '0.8em',
    marginBottom: '-4px',
  },
  '& .MuiInput-input': {
    textAlign: 'right',
    paddingBottom: '0px',
  },
  '& .MuiInputAdornment-root': {

  },
})

export const MoneyItemDelete = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.error.main,
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
}))

export const MoneyItemDeleteButton = styled(IconButton)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#f6f6f6'
})