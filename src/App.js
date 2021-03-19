import './App.css';
import D3Container from "./Component/D3Container";
import Chart from "./Component/d3/d3Viz";

function App() {
  return (
    <div className="App" style={{height: "100vh", width: "100vw"}}>
        <div style={{height: "100%", width:"100%", margin: "auto"}} >
          <D3Container id="template" d3Chart={Chart} />
        </div>
    </div>
  );
}

export default App;
