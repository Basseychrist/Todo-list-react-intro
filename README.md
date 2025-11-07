# React + Vite — Todo List (Learning Guide)

A minimal React + Vite Todo application designed to teach component structure, state management, and UI patterns. This guide explains how the app works and how to extend it safely.

---

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the dev server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   - Vite will print a local URL (usually `http://localhost:5173`)
   - The app uses Vite's Hot Module Replacement (HMR) for instant updates during development

---

## High-Level Architecture

The app follows a **top-down data flow** pattern:

```
index.jsx (mounts the app)
    ↓
App.jsx (manages state & handlers)
    ↓
TodoItem.jsx (renders individual todos)

styles.css (applies global & component styles)
```

### Core Principles

- **Single source of truth:** todos are stored in one place (App.jsx state)
- **Unidirectional data flow:** parent passes props & callbacks; children call them on events
- **Separation of concerns:** UI rendering (TodoItem) is separate from state management (App)
- **Immutability:** state updates create new arrays/objects instead of mutating

---

## File-by-File Explanation

### `index.jsx`
**Purpose:** Mount the React app into the DOM.

- Imports global CSS and the root App component
- Typically minimal — use it to add providers (Context, Router, etc.) as the app grows
- Keep side effects out of this file

### `App.jsx`
**Purpose:** Stateful container that holds todos and provides handlers.

**Key responsibilities:**
- Store the todos array in state
- Provide three handler functions: `addTodo`, `toggleTodo`, `deleteTodo`
- Render a form to add todos and a list of TodoItem components

**State & Handlers (code patterns):**
```javascript
// State
const [todos, setTodos] = useState([]);

// Add: create a new todo with a unique id
function addTodo(title) {
  setTodos(prev => [...prev, { id: Date.now(), title, completed: false }]);
}

// Toggle: find the todo by id and flip its completed status
function toggleTodo(id, checked) {
  setTodos(prev => 
    prev.map(t => t.id === id ? { ...t, completed: checked } : t)
  );
}

// Delete: remove the todo by id
function deleteTodo(id) {
  setTodos(prev => prev.filter(t => t.id !== id));
}
```

**Best practices:**
- Use functional updates (`setState(prev => ...)`) when new state depends on old state
- Always create new arrays/objects; never mutate state directly
- Use stable, unique ids for list keys (avoid array index)

### `TodoItem.jsx`
**Purpose:** Presentational component that renders a single todo item.

**Props contract:**
- `id` — unique identifier
- `title` — text to display
- `completed` — boolean completion status
- `toggleTodo` — callback function to toggle completion
- `deleteTodo` — callback function to delete

**Key behaviors:**
- Checkbox is **controlled** by the `completed` prop
- Checkbox calls `toggleTodo(id, checked)` when toggled
- Delete button calls `deleteTodo(id)` when clicked
- CSS class `"completed"` is applied for styling when `completed` is true
- Uses `PropTypes` to document prop shapes and warn about mismatches

**Accessibility features:**
- `aria-label` on checkbox provides screen-reader name
- `aria-label` on delete button explains its purpose
- `title` attributes provide tooltips on hover

### `styles.css`
**Purpose:** Global and component styling.

**Structure:**
- CSS variables (`--accent`, `--danger`, etc.) for consistent theming
- `.app` container provides centered layout and spacing
- `.todo-list` and `.todo-item` control todo list layout
- `.completed .todo-title` styles completed todos (line-through, muted color)
- Responsive design with media queries for small screens

**Tips for learners:**
- Modify CSS variables to theme the entire app
- Completed state styles live in `.completed .todo-title` — try changing the opacity or text-decoration
- The form uses flexbox for alignment; inspect the `.form-row` class to understand layout

---

## State & Data Flow (with Examples)

### Adding a Todo

1. User types a title into the form input
2. User clicks "Add" button
3. Form submission calls `addTodo(title)`
4. `addTodo` updates state: `setTodos(prev => [...prev, { id: Date.now(), title, completed: false }])`
5. React re-renders App with the new todo in the list
6. Input field is cleared (if App resets the input state)

### Toggling a Todo

1. User clicks the checkbox in a TodoItem
2. Checkbox's `onChange` calls `toggleTodo(id, e.target.checked)`
3. `toggleTodo` finds the todo by id and flips `completed`
4. React re-renders; TodoItem receives updated `completed` prop
5. Checkbox now shows the new state, and CSS applies `.completed` styling

### Deleting a Todo

1. User clicks "Delete" button in TodoItem
2. Button's `onClick` calls `deleteTodo(id)`
3. `deleteTodo` filters out the todo by id
4. React re-renders; TodoItem is removed from the DOM

---

## Styling & Visual Design

**Design goals:**
- Centered, card-based layout with soft shadows
- Clear visual distinction for completed todos
- Responsive on mobile (inputs stack vertically)
- Accessible color contrast and readable typography

**Key CSS classes:**
- `.app` — main container, max-width 720px, centered
- `.form-row` — flexbox for input + add button
- `.todo-list` — list container, flex column with gaps
- `.todo-item` — individual todo row with flexbox
- `.completed` — modifier class applied when todo is complete
- `.btn`, `.btn-danger` — button styles

---

## Accessibility Considerations

**Semantic HTML:**
- Uses `<form>`, `<input>`, `<button>`, `<ul>`, `<li>` tags
- Avoid `<div>` where semantic elements fit better

**Screen reader support:**
- Checkboxes have `aria-label` to describe their purpose
- Buttons have `aria-label` to explain their function
- `title` attributes provide tooltips and hover hints

**Keyboard operability:**
- All interactive elements (input, checkbox, button) are natively keyboard-focusable
- Tab through controls in logical order

**Optional enhancements:**
- Add `role="status"` live region to announce todo additions/removals
- Ensure color contrast meets WCAG AA standards (check with tools like WebAIM Contrast Checker)

---

## Testing & Debugging

### Manual Testing
- Add a todo and verify it appears in the list
- Toggle a todo and check that the completed style (line-through) applies
- Delete a todo and confirm it's removed from the list
- Test on small screens to check responsive behavior

### React DevTools
- Install the React DevTools browser extension
- Inspect component hierarchy, props, and state
- Use the Profiler to check re-render performance

### Logging & Debugging
- Temporarily add `console.log(todos)` in handlers to verify immutability
- Check that handlers receive correct ids and values
- Use browser DevTools to inspect the DOM and CSS

### Common bugs & solutions
- **Checkbox doesn't reflect state:** ensure `checked={completed}` is passed and `toggleTodo` updates state
- **New todo doesn't appear:** verify `addTodo` is adding to a new array, not mutating the old one
- **Delete doesn't work:** check that `deleteTodo` filters correctly by id
- **Styling doesn't apply:** ensure the CSS class name matches (e.g., `"completed"` is applied when `completed === true`)

---

## Suggested Exercises for Learners

### Easy
1. **Edit a todo title:** Add an edit button that toggles an input field for renaming
2. **Add a timestamp:** Store `createdAt` for each todo and display it

### Medium
3. **Persist to localStorage:** Use `useEffect` to save todos when they change and load on app start
4. **Add filters:** Create "All", "Active", and "Completed" tabs to filter the list
5. **Clear completed:** Add a button to delete all completed todos at once

### Hard
6. **Convert to TypeScript:** Add strict typings for todos, props, and handlers
7. **Add unit tests:** Use Jest + React Testing Library to test TodoItem and App handlers
8. **Animations:** Add CSS transitions when items are added/removed
9. **Drag & drop:** Allow users to reorder todos by dragging

---

## Common Pitfalls & Best Practices

### ❌ Don't
- Mutate state directly: `todos.push({...})` ← breaks React
- Use array index as key: `todos.map((t, i) => <TodoItem key={i} />)` ← causes issues when list changes
- Store todos in multiple places: keep it in App state only

### ✅ Do
- Return new arrays/objects from state updates
- Use stable, unique ids: `key={todo.id}`
- Keep presentational components stateless; let App manage state
- Use `useCallback` to memoize handlers if performance becomes an issue

---

## Final Notes

- **Start small:** this project is intentionally minimal so you can learn one concept at a time
- **Read the code:** start with TodoItem.jsx to understand UI patterns, then App.jsx to study state management
- **Experiment:** use Vite's hot reload to try CSS changes, handler logic, and new features instantly
- **Extend confidently:** the architecture is flexible — add localStorage, filters, or animations without breaking the core flow

---

## Tools & Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vite.dev)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [PropTypes Docs](https://github.com/facebook/prop-types)
- [MDN: Immutability](https://developer.mozilla.org/en-US/docs/Glossary/Immutable)

---

## License

MIT (or choose your preferred license)
