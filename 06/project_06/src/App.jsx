import React from "react";
import Student from "./Student";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="title">Student Information</h1>

      <Student name="Abdul Rafay" course="Web Engineering" />
      <Student name="Ali Khan" course="Computer Networks" />
      <Student name="Sara Ahmed" course="Artificial Intelligence" />

    </div>
  );
}

export default App;