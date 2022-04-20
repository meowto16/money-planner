import React from 'react'
import {useDispatch} from "react-redux";

import { moneyActions } from "../../store/money.slice";

import {Box, Button, Container, Stack, Typography} from "@mui/material";
import MoneyTotal from "../../components/MoneyTotal/MoneyTotal";
import MoneyItems from "../../components/MoneyItems/MoneyItems";

const CalculateScreen = () => {
    const dispatch = useDispatch()

    const handleResetTotalMoney: React.MouseEventHandler = () => {
        dispatch(moneyActions.resetToInitialState())
    }

    return (
        <Container>
            <Stack sx={{ width: '100%' }} py={3} spacing={4}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="h1">Расчет денег</Typography>
                    <Button onClick={handleResetTotalMoney} variant="contained" size="small">Сбросить</Button>
                </Box>
                <Box>
                    <MoneyTotal />
                </Box>
                <Box>
                    <MoneyItems />
                </Box>
            </Stack>
        </Container>
    )
}

export default CalculateScreen