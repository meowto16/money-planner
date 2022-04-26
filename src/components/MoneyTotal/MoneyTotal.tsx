import React from 'react'
import {Alert} from "@mui/material";
import {useSelector} from "react-redux";

import {moneySelectors} from "../../store/money.slice";
import numberFormat from '../../utils/numberFormat';

const MoneyTotal = () => {
    const totalMoneyCalculated = useSelector(moneySelectors.getTotalMoneyCalculated)

    return (
        <Alert severity={totalMoneyCalculated < 0 ? 'error' : 'info'} icon={false}>
            Остается денег: {typeof totalMoneyCalculated === 'number'
            ? `${numberFormat.format(totalMoneyCalculated)} руб.`
            : 'Не указано'}
        </Alert>
    )
}

export default MoneyTotal