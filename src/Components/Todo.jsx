import React from "react";
import './Todo.css';
import notCheckedLogo from '../images/not-checked.svg';
import checkedLogo from '../images/checked.svg';

function Todo(props) {
    console.log('hi',props)
    const UP = -1
    const DOWN = 1
    return (
        <div className="list-wrapper">
           <img src= {props.todo.complete ? checkedLogo : notCheckedLogo}/>
            <div style={{
                textDecoration: props.todo.complete ? "line-through" : "",marginLeft:"20px",marginBottom:"5px"
            }} onClick={props.toggleComplete}>{props.todo.text}</div>
            <div className="taskArrows">
                     <a className="up-arrow" onClick={() => props.handleMove(props.todo.id, UP)}>&#x25B2;</a>
                     <a className="down-arrow" onClick={() => props.handleMove(props.todo.id, DOWN)}>&#x25BC;</a>
                  </div>
            <button className="delete-button" onClick={props.onDelete}>x</button>
        </div>

    )
}

export default Todo;