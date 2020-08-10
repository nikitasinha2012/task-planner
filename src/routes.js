import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import TodoList from './Components/TodoList';



const Routes = () => {
    return(
        <Router>
            <Switch>
            <Route path="/" component={TodoList} exact={true} />
            </Switch>
        </Router>
    );
    }
export { Routes }


