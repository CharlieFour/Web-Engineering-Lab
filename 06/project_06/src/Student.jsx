import React from "react";

function Student(props) {
  return (
    <div>
      <h2 className="student-name">Student Name: {props.name}</h2>
      <h3 className="student-course">Course: {props.course}</h3>
    </div>
  );
}

export default Student;