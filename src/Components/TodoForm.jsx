import React, { Component } from "react";
import './TodoForm.css';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.text !== "") {
      this.props.onSubmit({
        id: Date.now(),
        text: this.state.text,
        complete: false,
      });
      this.setState({
        text: "",
        visible:false
      });
    } else {
      this.setState({
        visible:false
      })
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  render() {
    return (
      <div className="todo-wrapper">
        <Button type="primary" className="click-button" onClick={this.showModal}>Click</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                onKeyDown={this.handleKeyDown}
                name="text"
                className="input-field"
                value={this.state.text}
                onChange={this.handleChange}
                id="text"
                placeholder="Add a task"
              />
            </div>
          </form>
        </Modal>
      </div>

    );
  }
}
export default TodoForm;