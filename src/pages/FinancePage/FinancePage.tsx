import React, {useCallback, useEffect, useMemo} from "react"

import "./FinancePage.scss"
import axios from "axios"
import {InputLabel, Select, MenuItem, Input} from "@mui/material"

export interface FinancePageProps {
  prop?: string
}

interface ExchangeRate {
  currencyCode: string
  currencyName: string
  exchangeRateFromCNY: number
}

interface RawExchangeRate {
  name: string
  nameDesc: string
  from: string
  to: string
  price: string
}

interface Currency {
  name: string
  desc: string
}

const tempCurrencyList: Currency[] = [
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
]

const getFixedPointNumber = (num: number, point: number) =>
  Number(num.toFixed(point))

export function FinancePage({prop = "default value"}: FinancePageProps) {
  const [currencyList, setCurrencyList] = React.useState<ExchangeRate[]>([])
  const [selectedCurrency, setSelectedCurrency] = React.useState({
    from: "CNY",
    fromPrice: 0,
    to: "",
    toPrice: 0,
  })

  useEffect(() => {
    // axios
    //   .get(
    //     "https://www.mxnzp.com/api/exchange_rate/configs?app_id=oxlnpwqpqdpjoolc&app_secret=QiawQP7ZV9vN340N3YwbH4v8FL576Xvt"
    //   )
    //   .then((res) => {
    //     console.log(res.data.data)
    //     const tempCurrencyList: Currency[] = res.data.data
    axios
      .get(
        "https://www.mxnzp.com/api/exchange_rate/list?app_id=oxlnpwqpqdpjoolc&app_secret=QiawQP7ZV9vN340N3YwbH4v8FL576Xvt"
      )
      .then((res) => {
        // console.log(res.data)
        const mappedForCNY: ExchangeRate[] = res.data.data.map(
          (item: RawExchangeRate) => {
            const targetCode = item.from === "CNY" ? item.to : item.from
            return {
              currencyCode: targetCode,
              currencyName:
                tempCurrencyList.find(
                  (currency) => currency.name === targetCode
                )?.desc ?? "",
              exchangeRateFromCNY:
                item.from === "CNY"
                  ? getFixedPointNumber(Number(item.price), 4)
                  : getFixedPointNumber(1 / Number(item.price), 4),
            }
          }
        )
        mappedForCNY.unshift({
          currencyCode: "CNY",
          currencyName: "人民币",
          exchangeRateFromCNY: 1,
        })
        // console.log("1", mappedForCNY)
        setCurrencyList(mappedForCNY)
        // setCurrencyList(res.data.data)
        // setSelectedCurrency(res.data.data[0].name)
      })
    // })
  }, [])

  return (
    <div className='finance-page'>
      {/* todo make more clean code later */}
      <div>
        <h1 className='text-center'>Currency List</h1>
        <div className='currency-wrapper'>
          <InputLabel className='currency-label'>From Currency</InputLabel>
          <Input
            classes={{
              root: "currency-input-root",
              input: "currency-input",
            }}
            disabled={!selectedCurrency.from}
            type='number'
            value={selectedCurrency.fromPrice}
            onChange={(e) => {
              const exchangeRateFromCNY = currencyList.find(
                (currency) => currency.currencyCode === selectedCurrency.to
              )?.exchangeRateFromCNY
              setSelectedCurrency((prev) => ({
                ...prev,
                fromPrice: Number(e.target.value),
                toPrice: getFixedPointNumber(
                  Number(e.target.value) * (exchangeRateFromCNY ?? 0),
                  4
                ),
              }))
            }}
          ></Input>
          <Select
            disabled
            classes={{
              root: "currency-selector-root",
              select: "currency-selector-select",
            }}
            className='currency-selector'
            value={selectedCurrency.from}
            label='Currency'
            onChange={(e) =>
              setSelectedCurrency((prev) => ({...prev, from: e.target.value}))
            }
            MenuProps={{
              MenuListProps: {
                classes: {
                  root: "currency-selector-menu-list",
                },
              },
            }}
          >
            {currencyList.map((currency: ExchangeRate) => (
              <MenuItem
                key={currency.currencyCode}
                value={currency.currencyCode}
                className={`currency-item ${
                  currency.currencyCode === selectedCurrency.from
                    ? `selected-currency-item`
                    : ""
                }`}
              >
                {currency.currencyCode} {currency.currencyName}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className='currency-wrapper mt-5'>
          <InputLabel className='currency-label'>To Currency</InputLabel>
          <Input
            classes={{
              root: "currency-input-root",
              input: "currency-input",
            }}
            disabled={!selectedCurrency.to}
            type='number'
            value={selectedCurrency.toPrice}
            onChange={(e) => {
              const exchangeRateFromCNY = currencyList.find(
                (currency) => currency.currencyCode === selectedCurrency.to
              )?.exchangeRateFromCNY

              setSelectedCurrency((prev) => ({
                ...prev,
                toPrice: Number(e.target.value),
                fromPrice: getFixedPointNumber(
                  Number(e.target.value) / (exchangeRateFromCNY ?? 0),
                  4
                ),
              }))
            }}
          ></Input>
          <Select
            classes={{
              root: "currency-selector-root",
              select: "currency-selector-select",
            }}
            className='currency-selector'
            value={selectedCurrency.to}
            label='Currency'
            onChange={(e) => {
              const exchangeRateFromCNY = currencyList.find(
                (currency) => currency.currencyCode === e.target.value
              )?.exchangeRateFromCNY
              setSelectedCurrency((prev) => ({
                ...prev,
                to: e.target.value,
                fromPrice: getFixedPointNumber(
                  prev.toPrice / (exchangeRateFromCNY ?? 0),
                  4
                ),
              }))
            }}
            MenuProps={{
              MenuListProps: {
                classes: {
                  root: "currency-selector-menu-list",
                },
              },
            }}
          >
            {currencyList.map((currency: ExchangeRate) => (
              <MenuItem
                key={currency.currencyCode}
                value={currency.currencyCode}
                className={`currency-item ${
                  currency.currencyCode === selectedCurrency.to
                    ? `selected-currency-item`
                    : ""
                }`}
              >
                {currency.currencyCode} {currency.currencyName}
              </MenuItem>
            ))}
          </Select>
        </div>
        <h3 className='text-center pt-5'>
          Exchange Rate: 1 {selectedCurrency.from} ={" "}
          {
            currencyList.find(
              (currency) => currency.currencyCode === selectedCurrency.to
            )?.exchangeRateFromCNY
          }{" "}
          {selectedCurrency.to}
        </h3>
      </div>
    </div>
  )
}
