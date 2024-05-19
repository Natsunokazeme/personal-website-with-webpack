import React from "react"

import "./FinancePage.scss"

export interface FinancePageProps {
  prop?: string
}

export function FinancePage({prop = "default value"}: FinancePageProps) {
  return <div>FinancePage {prop}</div>
}
