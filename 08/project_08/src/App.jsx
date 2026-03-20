import React, { useState } from "react";
import ToggleMessage from "./components/ToggleMessage";
import MessageBox from "./components/MessageBox";
import Countdown from "./components/CountDown";

function App() {

  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showPropMessage, setShowPropMessage] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="app-container">

      <h1>React Conditional Rendering Lab</h1>

      {/* Task 1 */}
      <h2>Toggle Multiple Messages</h2>

      <button onClick={() => setShowMsg1(!showMsg1)}>
        Toggle Message 1
      </button>

      {showMsg1 && <ToggleMessage text="Hello from Message 1" />}

      <br /><br />

      <button onClick={() => setShowMsg2(!showMsg2)}>
        Toggle Message 2
      </button>

      {showMsg2 && <ToggleMessage text="Hello from Message 2" />}

      <hr />

      {/* Task 3 */}
      <h2>Conditional Rendering with Props</h2>

      <button onClick={() => setShowPropMessage(!showPropMessage)}>
        Toggle Prop Message
      </button>

      <MessageBox
        show={showPropMessage}
        message="This message is passed using props!"
      />

      <hr />

      {/* Task 4 */}
      <h2>Countdown Timer</h2>

      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Stop Timer" : "Start Timer"}
      </button>

      {showTimer && <Countdown />}

    </div>
  );
}

export default App;