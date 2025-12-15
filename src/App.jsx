import React, { useEffect, useMemo, useReducer, useRef, useState, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { useFilteredList } from './hooks/useFilteredList.js';

const conceptCatalog = [
  { title: 'Declarative UI', detail: 'Describe the UI for each state and let React update the DOM.' },
  { title: 'JSX', detail: 'Write components using XML-like syntax that compiles to JavaScript.' },
  { title: 'Components', detail: 'Break experiences into reusable pieces that accept props.' },
  { title: 'Hooks', detail: 'Add stateful logic to function components without classes.' },
  { title: 'Context', detail: 'Share data like themes or auth through the component tree.' },
  { title: 'Effects', detail: 'Synchronize components with external systems and the browser.' },
];

function Header() {
  return (
    <header>
      <span className="hero-tag">React Feature Showcase</span>
      <h1 className="hero-title">A guided tour of everyday React patterns</h1>
      <p className="hero-subtitle">
        This single-page playground introduces the most important concepts in React using concise,
        well-documented examples. Play with the UI, read the inline notes, and use this as a
        starter template for your own explorations.
      </p>
    </header>
  );
}

function StateCard() {
  const [count, setCount] = useState(1);
  const [step, setStep] = useState(1);

  return (
    <div className="section">
      <div className="badge">State &amp; props</div>
      <h2>Update local state with setState</h2>
      <p>
        Components can own state. Here we store a <code className="inline">count</code> value and a
        <code className="inline">step</code> value, then update them with the setters returned by{' '}
        <code className="inline">useState</code>.
      </p>
      <div className="card">
        <div className="row">
          <label htmlFor="step">Step:</label>
          <select
            id="step"
            className="input"
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          >
            {[1, 2, 5].map((value) => (
              <option key={value} value={value}>
                +{value}
              </option>
            ))}
          </select>
          <button className="button" onClick={() => setCount((prev) => prev + step)}>
            Add step
          </button>
        </div>
        <p>
          Current count: <span className="highlight">{count}</span>
        </p>
      </div>
    </div>
  );
}

function EffectCard() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuote('Effects run after render to synchronize with the outside world.');
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="section">
      <div className="badge">Effects</div>
      <h2>Run side effects after rendering</h2>
      <p>
        Use <code className="inline">useEffect</code> for work that happens outside the render cycle:
        timers, subscriptions, or DOM measurements. Cleanup functions prevent memory leaks.
      </p>
      <div className="card">
        <p>{loading ? 'Loading example quote…' : quote}</p>
        <p className="chip">Cleanup: clearTimeout(timer)</p>
      </div>
    </div>
  );
}

function ThemeSection() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="section">
      <div className="badge">Context</div>
      <h2>Share data without prop drilling</h2>
      <p>
        The theme value lives in a context provider at the root. Any component can read or update it
        with <code className="inline">useContext</code>, avoiding long prop chains.
      </p>
      <div className={`theme-card ${mode === 'dark' ? 'dark' : ''}`}>
        <p>
          Current mode: <span className="highlight">{mode}</span>
        </p>
        <button className="button" onClick={toggleMode}>
          Toggle theme
        </button>
      </div>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'remove':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function ReducerCard() {
  const [items, dispatch] = useReducer(reducer, [
    { id: 1, text: 'Reducers centralize state changes' },
    { id: 2, text: 'Actions describe what happened' },
  ]);
  const [text, setText] = useState('');

  const addItem = () => {
    if (text.trim()) {
      dispatch({ type: 'add', payload: text.trim() });
      setText('');
    }
  };

  return (
    <div className="section">
      <div className="badge">useReducer</div>
      <h2>Manage complex updates predictably</h2>
      <p>
        <code className="inline">useReducer</code> shines when updates depend on the previous state or
        when actions come from many places.
      </p>
      <div className="card">
        <div className="row">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Add reducer fact"
            className="input"
          />
          <button className="button" onClick={addItem}>
            Add
          </button>
        </div>
        <ul className="stack" style={{ paddingLeft: 16, margin: 0 }}>
          {items.map((item) => (
            <li key={item.id} className="row" style={{ justifyContent: 'space-between' }}>
              <span>{item.text}</span>
              <button className="button" onClick={() => dispatch({ type: 'remove', payload: item.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const MemoChild = React.memo(function MemoChild({ onHighlight }) {
  useEffect(() => {
    onHighlight('Memoized child rendered');
  }, [onHighlight]);

  return <p className="chip">Memoized child: only re-renders when props change</p>;
});

function MemoCard() {
  const [numbers] = useState([5, 10, 15, 20]);
  const [message, setMessage] = useState('');

  const total = useMemo(() => numbers.reduce((sum, value) => sum + value, 0), [numbers]);

  const handleHighlight = useCallback((text) => setMessage(text), []);

  return (
    <div className="section">
      <div className="badge">Memoization</div>
      <h2>Optimize expensive calculations</h2>
      <p>
        <code className="inline">useMemo</code> caches derived values and <code className="inline">useCallback</code>
        ensures stable function props so memoized children skip re-renders.
      </p>
      <div className="card">
        <p>Numbers: {numbers.join(', ')}</p>
        <p>Total with useMemo: <span className="highlight">{total}</span></p>
        <MemoChild onHighlight={handleHighlight} />
        {message && <p className="chip">{message}</p>}
      </div>
    </div>
  );
}

function RefCard() {
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="section">
      <div className="badge">Refs</div>
      <h2>Access DOM nodes directly</h2>
      <p>
        Refs let you read or modify DOM nodes without triggering re-renders. They are perfect for
        managing focus or integrating with non-React libraries.
      </p>
      <div className="card">
        <input ref={inputRef} className="input" placeholder="Click the button to focus me" />
        <button className="button" onClick={focusInput}>
          Focus input
        </button>
      </div>
    </div>
  );
}

function FormCard() {
  const [name, setName] = useState('React learner');
  const [level, setLevel] = useState('Intermediate');

  return (
    <div className="section">
      <div className="badge">Forms</div>
      <h2>Controlled inputs keep values in sync</h2>
      <p>
        Controlled components mirror input state in React, enabling validation, instant previews, and
        accessible form behaviors.
      </p>
      <div className="card">
        <div className="row">
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} />
          <select className="input" value={level} onChange={(event) => setLevel(event.target.value)}>
            {['Beginner', 'Intermediate', 'Advanced'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <p className="chip">
          Preview: {name} · {level}
        </p>
      </div>
    </div>
  );
}

function CatalogCard() {
  const getTitle = useCallback((concept) => concept.title, []);
  const { query, setQuery, filtered } = useFilteredList(conceptCatalog, getTitle);

  return (
    <div className="section">
      <div className="badge">Lists &amp; rendering</div>
      <h2>Map arrays to components</h2>
      <p>
        React efficiently renders lists using keys. A tiny custom hook filters the catalog as you
        type to show how composition keeps logic reusable.
      </p>
      <div className="card">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search concepts"
          className="input"
        />
        <div className="stack">
          {filtered.map((concept) => (
            <div key={concept.title} className="card">
              <h3>{concept.title}</h3>
              <p>{concept.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentationCard() {
  return (
    <div className="section">
      <div className="badge">Documentation</div>
      <h2>What to explore next</h2>
      <p>
        Check the accompanying <code className="inline">DOCS.md</code> file for a deeper look at each
        feature, including when to choose one hook over another and how to combine them in real
        projects.
      </p>
      <p className="chip">Tip: open DOCS.md alongside this UI for a guided tour.</p>
    </div>
  );
}

function Footer() {
  return <p className="footer">Built with React 18, Vite, and a sprinkle of gradient flair.</p>;
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <Header />
        <div className="grid">
          <StateCard />
          <EffectCard />
          <ThemeSection />
          <ReducerCard />
          <MemoCard />
          <RefCard />
          <FormCard />
          <CatalogCard />
          <DocumentationCard />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
