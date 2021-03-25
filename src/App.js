import './App.css';
import D3Container from "./Component/D3Container";
import scatterplot from "./Component/d3/d3Viz";
import * as d3 from "d3";
import { useState } from 'react';
import { useRef } from 'react';

const generateRandomMatrix = (n, m, x=1) => {
  var matrix = []
  for (var i=0; i < m; i++){
    var tmp = []
    for (var j=0; j < n; j++){
      var num = Math.random() * x
      if (x > 1){
        num = Math.round(num)
      }
      tmp.push(i === j ? 0 : num)
    }
    matrix.push(tmp)
  } 
  return matrix
}

const App = () => {
  const [data, setData] = useState(generateRandomMatrix(5,5,100))
  const vizRef = useRef();

  return (
    <div className="App" style={{height: "90vh", width: "100vw", paddingTop: "10vh"}}>
        <button onClick={() => setData(generateRandomMatrix(5,5,100))}> Generate Random Data </button>
        <div style={{height: "50%", width:"50%", margin: "auto"}} >
          <D3Container ref={vizRef} id="template" viz={scatterplot} data={data}/>
        </div>
    </div>
  );
}

export default App;
