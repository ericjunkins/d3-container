import './App.css';
import D3Container from "./Component/D3Container";
import Chart from "./Component/d3/d3Viz";
import * as d3 from "d3";
import { useState } from 'react';


const generateRandomData = (n, type) => {

  var dataset = d3.range(n).map(function(d, i){
    let val;
    if (type === 'exponential'){
      val = d3.randomExponential(1)()
    } else if ( type === 'random'){
      val = d3.randomUniform()()
    } else if (type === 'log'){
      val = d3.randomLogNormal()()
    } else if (type ==='normal'){
      val = d3.randomNormal()()
    }
    return {x: i, y: val }
  })
  return dataset
}



const App = () => {
  const [func, setFunc] = useState('normal');
  const [data, setData] = useState(generateRandomData(100, func))

  const changeDropdown = (e) => {
    setFunc(e.target.value)
    setData(generateRandomData(100, e.target.value))
  }

  return (
    <div className="App" style={{height: "90vh", width: "100vw", paddingTop: "10vh"}}>
        <select name="dist" id="dist" onChange={(e)=> changeDropdown(e)} value={func}>
          <option value="normal">Normal</option>
          <option value="random">Random</option>
          <option value="exponential">Exponential</option>
          <option value="log">Log Normal</option>
        </select>
        <div style={{height: "50%", width:"50%", margin: "auto"}} >
          <D3Container id="template" d3Chart={Chart} data={data}/>
        </div>
    </div>
  );
}

export default App;
