import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>React App</h1>
      <ul>
        {Object.keys(data).map((key) => (
          <li key={key}>
            <strong>{key}</strong>: {data[key]}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
