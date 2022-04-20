import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    InputAdornment,
    Stack,
    styled,
    TextField,
    Typography
} from "@mui/material";

import {CostsItemId, Money, moneyActions, moneySelectors} from "../../store/money.slice";
import AddMoneyItem from "./components/AddMoneyItem/AddMoneyItem";
import {AccountCircle} from "@mui/icons-material";

const MoneyItemName = styled(TextField)({
    '& .MuiInput-root:before, & .MuiInput-root:after': {
        borderBottom: 'none'
    }
})

const MoneyItems = () => {
    const dispatch = useDispatch()
    const costs = useSelector(moneySelectors.getCosts)

    const handleChangeItemName = ({ id, name }: { id: CostsItemId, name: string }) => {
        dispatch(moneyActions.changeCostsItem({
            id,
            name,
        }))
    }

    const handleChangeItemAmount = ({ id, amount }: { id: CostsItemId, amount: Money }) => {
        if (typeof amount !== 'number') return
        if (amount < 0) return

        dispatch(moneyActions.changeCostsItem({
            id,
            amount,
        }))
    }

    return (
        <Box>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Box>
                    {!costs?.length && <Typography>Еще не добавлено ни одного расхода</Typography>}
                    {!!costs?.length && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {costs.map(cost => (
                                <Box width="100%" key={cost.id}>
                                    <Box width="100%" mb={1}>
                                        <MoneyItemName
                                            onChange={(e) => {
                                                handleChangeItemName({
                                                    id: cost.id,
                                                    name: e.target.value
                                                })
                                            }}
                                            value={cost.name}
                                            variant="standard"
                                            placeholder="Введите название"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                )
                                            }}
                                            size="small"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box width="100%">
                                        <TextField
                                            onChange={(e) => {
                                                handleChangeItemAmount({
                                                    id: cost.id,
                                                    amount: +e.target.value.replace(/[^0-9]/g, '')
                                                })
                                            }}
                                            value={cost.amount}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Box>
                <Box>
                    <AddMoneyItem />
                </Box>
            </Stack>
        </Box>
    )
}

export default MoneyItems