import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TitleContainer = styled(Box)({
  textAlign: 'center'
})

export const InputsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export const InputContainer = styled(Box)({

})

export const Input = styled(TextField)({
  width: '100%',
})