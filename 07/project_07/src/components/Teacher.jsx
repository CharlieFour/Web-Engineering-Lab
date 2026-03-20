function Teacher({ name, subject }) {
  return (
    <div style={{border:"1px solid white", padding:"10px", margin:"10px"}}>
      <h3>Teacher Information</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Subject:</strong> {subject}</p>
    </div>
  )
}

export default Teacher