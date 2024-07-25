import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Order from './components/Order';
import Navbar from './components/Navbar';
import './App.css';
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/order" component={Order} />
            </Switch>
        </Router>
    );
}
export default App;
