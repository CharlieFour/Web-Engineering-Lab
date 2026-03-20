import { useState } from "react";

function ClickTracker() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{border:"1px solid white", padding:"10px", margin:"10px"}}>
      <h3>Click Tracker</h3>
      <p>Total Clicks: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>Click Me</button>
    </div>
  );
}

export default ClickTracker;