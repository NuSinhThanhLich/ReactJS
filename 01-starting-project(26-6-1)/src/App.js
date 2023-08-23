import logo from './assets/investment-calculator-logo.png';
import Header from './Components/Header/Header';
import UserInput from './Components/Input/UserInput';
import ResultTable from './Components/ResultTable/ResultTable';
import { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState(null)
  const calculateHandler = (userInput) => {
    setUserInput(userInput)
  };
// state thay doi -) chay lai toan bo function app
const yearlyData = []; // per-year results

  if (userInput) {

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      <Header></Header>
      <UserInput onCalculate={calculateHandler}></UserInput>
      {!userInput && <p style={{textAlign:'center', }}>No investment Calculate yet</p>}
      {userInput && <ResultTable datas={yearlyData} initialInvestment={userInput['current-savings']}></ResultTable>}
    </div>
  );
}

export default App;
