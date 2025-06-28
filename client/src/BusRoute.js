import React, { useState } from 'react';

function BusRoute() {
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [result, setResult] = useState('');

  const handleRunCpp = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/run-cpp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, dest }),
    });
    const data = await res.json();
    if (data.success) {
      setResult(data.output);
    } else {
      setResult('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h2>Find Shortest Bus Route</h2>
      <form onSubmit={handleRunCpp}>
        <input
          value={source}
          onChange={e => setSource(e.target.value)}
          placeholder="Source station number (0-23)"
          required
        />
        <input
          value={dest}
          onChange={e => setDest(e.target.value)}
          placeholder="Destination station number (0-23)"
          required
        />
        <button type="submit">Find Route</button>
      </form>
      <pre>{result}</pre>
    </div>
  );
}

export default BusRoute;
