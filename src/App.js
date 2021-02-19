import React from 'react';
import Auth from './components/Auth';
import Messanger from './components/Messanger';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Route exact path='/auth' render={ () => <Auth /> }/>
            <Route exact path='/messanger' render={ () => 
                <Messanger /> }/>
        </BrowserRouter>
    );
}

export default App;
