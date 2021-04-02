import React from 'react';
import AuthContainer from './components/Authorization/AuthContainer';
import Messanger from './components/Messanger';
import {Router, Route, Switch} from 'react-router-dom';

import './App.css';

function App(props) {
    props.history.push('/auth');
    return (
        <Router history={props.history}>
            <Switch>
                <Route exact path='/auth' render={ () => <AuthContainer history={props.history}/> }/>
                <Route exact path='/messanger' render={ () => 
                    <Messanger /> }/>
            </Switch>
        </Router>
    );
}

export default App;
