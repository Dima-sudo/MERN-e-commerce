import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Navbar from '../Components/Navbar';

import SignUp from '../Pages/SignUp';
import CommentForm from '../Components/CommentForm';

import LaptopForm from '../Components/LaptopForm';

import SideMenu from '../Components/SideMenu';
import Contact from '../Pages/Contact';
import Search from '../Pages/Search';
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
const { Header, Sider } = Layout;

import '../scss/App.scss';


class App extends Component{

    render(){
        return( 
            <>
                <AutoAlert />
                <BrowserRouter>
                
                
                
                
                
                    

                    <Layout>
                    <Header className="app-page__header">
                        <Navbar />
                    </Header>
                    

                    <Layout>

                    <Sider className="app-page__sider"><SideMenu /></Sider>

                    {/* Every component render should be wrapped in an antd Content component for a proper display of the page */}
                        <Switch>
                                <Route exact path="/contact" component={Contact} /> 
                                <Route exact path="/products/search" component={Search} /> 
                                <Route exact path="/products/search/results" component={() => <Products type="search" />} /> 
                                <Route exact path="/products" component={() => <Products type="products" />} /> 
                                <Route exact path="/products/laptops" component={() => <Products type="laptops" />} /> 
                                <Route exact path="/products/:itemId/comments/:commentId/update" component={CommentForm} /> 
                                <Route exact path="/products/:itemId/comments/create" component={CommentForm} /> 
                                <Route exact path="/products/laptops/:itemId/update" component={LaptopForm} /> 
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/signup" component={SignUp} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/products/create" component={CreateProduct} />
                                <Route exact path="/products/:itemId" component={ProductPage} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/" component={Home} />
                        </Switch>
                    </Layout>
                    </Layout>
                </BrowserRouter>
            </>
        )
    }
}

const mapStateToProps = (store) => {
    return {alertConfig: store.alertConfig}
}

export default connect(mapStateToProps)(App);

