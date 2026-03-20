import { useState } from "react";
import Teacher from "./components/Teacher";
import ClickTracker from "./components/ClickTracker";
import ResetCounter from "./components/ResetCounter";
import DecreaseCounter from "./components/DecreaseCounter";

function App() {
  // increase counter
  const increaseCount = () => {
    setCount(count + 1);
  };

  // reset counter
  const resetCount = () => {
    setCount(0);
  };

  // decrease counter
  const decreaseCount = () => {
    setCount(count - 1);
  };

  // example: child sending parameter
  const receiveMessage = (msg) => {
    alert("Message from Child: " + msg);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Components Lab</h1>

      {/* Task 1 */}
      <Teacher name="Dr. Ahmed" subject="Web Engineering" />

      {/* Task 2 */}
      <ClickTracker />

      {/* Task 3 & 4 */}
      <div
        style={{ border: "1px solid white", padding: "10px", margin: "10px" }}
      >
        <h3>Parent Counter</h3>

        <p>Count: {count}</p>

        <button onClick={increaseCount}>Increase</button>
        <DecreaseCounter decreaseCount={decreaseCount} />
        <ResetCounter resetCount={resetCount} />
      </div>

      {/* Task 5 */}
      <div
        style={{ border: "1px solid white", padding: "10px", margin: "10px" }}
      >
        <h3>Passing Parameter From Child to Parent</h3>

        <button onClick={() => receiveMessage("Hello Parent Component!")}>
          Send Message to Parent
        </button>
      </div>
    </div>
  );
}

export default App;
