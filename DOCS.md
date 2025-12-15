# React Feature Showcase — Detailed Notes

This document pairs with the UI to explain how each example demonstrates a core React concept. Use it
as a checklist when learning React or teaching others.

## State & props (StateCard)
- **What it shows:** Local component state managed by `useState` and prop-driven controls.
- **Why it matters:** State lets components respond to user input and stay interactive. Props flow
  down so parents can configure reusable children.
- **Key patterns:**
  - Initialize state: `const [count, setCount] = useState(1)`.
  - Update with the functional form to avoid stale values: `setCount(prev => prev + step)`.
  - Read props to drive UI variations (e.g., step options could be passed from a parent).

## Effects (EffectCard)
- **What it shows:** `useEffect` for synchronizing with external systems and returning a cleanup
  function.
- **Why it matters:** Effects run after render, making them ideal for timers, fetching, subscriptions,
  or DOM queries.
- **Key patterns:**
  - Empty dependency array (`[]`) means “run once after mount.”
  - Cleanup (`return () => clearTimeout(timer)`) prevents leaks when components unmount.

## Context (ThemeSection)
- **What it shows:** A theme value stored in a React context with a provider and a custom `useTheme`
  hook for ergonomics.
- **Why it matters:** Context removes the need for prop drilling when many components need shared
  state like themes, authentication, or localization.
- **Key patterns:**
  - Create the context once with `createContext()`.
  - Provide values high in the tree and read them anywhere with `useContext`.
  - Memoize the provided value (`useMemo`) so consumers only re-render when data changes.

## Reducers (ReducerCard)
- **What it shows:** Centralized updates with `useReducer` and plain action objects.
- **Why it matters:** Reducers make state transitions predictable and testable—helpful when multiple
  events update the same data.
- **Key patterns:**
  - Pure reducer functions that return new state without side effects.
  - Action objects that describe _what happened_, not _how to mutate_.
  - Co-locating UI event handlers with dispatch calls keeps views expressive.

## Memoization (MemoCard)
- **What it shows:**
  - `useMemo` caches derived values (a computed total).
  - `useCallback` keeps handler identities stable for memoized children.
  - `React.memo` prevents re-renders when props are unchanged.
- **Why it matters:** Memoization avoids unnecessary work and re-renders, improving perceived
  performance in larger apps.
- **Key patterns:**
  - Keep dependency arrays accurate so caches stay valid.
  - Memoize only when a computation or rerender is actually expensive.

## Refs (RefCard)
- **What it shows:** Using `useRef` to imperatively focus an input without re-rendering.
- **Why it matters:** Refs are perfect for integrating with the DOM or third-party libraries where
  React state isn’t necessary.
- **Key patterns:**
  - Access DOM nodes with `ref` callbacks or objects (e.g., `inputRef.current`).
  - Avoid reading from refs in render to keep output predictable.

## Forms (FormCard)
- **What it shows:** Controlled inputs for text and select elements.
- **Why it matters:** Controlled components mirror form state in React, enabling real-time validation
  and previews.
- **Key patterns:**
  - Bind `value` and `onChange` to state.
  - Derive live previews directly from the same state.

## Lists & custom hooks (CatalogCard)
- **What it shows:** Mapping arrays to components with keys and a composable `useFilteredList` custom
  hook that encapsulates search logic.
- **Why it matters:** Lists are everywhere. Custom hooks package reusable behavior so components stay
  focused on rendering.
- **Key patterns:**
  - Stable keys (e.g., IDs or titles) to help React track elements.
  - Hooks return data plus setters, mirroring the API of built-ins like `useState`.

## Documentation prompt (DocumentationCard)
- **What it shows:** A pointer to this file so learners have both visuals and text reference.
- **Why it matters:** Pairing code with docs makes the example more approachable for beginners.

## Suggested next steps
- Add routing with React Router to demonstrate navigation.
- Fetch real data with `useEffect` and `fetch` plus loading and error states.
- Introduce suspense boundaries or error boundaries for resilient UIs.
- Port one of the cards to a custom component file to explore prop drilling vs. context.
