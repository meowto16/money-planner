import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog, DialogContent, DialogActions, DialogTitle, Button, DialogContentText } from '@mui/material'

import { CategoryItem, moneyActions, moneySelectors } from '../../../../store/money.slice'

import * as S from './CategoryDialog.styled'

const CategoryDialog: React.FC = () => {
  const dispatch = useDispatch()
  const [categoryName, setCategoryName] = useState('')

  const categories = useSelector(moneySelectors.getCategoriesArray)

  const resetForm = () => {
    setCategoryName('')
  }
  
  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
        
    if (!categoryName) {
      return
    }

    dispatch(moneyActions.createCategory({
      name: categoryName
    }))

    resetForm()
  }

  const handleCategoryClick = (category: CategoryItem) => {
    console.log(category)
  }

  return (
    <Dialog open={false} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          Привязка категории
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создайте категорию, либо привяжите существующую
          </DialogContentText>
          <S.LinkContainer>
            <S.LinkTitle>Привязка категории</S.LinkTitle>
            <S.Categories>
              {categories.map((category) => (
                <S.CategoryItem
                  key={category.id}
                  variant="outlined"
                  onClick={() => handleCategoryClick(category)}>{category.name}</S.CategoryItem>
              ))}
            </S.Categories>
          </S.LinkContainer>
          <S.CreateContainer>
            <S.CreateTitle>Создание категории</S.CreateTitle>
            <S.InputsContainer>
              <S.InputContainer>
                <S.Input
                  label="Название"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </S.InputContainer>
            </S.InputsContainer>
          </S.CreateContainer>
        </DialogContent>
        <DialogActions>
          <Button color="success" variant="contained" type="submit">Сохранить</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CategoryDialog