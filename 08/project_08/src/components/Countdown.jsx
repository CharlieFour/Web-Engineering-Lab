import React, { useState, useEffect } from "react";

const Countdown = () => {

  const [count, setCount] = useState(3);

  useEffect(() => {

    console.log("Countdown Mounted");

    const timer = setInterval(() => {

      setCount(prev => {

        if (prev === 0) {
          clearInterval(timer);   // stop timer
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("Countdown Unmounted");
    };

  }, []);

  return (
    <div className="countdown">
        <h2>Countdown: {count}</h2>
    </div>
  );    
};

export default Countdown;
