import { useState } from "react";
import Lists from "./components/Lists";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header-container">
        <p className="header">
          <span className="check">check</span>
          <span className="lists">lists</span>
        </p>
      </div>
      <Lists />
    </>
  );
}

export default App;
