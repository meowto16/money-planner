import { Box, TextField, IconButton, styled } from '@mui/material'
import { SWIPE_LEFT_MIN_DISTANCE } from './constants'

export const MoneyItem = styled(Box)({
  width: '100%',
  display: 'flex',
  border: '1px solid #eee',
  borderRadius: '4px',
  boxShadow: '4px 3px 5px 1px #f0eded',
  justifyContent: 'space-between',
  willChange: 'transform',
})

export const MoneyItemInputs = styled(Box)({
  width: '100%',
  display: 'flex',
  padding: '12px 16px 24px',
  justifyContent: 'space-between',
  position: 'relative',
})

export const MoneyItemRange = styled(Box)({
  position: 'absolute',
  bottom: '-2px',
  left: '-2px',
  width: '100%',
})

export const MoneyItemRangeInput = styled('input')(({ theme }) => ({
  width: '100%',
  display: 'block',
  WebkitAppearance: 'none',
  appearance: 'none',
  outline: 'none',
  background: '#eee',
  height: '16px',
  borderBottomLeftRadius: '3px',
  borderBottomRightRadius: '0px',
  borderTopLeftRadius: '0px',
  borderTopRightRadius: '0px',

  '&::-webkit-slider-thumb': {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '20px',
    height: '20px',
    transition: 'width 0.15s ease-in, height 0.15s ease-in',
    borderRadius: '50%',
    background: theme.palette.primary.light,
    cursor: 'pointer'
  },
  '&::-moz-range-thumb': {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    transition: 'width 0.15s ease-in, height 0.15s ease-in',
    background: theme.palette.primary.light,
    cursor: 'pointer'
  },

  '&:active::-webkit-slider-thumb': {
    width: '26px',
    height: '26px'
  }
}))

export const MoneyItemDeleteAction = styled(Box)({
  position: 'absolute',
  width: `${SWIPE_LEFT_MIN_DISTANCE}px`,
  height: '65px',
  right: `-${SWIPE_LEFT_MIN_DISTANCE}px`,
  top: '0',
  willChange: 'opacity',
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