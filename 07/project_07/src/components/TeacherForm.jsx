import { useState } from "react";

function TeacherForm({ updateTeacher }) {

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = () => {
    updateTeacher(name, subject);
  };

  return (
    <div>
      <h3>Update Teacher</h3>

      <input
        type="text"
        placeholder="Enter Teacher Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Update Teacher</button>
    </div>
  );
}

export default TeacherForm;