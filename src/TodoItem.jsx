import React from "react";

/**
 * TodoItem Component
 * 
 * A presentational component that renders a single todo item.
 * This component is stateless and relies on parent (App) to manage the todo state.
 * 
 * @param {Object} props - Component props
 * @param {string | number} props.id - Unique identifier for the todo
 * @param {string} props.title - The text to display for the todo
 * @param {boolean} props.completed - Whether the todo is marked as complete
 * @param {Function} props.toggleTodo - Callback to toggle completion: (id, checked) => void
 * @param {Function} props.deleteTodo - Callback to delete the todo: (id) => void
 * 
 * Notes for learners:
 * - This is a "presentational" or "dumb" component — it doesn't manage its own state.
 * - All data flows in via props; all changes flow out via callbacks.
 * - Accessibility features (aria-label, title) make the UI usable for all users.
 */
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  // Compute the CSS class name based on completed status
  // When completed is true, apply both "todo-item" and "completed" classes
  // This allows CSS to style completed todos differently (e.g., strikethrough)
  const itemClass = completed ? "todo-item completed" : "todo-item";

  return (
    <li className={itemClass}>
      {/* Left section: checkbox + title */}
      <div className="todo-left">
        {/* 
          Checkbox (controlled component):
          - checked prop reflects the completed state from parent
          - onChange fires when user toggles the checkbox
          - aria-label provides an accessible name for screen readers
        */}
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
          aria-label={completed ? `Mark "${title}" as incomplete` : `Mark "${title}" as complete`}
        />
        
        {/* 
          Title text:
          - Kept simple and unstyled here; all visual styling lives in CSS
          - title attribute shows full text on hover (useful if text is truncated)
        */}
        <span className="todo-title" title={title}>
          {title}
        </span>
      </div>

      {/* Right section: action buttons */}
      <div>
        {/* 
          Delete button:
          - type="button" prevents accidental form submissions
          - aria-label describes the button's action for screen readers
          - title provides a tooltip on hover
        */}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteTodo(id)}
          aria-label={`Delete "${title}"`}
          title="Delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
}