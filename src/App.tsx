import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all.min.js";
import ExpenseGenerator from "./components/ExpenseGenerator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <ExpenseGenerator />
    </div>
  );
}

export default App;
