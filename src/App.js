import React from 'react';
import AuthContainer from './components/Authorization/AuthContainer';
import Messanger from './components/Messanger';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Route exact path='/auth' render={ () => <AuthContainer /> }/>
            <Route exact path='/messanger' render={ () => 
                <Messanger /> }/>
        </BrowserRouter>
    );
}

export default App;
