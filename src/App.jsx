import { useState } from "react";
import MyLists from "./components/MyLists";
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
      <MyLists />
    </>
  );
}

export default App;
