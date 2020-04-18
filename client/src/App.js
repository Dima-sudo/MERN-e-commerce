import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Navbar from '../Components/Navbar';


import Login from '../Pages/Login';
import ProductPage from '../Pages/ProductPage';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import About from '../Pages/About'




class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            drawerOpen: false
        }
    }

    render(){
        return( 
            <div>
                <BrowserRouter>

                    <Navbar />
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/products/:itemId" component={ProductPage} />
                            <Route exact path="/products" component={Products} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/" component={Home} />
                        </Switch>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;

