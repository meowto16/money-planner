import React, {useState, useCallback} from 'react'
import {useDispatch} from "react-redux";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import { moneyActions } from '../../store/money.slice'


const MAX_INPUT_LENGTH = 12

const EntryScreen: React.FC = () => {
    const [money, setMoney] = useState<string>('')
    const dispatch = useDispatch()

    const canSubmit = !!money

    const handleMoneyChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value
        if (value.length >= MAX_INPUT_LENGTH) return
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
        <Box display="flex" alignItems="center" flexDirection="column" pt={10}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Box mb={4} display="flex" alignItems="center" justifyContent="center">
                    <img alt="Jewish" src="/icon-192x192.png" width={168} height={168} />
                </Box>
                <Box mb={4}>
                    <Typography variant="h4" component="h1">Сколько денег</Typography>
                </Box>
                <Box width="100%" mb={4}>
                    <TextField
                        value={money}
                        onChange={handleMoneyChange}
                        variant="standard"
                        placeholder="Введите число"
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
    )
}

export default EntryScreen