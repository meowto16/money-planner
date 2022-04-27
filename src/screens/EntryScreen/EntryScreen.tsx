import React, {useState, useCallback} from 'react'
import {useDispatch} from "react-redux";
import {Box, Button, InputAdornment, TextField, Typography, AppBar} from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import { moneyActions } from '../../store/money.slice'
import numberFormat from '../../utils/numberFormat';
import { MAX_INPUT_MONEY_LENGTH } from '../../config';

const EntryScreen: React.FC = () => {
    const [money, setMoney] = useState<string>('')
    const dispatch = useDispatch()

    const canSubmit = !!money

    const handleMoneyChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value
        if (value.length >= MAX_INPUT_MONEY_LENGTH) return
        if (value.length === 0) {
            setMoney('');
        }

        setMoney(e.target.value.replace(/[^0-9]/g, ''))
    }, [])

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()
        if (!canSubmit) return

        dispatch(moneyActions.setTotal(+money))
    }

    return (
        <Box>
            <AppBar position="static">
                <Box p={1} display="flex" alignItems="center" justifyContent="center" minHeight="56px">
                    <Typography variant="h5">Сколько денег</Typography>
                </Box>
            </AppBar>
            <Box display="flex" alignItems="center" flexDirection="column" pt={10}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Box mb={4} display="flex" alignItems="center" justifyContent="center">
                        <img alt="Jewish" src="/icon-192x192.png" width={168} height={168} />
                    </Box>
                    <Box width="100%" mb={4}>
                        <TextField
                            value={money === '' ? '' : numberFormat.format(+money)}
                            onChange={handleMoneyChange}
                            variant="standard"
                            placeholder="Введите зарплату"
                            fullWidth
                            inputProps={{ inputMode: 'numeric' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CurrencyRubleIcon />
                                    </InputAdornment>)
                            }}
                        />
                    </Box>
                    <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                        <Button type="submit" variant="contained" disabled={!canSubmit} fullWidth>Далее</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default EntryScreen