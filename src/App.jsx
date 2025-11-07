import { useEffect, useState } from "react"
import {NewTodoForm} from "./NewTodoForm"
import {TodoList} from "./todoList"
import "./styles.css"

// Main App component for the todo list app
export default function App() {
  
  
  // Array of todo objects: { id, title, completed }
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])
  
  // Add a new todo item
  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  
  // Toggle the completed state of a todo by id
  // - maps over todos and flips the completed flag for the matching id
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  // Delete a todo by id
  // - filters out the todo with the matching id
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // Render:
  // - a controlled form for adding todos
  // - a list of todos with a checkbox (completed) and Delete button
  return(
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}