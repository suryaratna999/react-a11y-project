import { useState } from 'react';
import add from './stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      setError(null);
      const res = add(input);
      setResult(res);
    } catch (e: unknown) {
      setResult(null);
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        color: '#222233',
      }}>
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={600}
        height={400}
        alt="Decorative calculator illustration"
        style={{ maxWidth: '100%', height: 'auto' }}
        aria-hidden={false}
      />

      <h2>String calculator</h2>

      <h1 style={{ fontSize: '20px' }}>Enter numbers</h1>

      <label htmlFor="numbers" style={{ display: 'block', marginBottom: 6 }}>
        Numbers (comma, newline or custom delimiter like //; then newline)
      </label>
      <textarea
        id="numbers"
        style={{ margin: '10px 0', color: '#111', width: '100%', minHeight: 80 }}
        placeholder='Enter numbers'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          // Enter to calculate (Shift+Enter for newline)
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCalculate();
          }
        }}
        aria-describedby="numbers-help"
      />
      <div id="numbers-help" style={{ marginBottom: 8, color: '#444' }}>
        Example: 1,2 or 1\n2 or //;\n1;2
      </div>

      <button
        onClick={handleCalculate}
        style={{
          padding: '10px 14px',
          backgroundColor: '#005f73',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Calculate
      </button>

      <div aria-live="polite" aria-atomic="true" style={{ marginTop: 12 }}>
        {error && (
          <p role="alert" style={{ color: '#b00020' }}>
            {error}
          </p>
        )}

        {result !== null && (
          <p style={{ color: 'green' }}>Result: {result}</p>
        )}
      </div>

      <div role='region' aria-label='instructions' style={{ marginTop: 12 }}>
        <p>Make sure you enter numbers correctly.</p>
      </div>
    </div>
  );
};

export default App;
