import React from "react";
import classes from './ResultTable.module.css'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})


const ResultTable = (props) => {
    return (
        <table className={classes.result}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {props.datas.map((data) => {
            return (
              <tr key={data.year}>
                <td>{data.year}</td>
                <td>{formatter.format(data.savingsEndOfYear)}</td>
                <td>{formatter.format(data.yearlyInterest)}</td>
                <td>{formatter.format(data.savingsEndOfYear - props.initialInvestment - data.yearlyContribution * data.year)}</td>
                <td>{formatter.format(props.initialInvestment + data.yearlyContribution * data.year)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
}

export default ResultTable