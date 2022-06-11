import { Box, TextField, IconButton, styled } from '@mui/material'

export const MoneyItem = styled(Box)<{ $haveCategory?: boolean }>(({ theme, $haveCategory }) => ({
  width: '100%',
  display: 'flex',
  border: '1px solid #eee',
  borderRadius: '4px',
  boxShadow: '4px 3px 5px 1px #f0eded',
  justifyContent: 'space-between',
  willChange: 'transform',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '4px',
    height: '100%',
    background: theme.palette.primary.main,
    opacity: '0',
    transition: '0.15s ease-in opacity',
    borderBottomLeftRadius: '20px',

    '&': $haveCategory && {
      opacity: '1',
    },
  },
}))

export const MoneyItemInputs = styled(Box)<{ $haveRange?: boolean }>(({ $haveRange }) => ({
  width: '100%',
  display: 'flex',
  padding: $haveRange ? '12px 16px 14px' : '12px 16px',
  justifyContent: 'space-between',
  position: 'relative',
}))

export const MoneyItemRange = styled(Box)({
  position: 'absolute',
  bottom: '-7px',
  left: '0px',
  width: '100%',

  '& > .MuiSlider-root': {
    padding: '0',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  }
})

export const MoneyItemDeleteAction = styled(Box)({
  position: 'absolute',
  width: '70px',
  height: '100%',
  right: '-70px',
  top: '0',
  willChange: 'opacity',
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

export const MoneyItemAddCategoryAction = styled(Box)({
  position: 'absolute',
  width: '70px',
  height: '100%',
  left: '-70px',
  top: '0',
  willChange: 'opacity',
})

export const MoneyItemAddCategory = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
}))

export const MoneyItemAddCategoryButton = styled(IconButton)({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#f6f6f6'
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
  '& .MuiInput-root::before': {
    content: 'attr(data-percent)',
    transform: 'unset',
    position: 'absolute',
    color: '#bcbcbc',
    top: '-16px',
    left: 'unset',
    right: '0',
    fontSize: '0.6em',
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