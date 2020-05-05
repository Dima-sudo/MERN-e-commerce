import React, { Component } from "react";

import {
  Form,
  Input,
  Button,
  Select,
  Layout,
  Card,
  Space,
  Upload,
  message,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

const { Content } = Layout;
import LaptopForm from '../Components/LaptopForm';

import { connect } from "react-redux";
import { createLaptop } from "../Redux/Actions/ProductActions";

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

  renderUploadButton = () => {
    if (this.state.files.length > 3) {
      return (
        <Button disabled>
          <UploadOutlined /> Upload
        </Button>
      );
    }
    return (
      <Button>
        <UploadOutlined /> Upload
      </Button>
    );
  };

  // Disables the submit button and shows a warning message when there's more than 3 items uploaded
  renderSubmitButton = () => {
    if (this.state.files.length > 3) {
      return (
        <Button type="primary" disabled htmlType="submit">
          Next
        </Button>
      );
    }
    return (
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    );
  };

  handleFile = (e) => {
    this.setState({ files: e.fileList });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = (e) => {
    if (typeof e[0] === "undefined") return;

    const key = e[0].name[0];
    const value = e[0].value;

    this.setState({
      [key]: value,
    });
  };

  submitLaptop = () => {
    const form = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      cpu: this.state.cpu,
      graphics: this.state.graphics,
      screen: this.state.screen,
      files: this.state.files,
    };

    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    //   for(var pair of formData.entries()) {
    //     console.log(pair[0]+ ', '+ pair[1]);
    //  }

    console.log("Laptop submitted");
    this.props.createLaptop(formData);

    this.setState({ formSubmitted: true });
  };

  renderForm = () => {
    if (this.state.formSubmitted === true) {
      return <Redirect to="/" />;
    } else if (this.state.category === null) {
      return (
        <Card className="my-5" title="Create Product">
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
      return <div>Television form</div>;
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

export default connect(null, { createLaptop })(CreateProduct);
