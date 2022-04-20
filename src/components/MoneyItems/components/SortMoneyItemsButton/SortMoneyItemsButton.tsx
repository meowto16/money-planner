import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {ListItemIcon, ListItemText} from "@mui/material";

import SortIcon from '@mui/icons-material/Sort';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";

import {moneyActions} from "../../../../store/money.slice";

const SortMoneyItemsButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch()

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                    <ListItemText>По названию</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSortByAmount}>
                    <ListItemIcon>
                        <CurrencyRubleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>По цене</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default SortMoneyItemsButton