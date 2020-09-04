import React, { Component } from 'react';
import './TodoList.css';
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import 'antd/dist/antd.css';

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
    this.setState(state => ({
      todos: [todo, ...state.todos]
    }));
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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


    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todos.filter(todo => todo.complete);
    }

    return (
      <div>
        <h2>Todo App</h2>
        <TodoForm onSubmit={this.addTodo} onClick={this.sortList} />
          <div className="task-status-wrapper">
            <a className="all-tasks-button" onClick={() => this.updateTodoToShow("all")}>Planned</a>
            <a className="active-task-button" onClick={() => this.updateTodoToShow("active")}>
              In-progress
          </a>
            <a className="complete-task-button" onClick={() => this.updateTodoToShow("complete")}>
              Done
          </a>
          </div>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              toggleComplete={() => this.toggleComplete(todo.id)}
              onDelete={() => this.handleDeleteTodo(todo.id)}
              todo={todo}
            />
          ))}
      </div>
    );
  }
}

export default TodoList;