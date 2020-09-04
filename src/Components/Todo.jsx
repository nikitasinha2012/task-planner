import React from "react";
import './Todo.css';


function Todo(props) {
    return (
        <div className="list-wrapper">
           
            <div style={{
                textDecoration: props.todo.complete ? "line-through" : "",marginLeft:"20px",marginBottom:"5px"
            }} onClick={props.toggleComplete}>{props.todo.text}</div>
            <button className="delete-button" onClick={props.onDelete}>x</button>
        </div>

    )
}

export default Todo;