import React from "react";
import PropTypes from "prop-types";

/*
  TodoItem
  - A presentational component that renders a single todo.
  - Props:
    - id: unique identifier for the todo
    - title: text to display
    - completed: boolean indicating completion state
    - toggleTodo: callback to toggle completed state (id, checked)
    - deleteTodo: callback to remove the todo (id)
  Notes for learners:
  - The component is intentionally simple and stateless.
  - Accessibility: checkbox and buttons include clear labels/attributes.
*/
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  // compute a class name so we can style completed todos via CSS
  const itemClass = completed ? "todo-item completed" : "todo-item";

  return (
    <li className={itemClass}>
      <div className="todo-left">
        {/* Accessible checkbox: use checked + onChange and an aria-label */}
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
          aria-label={completed ? `Mark "${title}" as incomplete` : `Mark "${title}" as complete`}
        />
        {/* Title: keep it simple; styling (ellipsis, strike-through) lives in CSS */}
        <span className="todo-title" title={title}>
          {title}
        </span>
      </div>

      {/* Action buttons: type="button" prevents accidental form submissions */}
      <div>
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

// PropTypes help learners understand expected prop shapes and provide warnings in dev
TodoItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  completed: false,
};