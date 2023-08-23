import React, {useState, useCallback} from 'react';
import Button from './components/UI/Button/Button'
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  console.log('app running')
  const [para, setPara] = useState(false)
  const [toggle, setToggle] = useState(false)
  const paraHandler=useCallback(() => {
    if (toggle) {
      setPara((prevPara) => (!prevPara))
    }
  }, [toggle])

  const toggleHandler = () => {
    setToggle(true)
  }
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={para}></DemoOutput>
      <Button onClick={toggleHandler}>Click</Button>
      <Button onClick={paraHandler}>Click me</Button>
    </div>
  );
}

export default App;
