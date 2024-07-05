import React, { useState, useEffect } from 'react';

export const Todo = () => {
    const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lastPage = currentPage * todosPerPage;
  const firstPage = lastPage - todosPerPage;
  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentTodos = filteredTodos.slice(firstPage, lastPage);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdateTodo = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editText } : todo)));
    setEditId(null);
    setEditText('');
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
      <section className="col-lg-12 connectedSortable ui-sortable">
        <div className="card" style={{ position: 'relative', left: '0px', top: '0px' }}>
          <div className="card-header ui-sortable-handle" style={{ cursor: 'move' }}>
            <h3 className="card-title">
              <i className="ion ion-clipboard mr-1"></i>
              To Do List
            </h3>
            <div className="card-tools">
              {totalPages > 1 && (
                <ul className="pagination pagination-sm">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a onClick={handlePreviousPage} href="#" className="page-link">«</a>
                  </li>
                  {pageNumbers.map(number => (
                    <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                      <a onClick={() => paginate(number)} href="#" className="page-link">{number}</a>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a onClick={handleNextPage} href="#" className="page-link">»</a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="card-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search todos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {currentTodos.length === 0 && (
              <p className="text-center">No todos found.</p>
            )}
            <ul className="todo-list ui-sortable" data-widget="todo-list">
              {currentTodos.map((todo, index) => (
                <li key={index}>
                  <span className="handle ui-sortable-handle">
                    <i className="fas fa-ellipsis-v"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </span>
                  <div className="icheck-primary d-inline ml-2">
                    <input
                      type="checkbox"
                      id={`todoCheck${todo.id}`}
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                    />
                    <label htmlFor={`todoCheck${todo.id}`}></label>
                  </div>

                  {editId === todo.id ? (
                    <>
                      <input type="text" className="form-control" value={editText} onChange={(e) => setEditText(e.target.value)} />
                      <button onClick={() => handleUpdateTodo(todo.id)} type="button" className="btn btn-primary">Update</button>
                    </>
                  ) : (
                    <>
                      <span className="text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                      <div className="tools">
                        <i className="fas fa-edit" onClick={() => handleEditTodo(todo.id, todo.text)}></i>
                        <i className="fas fa-trash" onClick={() => handleDeleteTodo(todo.id)}></i>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

            <div className="card-footer clearfix">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="form-control"
                placeholder="Add new todo"
              />
              <button onClick={handleAddTodo} type="button" className="btn btn-primary float-right">
                <i className="fas fa-plus"></i> Add item
              </button>
            </div>
        </div>
      </section>
  )
}
