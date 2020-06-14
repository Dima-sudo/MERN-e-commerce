import React, { Component } from "react";

import {
  Form,
  Select,
  Layout,
  Card,
} from "antd";
import { Redirect } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

const { Content } = Layout;
import LaptopForm from '../Components/LaptopForm';
import TelevisionForm from '../Components/TelevisionForm';
import PhoneForm from '../Components/PhoneForm';
import HeadphonesForm from '../Components/HeadphonesForm';
import OtherForm from '../Components/OtherForm';

import { connect } from "react-redux";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Type of form to show
      category: null,
      // Redirect flag
      formSubmitted: false,
      files: [],
    };
  }

  resetForm = () => {
    this.setState({
      category: null,
    });
  };

  setFormSubmitted = () => {
    this.setState({
      formSubmitted: true,
    });
  };

  handleChange = (e) => {
    if (typeof e[0] === "undefined") return;

    const key = e[0].name[0];
    const value = e[0].value;

    this.setState({
      [key]: value,
    });
  };

  renderForm = () => {
    if (this.state.formSubmitted === true) {
      return <Redirect to="/" />;
    } else if(!this.props.isLoggedIn){
      return <Redirect to="/login" />;
    } 
    else if (this.state.category === null) {
      return (
        <Card className="my-5 slide-in" title="Create Product">
          <Form
            name="product_category"
            key="category_select"
            onFieldsChange={this.handleChange}
            className="create-form py-3"
            size="middle"
          >
            <h1 className="create-form__title">Choose a Category</h1>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a product category to create"
                allowClear
              >
                <Select.Option value="Laptop">Laptop</Select.Option>
                <Select.Option value="Television">Television</Select.Option>
                <Select.Option value="Phone">Phone</Select.Option>
                <Select.Option value="Headphones">Headphones</Select.Option>
                <Select.Option value="Others">Other</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      );
    } else if (this.state.category === "Laptop") {
      return (
        <div>
          {/* Props for controlling the main form component from within the form */}
          <LaptopForm
            setFormSubmitted={this.setFormSubmitted}
            resetForm={this.resetForm}
          />
        </div>
      );
    } else if (this.state.category === "Television") {
      return (
        <div>
          {/* Props for controlling the main form component from within the form */}
          <TelevisionForm
            setFormSubmitted={this.setFormSubmitted}
            resetForm={this.resetForm}
          />
        </div>
      )
    }
    else if (this.state.category === "Phone") {
      return (
        <div>
          {/* Props for controlling the main form component from within the form */}
          <PhoneForm
            setFormSubmitted={this.setFormSubmitted}
            resetForm={this.resetForm}
          />
        </div>
      )
    }
    else if (this.state.category === "Headphones") {
      return (
        <div>
          {/* Props for controlling the main form component from within the form */}
          <HeadphonesForm
            setFormSubmitted={this.setFormSubmitted}
            resetForm={this.resetForm}
          />
        </div>
      )
    }
    else if (this.state.category === "Others") {
      return (
        <div>
          {/* Props for controlling the main form component from within the form */}
          <OtherForm
            setFormSubmitted={this.setFormSubmitted}
            resetForm={this.resetForm}
          />
        </div>
      )
    }

  };
  

  render() {
    return (
      <Layout>
        <Content className="container">{this.renderForm()}</Content>
      </Layout>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps)(CreateProduct);
