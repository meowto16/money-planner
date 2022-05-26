import React from 'react'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, DialogContentText } from '@mui/material'

import * as S from './CategoryDialog.styled'

const CategoryDialog: React.FC = () => {
  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
        
    console.log('submit')
  }

  return (
    <Dialog open={false} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          Привязка категории
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Привяжите расход к категории, чтобы иметь возможность фильтровать/сортировать по категории, либо же видеть
            сумму расходов
          </DialogContentText>
          <S.InputsContainer>
            <S.InputContainer>
              <S.Input label="Название категории" />
            </S.InputContainer>
          </S.InputsContainer>
        </DialogContent>
        <DialogActions>
          <Button color="success" variant="contained" type="submit">Сохранить</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CategoryDialog