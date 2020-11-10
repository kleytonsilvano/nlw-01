import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return (
        //Utiliza exact porque se não o /create-point vai chamar o / sempre
        <BrowserRouter>
            <Route component={Home} path="/" exact/> 
            <Route component={CreatePoint} path="/create-point"/>
        </BrowserRouter>
    );
}

export default Routes;