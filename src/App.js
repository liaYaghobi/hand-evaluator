
import {React, useState} from 'react';
import HandEvaluator from './Components/HandEvaluator';
import TitleBar from './Components/TitleBar';
import './App.css'

function App() {

  const[start, setStart] = useState(false);

  
  const handleStart = () => {
    setStart(true);
  };

  return(
  <div className = "outterContainer">
    <TitleBar/>
    {start? <HandEvaluator/> : <button id = "startButton" onClick={handleStart}>START</button>}
  </div>
  );
}

export default App;