import React, {useCallback, useEffect, useMemo} from "react"

import "./FinancePage.scss"
import axios from "axios"
import {InputLabel, Select, MenuItem} from "@mui/material"

export interface FinancePageProps {
  prop?: string
}

export function FinancePage({prop = "default value"}: FinancePageProps) {
  const [currencyList, setCurrencyList] = React.useState([
    {
      name: "CHF",
      desc: "瑞士法郎",
    },
    {
      name: "MXN",
      desc: "墨西哥比索",
    },
    {
      name: "SAR",
      desc: "沙特里亚尔",
    },
    {
      name: "ZAR",
      desc: "南非兰特",
    },
    {
      name: "CNY",
      desc: "人民币",
    },
    {
      name: "THB",
      desc: "泰铢",
    },
    {
      name: "AUD",
      desc: "澳元",
    },
    {
      name: "KRW",
      desc: "韩元",
    },
    {
      name: "PLN",
      desc: "波兰兹罗提",
    },
    {
      name: "GBP",
      desc: "英镑",
    },
    {
      name: "HUF",
      desc: "匈牙利福林",
    },
    {
      name: "100JPY",
      desc: "100日元",
    },
    {
      name: "TRY",
      desc: "土耳其里拉",
    },
    {
      name: "RUB",
      desc: "俄罗斯卢布",
    },
    {
      name: "HKD",
      desc: "港币",
    },
    {
      name: "AED",
      desc: "阿联酋迪拉姆",
    },
    {
      name: "EUR",
      desc: "欧元",
    },
    {
      name: "DKK",
      desc: "丹麦克朗",
    },
    {
      name: "USD",
      desc: "美元",
    },
    {
      name: "CAD",
      desc: "加元",
    },
    {
      name: "MYR",
      desc: "林吉特",
    },
    {
      name: "NOK",
      desc: "挪威克朗",
    },
    {
      name: "SGD",
      desc: "新加坡元",
    },
    {
      name: "SEK",
      desc: "瑞典克朗",
    },
    {
      name: "NZD",
      desc: "新西兰元",
    },
  ])
  const [selectedCurrency, setSelectedCurrency] = React.useState("")

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://www.mxnzp.com/api/exchange_rate/configs?app_id=oxlnpwqpqdpjoolc&app_secret=QiawQP7ZV9vN340N3YwbH4v8FL576Xvt"
  //     )
  //     .then((res) => {
  //       console.log(res.data)
  //       setCurrencyList(res.data.data)
  //       setSelectedCurrency(res.data.data[0].name)
  //     })
  // }, [])

  return (
    <div className='finance-page'>
      <div>
        <h1>Currency List</h1>
        <InputLabel id='currency-label'>From Currency</InputLabel>
        <Select
          labelId='currency-label'
          classes={{
            root: "currency-selector-root",
            select: "currency-selector-select",
          }}
          className='currency-selector'
          value={selectedCurrency}
          label='Currency'
          onChange={(e) => setSelectedCurrency(e.target.value as string)}
          MenuProps={{
            MenuListProps: {
              classes: {
                root: "currency-selector-menu-list",
              },
            },
          }}
        >
          {currencyList.map((currency: any) => (
            <MenuItem
              key={currency.name}
              value={currency.name}
              className={`currency-item ${
                currency.name === selectedCurrency
                  ? `selected-currency-item`
                  : ""
              }`}
            >
              {currency.name} {currency.desc}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
