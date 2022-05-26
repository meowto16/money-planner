import { Box, TextField, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CreateContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const CreateTitle = styled(Typography)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    display: 'inline-block',
    width: '20px',
    height: '6px',
    background: theme.palette.primary.main,
    marginRight: '8px',
  },
}))

export const InputsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export const InputContainer = styled(Box)({

})

export const Input = styled(TextField)({
  width: '100%',
})

export const LinkContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const LinkTitle = styled(Typography)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    display: 'inline-block',
    width: '20px',
    height: '6px',
    background: theme.palette.secondary.main,
    marginRight: '8px',
  },
}))

export const Categories = styled(Box)({
  display: 'flex',
  flexFlow: 'row wrap',
  gridGap: '8px',
  marginTop: '8px',
})

export const CategoryItem = styled(Button)({
})