import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Navbar from '../Components/Navbar';

import ChangePassword from '../Pages/ChangePassword';
import SignUp from '../Pages/SignUp';

import CommentForm from '../Components/CommentForm';
import OtherForm from '../Components/OtherForm';
import HeadphonesForm from '../Components/HeadphonesForm';
import PhoneForm from '../Components/PhoneForm';
import TelevisionForm from '../Components/TelevisionForm';
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
import AppFooter from '../Components/AppFooter';

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
                        
                        <Sider className="app-page__sider"><SideMenu /></Sider>

                        {/* Overflow hidden to prevent double scroll bar because of nested layouts */}
                        <Layout style={{overflow: 'hidden'}}>

                        <Header className="app-page__header">
                            <Navbar />
                        </Header>

                            {/* Every component render should be wrapped in an antd Content component for a proper display of the page */}
                                <Switch>
                                        <Route exact path="/products/others/:itemId/update" component={OtherForm} /> 
                                        <Route exact path="/products/others" component={() => <Products type="others" />} /> 
                                        <Route exact path="/products/headphones/:itemId/update" component={HeadphonesForm} /> 
                                        <Route exact path="/products/headphones" component={() => <Products type="headphones" />} />
                                        <Route exact path="/products/laptops/:itemId/update" component={LaptopForm} /> 
                                        <Route exact path="/products/laptops" component={() => <Products type="laptops" />} /> 
                                        <Route exact path="/products/televisions/:itemId/update" component={TelevisionForm} /> 
                                        <Route exact path="/products/televisions" component={() => <Products type="televisions" />} /> 
                                        <Route exact path="/products/phones/:itemId/update" component={PhoneForm} /> 
                                        <Route exact path="/products/phones" component={() => <Products type="phones" />} />
                                        <Route exact path="/products/:itemId/comments/:commentId/update" component={CommentForm} /> 
                                        <Route exact path="/products/:itemId/comments/create" component={CommentForm} />
                                        <Route exact path="/products/create" component={CreateProduct} />
                                        <Route exact path="/products/search" component={Search} /> 
                                        <Route exact path="/products/search/results" component={() => <Products type="search" />} /> 
                                        <Route exact path="/products" component={() => <Products type="products" />} /> 
                                        <Route exact path="/change-password" component={ChangePassword} /> 
                                        <Route exact path="/contact" component={Contact} /> 
                                        <Route exact path="/profile" component={Profile} />
                                        <Route exact path="/signup" component={SignUp} />
                                        <Route exact path="/login" component={Login} />
                                        <Route exact path="/products/:itemId" component={ProductPage} />
                                        <Route exact path="/about" component={About} />
                                        <Route exact path="/" component={Home} />
                                </Switch>
                                
                                
                                <AppFooter />
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

