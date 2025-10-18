import { useState } from 'react';

const TodoList=()=> {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: nextId, text: inputValue }]);
      setNextId(nextId + 1);
      setInputValue('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };


  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f9f9f9;
        }

        .container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        h1 {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }

        .input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        input:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .btn-add {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn-add:hover {
          background-color: #45a049;
        }

        .todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          margin-bottom: 10px;
          background-color: #f5f5f5;
          border-radius: 5px;
        }

        .todo-text {
          flex: 1;
          font-size: 16px;
        }

        .btn-delete {
          padding: 6px 12px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-delete:hover {
          background-color: #da190b;
        }

        .empty-message {
          text-align: center;
          color: #999;
          padding: 20px;
          font-style: italic;
        }
      `}</style>

      <div className="container">
        <h1>TODO List</h1>
        
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a task..."
          />
          <button onClick={addTodo} className="btn-add">
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="empty-message">No tasks yet. Add one above!</div>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <span className="todo-text">{todo.text}</span>
                <button onClick={() => removeTodo(todo.id)} className="btn-delete">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TodoList