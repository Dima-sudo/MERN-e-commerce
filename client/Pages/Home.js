import React, { Component } from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import '../scss/Pages/Home.scss';

import DrawerForm from '../Components/DrawerForm';


class Home extends Component {
    render() {
        return (

            <Layout>
                <Content className="home-content__wrapper container">Content
                
                <DrawerForm />
                

                

                </Content>
                <Footer>Footer</Footer>
            </Layout>
            
        )
    }
}

export default Home;
