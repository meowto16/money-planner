import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ListItemIcon, ListItemText } from '@mui/material'

import SortIcon from '@mui/icons-material/Sort'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'

import { moneyActions, moneySelectors } from '../../../../../../store/money.slice'

const SortMoneyItemsButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch = useDispatch()

  const sortedBy = useSelector(moneySelectors.getSortedBy)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const createMenuAction = (cb: () => void) => {
    return () => {
      cb()
      handleClose()
    }
  }

  const handleSortByName = createMenuAction(() => dispatch(moneyActions.sortItems('byName')))
  const handleSortByAmount = createMenuAction(() => dispatch(moneyActions.sortItems('byAmount')))

  return (
    <div>
      <Button
        startIcon={<SortIcon />}
        color="primary"
        onClick={handleClick}
        tabIndex={0}
      >
                Отсортировать
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleSortByName}>
          <ListItemIcon>
            <SortByAlphaIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="По названию"
            {...(sortedBy === 'BY_NAME_ASC' && { secondary: '(по возрастанию)' })}
            {...(sortedBy === 'BY_NAME_DESC' && { secondary: '(по убыванию)' })}
          />
        </MenuItem>
        <MenuItem onClick={handleSortByAmount}>
          <ListItemIcon>
            <CurrencyRubleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="По цене"
            {...(sortedBy === 'BY_AMOUNT_ASC' && { secondary: '(по возрастанию)' })}
            {...(sortedBy === 'BY_AMOUNT_DESC' && { secondary: '(по убыванию)' })}
          />
        </MenuItem>
      </Menu>
    </div>
  )
}

export default SortMoneyItemsButton