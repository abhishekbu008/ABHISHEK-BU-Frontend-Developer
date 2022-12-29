function CapsuleContent({ children }) {
  return (
    <div>
      {Object.keys(children).map((c) => (
        <div key={c} className="flex items-center justify-center">
          <h6>{c}</h6>:{"   "}
          <h6>{JSON.stringify(children[c])}</h6>
        </div>
      ))}
    </div>
  );
}

export default CapsuleContent;
