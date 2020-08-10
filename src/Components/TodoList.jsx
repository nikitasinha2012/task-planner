import React, { Component } from 'react';
import './TodoList.css';
import TodoForm from "./TodoForm";
import Todo from "./Todo";



class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoToShow: "all",
      toggleAllComplete: true
    };
  }

  addTodo = (todo) => {
    console.log('todo', todo)
    this.setState(state => ({
      todos: [todo, ...state.todos]
    }));
  };

  sortList = () => {
    let sortedProductsAsc;
    sortedProductsAsc = this.state.todos.sort((a, b) => {
      return a.text.localeCompare(b.text)
    })

    this.setState({
      todos: sortedProductsAsc
    })
  };

  toggleComplete = (id) => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };


  handleMove = (id, direction) => {
    const UP = -1
    const DOWN = 1
    const { todos } = this.state

    const position = todos.findIndex((i) => i.id === id)
    if (position < 0) {
      throw new Error("Given item not found.")
    } else if (direction === UP && position === 0 || direction === DOWN && position === todos.length - 1) {
      return // canot move outside of array
    }
    const item = todos[position] // save item for later
    const newItems = todos.filter((i) => i.id !== id) // remove item from array
    newItems.splice(position + direction, 0, item)
    this.setState({ todos: newItems })
  }
  updateTodoToShow = (s) => {
    this.setState({
      todoToShow: s
    });
  };

  handleDeleteTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  removeAllTodosThatAreComplete = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.complete)
    }));
  };

  render() {
    let todos = [];
    console.log('sorted', this.state.todos)

    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <div>
        <h2>Tasks</h2>
        <TodoForm onSubmit={this.addTodo} onClick={this.sortList} />
        <div className="task-status-wrapper">
          <a className="all-tasks-button" onClick={() => this.updateTodoToShow("all")}>All</a>
          <a className="active-task-button" onClick={() => this.updateTodoToShow("active")}>
            Active
          </a>
          <a className="complete-task-button" onClick={() => this.updateTodoToShow("complete")}>
            Completed
          </a>
        </div>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            handleMove={() => this.handleMove(todo.id)}
            todo={todo}
          />
        ))}
      </div>
    );
  }
}

export default TodoList;