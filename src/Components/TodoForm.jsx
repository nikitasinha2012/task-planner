import React, { Component } from "react";
import './TodoForm.css';


class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorMessage: ''
    };
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('props', this.props)
    if (this.state.text.length < 21) {
      this.props.onSubmit({
        id: Date.now(),
        text: this.state.text,
        complete: false,
      });
      this.setState({
        text: '',
        errorMessage: ''
      });
    } else {
      this.setState({
        errorMessage: 'Must be 20 characters or less'
      })
    }
  }
  handleSort = (event) => {
    this.props.onClick({
      text: this.state.text
    })
  }
  handleKeyDown = (event) => {
    console.log(event.target.value)
  }


  render() {
    const { errorMessage } = this.state;
    return (
      <div className="todo-form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              onKeyDown={this.handleKeyDown}
              name="text"
              className="input-field"
              value={this.state.text}
              onChange={this.handleChange}
              id="search"
              placeholder="Add a task"
              style={{
                borderColor:errorMessage !== ""  ? "#c22a22" : "none"
              }}
            />
            <div className="error-box">{errorMessage && <span className="errormessage">{errorMessage}</span>}</div>
          </div>
          <button className="add-button" onClick={this.handleSubmit}>Add</button>
        </form>
        <button className="sort-button" onClick={this.handleSort}>Sort</button>
      </div>

    );
  }
}
export default TodoForm;