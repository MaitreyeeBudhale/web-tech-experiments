import { useState } from 'react';

const CounterApp=()=> {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }

        .container {
          max-width: 400px;
          margin: 50px auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .display {
          text-align: center;
          font-size: 48px;
          font-weight: bold;
          margin: 30px 0;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 5px;
        }

        button {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          font-size: 16px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }

        .btn-increment {
          background-color: #4CAF50;
          color: white;
        }

        .btn-decrement {
          background-color: #f44336;
          color: white;
        }

        .btn-reset {
          background-color: #2196F3;
          color: white;
        }

        button:hover {
          opacity: 0.8;
        }
      `}</style>

      <div className="container">
        <h1>Counter App</h1>
        
        <div className="display">{count}</div>

        <button onClick={increment} className="btn-increment">
          Increment
        </button>

        <button onClick={decrement} className="btn-decrement">
          Decrement
        </button>

        <button onClick={reset} className="btn-reset">
          Reset
        </button>
      </div>
    </>
  );
}
export default CounterApp