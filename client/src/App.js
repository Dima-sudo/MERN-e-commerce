import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Navbar from '../Components/Navbar';

import CommentForm from '../Components/CommentForm';
import LaptopForm from '../Components/UpdateForms/LaptopForm';
import Laptops from '../Pages/Laptops';
import CreateProduct from '../Pages/CreateProduct';
import Profile from '../Pages/Profile'
import Login from '../Pages/Login';
import ProductPage from '../Pages/ProductPage';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import About from '../Pages/About'

import AutoAlert from '../Components/AutoAlert';

import { connect } from 'react-redux';

import { Layout } from 'antd';
const { Content, Header, Footer} = Layout;

import '../scss/App.scss';


class App extends Component{

    render(){
        return( 
            <div>
                <AutoAlert />
                <BrowserRouter>
                <Layout>
                    
                    <Header className="app-page__header">
                        <Navbar />
                    </Header>

                    {/* <Content className="container"> */}
                        <Switch>
                                <Route exact path="/products/:itemId/comments/create" component={CommentForm} />
                                <Route exact path="/products/laptops/:itemId/update" component={LaptopForm} />
                                <Route exact path="/products/laptops" component={Laptops} />
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/products/create" component={CreateProduct} />
                                <Route exact path="/products/:itemId" component={ProductPage} />
                                <Route exact path="/products" component={Products} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/" component={Home} />
                        </Switch>
                    {/* </Content> */}
                        {/* <Footer>Footer Goes here</Footer> */}
                    </Layout>

                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {alertConfig: store.alertConfig}
}

export default connect(mapStateToProps)(App);

