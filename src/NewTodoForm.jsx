import { useState } from "react"
export function NewTodoForm(props) {
    props.onSubmit
    // Controlled input state for the new todo text
    const [newItem, setNewItem] = useState("")
    // Handle form submission to add a new todo
  // - prevents default form submit behavior
  // - trims and rejects empty titles
  // - appends a new todo with a unique id and completed=false
  // - clears the input field after adding
  function handleSubmit(e) {
    e.preventDefault()
    const title = newItem.trim()
    if (!title) return

    // Call the addTodo function passed via props
    props.onSubmit(newItem)

    setNewItem("")
  }

    return (
    <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        type="text"
        id="item"
        />
    </div>
    <button className="btn" type="submit">Add</button>
    </form>
  )
}