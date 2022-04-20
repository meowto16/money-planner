import React from 'react'
import {useSelector} from "react-redux";

import { moneySelectors } from './store/money.slice'

import EntryScreen from "./screens/EntryScreen/EntryScreen";
import CalculateScreen from "./screens/CalculateScreen/CalculateScreen";

const { getTotalMoney } = moneySelectors

const App: React.FC = () => {
    const money = useSelector(getTotalMoney)

    return money === null ? <EntryScreen /> : <CalculateScreen />
}

export default App