import React, { Component } from "react";

import {
  Form,
  Input,
  Button,
  Layout,
  Card,
  Space,
  Upload,
  message,
  Breadcrumb,
} from "antd";
import {
  UploadOutlined,
  LaptopOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

const { Content } = Layout;

import { connect } from "react-redux";
import { createLaptop, updateLaptop } from "../Redux/Actions/ProductActions";

import { getTags } from "../Utility/Forms";

class LaptopForm extends Component {
  constructor(props) {
    super(props);

    let self = null;

    // If in update mode, and an existing product is passed, prefill the form with passed product's information.
    if (this.props.location.self) {
      self = this.props.location.self;
    }
    // Else show a creation form with empty fields.
    else {
      self = {
        title: "",
        description: "",
        price: "",
        cpu: "",
        graphics: "",
        screen: "",
      };
    }

    this.state = {
      title: self.title,
      description: self.description,
      price: self.price,
      cpu: self.cpu,
      graphics: self.graphics,
      screen: self.screen,
      files: [],
      hasSubmitted: false,
    };
  }

  renderBreadcrumb = () => {
    let name = null;

    if (this.props.isLoggedIn) {
      name =
        this.props.isLoggedIn.email.split("@")[0][0].toUpperCase() +
        this.props.isLoggedIn.email.split("@")[0].slice(1);
    }

    return (
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UserOutlined />
          <span>{name}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <Space>
            <LaptopOutlined />
            Laptops
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  // Validate the form. Similar validation also exists on the serverside
  isValidated = () => {
    if (
      this.state.title.length === 0 ||
      this.state.description.length === 0 ||
      this.state.price.length === 0 ||
      this.state.cpu.length === 0 ||
      this.state.graphics.length === 0 ||
      this.state.screen.length === 0
    ) {
      message.error("Fields cannot be empty", 4);
      return false;
    } else if (this.state.title.length < 6 || !this.state.title.includes(" ")) {
      message.error(
        "Title has to be atleast 5 characters long and include the brand name and model",
        6
      );
      return false;
    } else if (
      this.state.description.length < 6 ||
      !this.state.description.includes(" ")
    ) {
      message.error(
        "The description should be atleast 5 characters long and include a short description of the product",
        8
      );
      return false;
    } else if (+this.state.price <= 0 || typeof this.state.price !== "number") {
      message.error("The price should be a positive integer", 4);
      return false;
    } else if (this.state.cpu.length < 6 || !this.state.cpu.includes(" ")) {
      message.error(
        "The CPU field should include the brand and model name of the processor",
        6
      );
      return false;
    } else if (
      this.state.graphics.length < 6 ||
      !this.state.graphics.includes(" ")
    ) {
      message.error(
        "The graphics field should include the brand and model name of the card",
        6
      );
      return false;
    } else if (
      this.state.screen.length < 6 ||
      !this.state.screen.includes(" ") ||
      !this.state.screen.includes(":")
    ) {
      message.error(
        "The screen field should include the brand and model name, in addition to a resolution in the for mat of XXXX:YYYY i.e 1920:1080",
        8
      );
      return false;
    }

    return true;
  };

  renderUploadButton = () => {
    if (this.state.files.length > 2) {
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
    if (this.isValidated()) {
      const form = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        cpu: this.state.cpu,
        graphics: this.state.graphics,
        screen: this.state.screen,
      };

      form.tags = getTags(form);

      const formData = new FormData();

      // Build formData
      for (let key in form) {
        formData.append(key, form[key]);
      }

      // Files can't be received on the server as an array, have to append manually
      this.state.files.forEach((file, i) => {
        formData.append(`image-${i}`, file.originFileObj);
      });

      // If in update mode
      if (this.props.location.self) {
        // Redux action creator
        const itemId = this.props.location.self._id;
        this.props.updateLaptop(itemId, formData);

        this.setState({ hasSubmitted: true });
      }
      // Else create a new product
      else {
        // Redux action creator
        this.props.createLaptop(formData);
        // Passed from form CreateProduct component that manages all forms
        this.props.setFormSubmitted();
      }
    }
  };

  render() {
    return this.state.hasSubmitted === true ? (
      <Redirect to="/profile" />
    ) : (
      <Content className="container">
        <Card title={this.renderBreadcrumb()} className="my-5">
          <Form
            size="middle"
            name="create_form"
            key="laptop_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitLaptop}
            fields={[
              {
                name: ["title"],
                value: this.state.title,
              },
              {
                name: ["description"],
                value: this.state.description,
              },
              {
                name: ["price"],
                value: this.state.price,
              },
              {
                name: ["cpu"],
                value: this.state.cpu,
              },
              {
                name: ["graphics"],
                value: this.state.graphics,
              },
              {
                name: ["screen"],
                value: this.state.screen,
              },
            ]}
            onFinish={this.submitLaptop}
          >
            <h1 className="create-form__title">Laptop Form</h1>

            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please fill out the title" }]}
            >
              <Input placeholder="Title" name="title" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please fill out the laptop's description",
                },
              ]}
            >
              <Input type="text" placeholder="Description" />
            </Form.Item>

            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please fill out the laptop's price",
                },
              ]}
            >
              <Input type="text" placeholder="Price" />
            </Form.Item>

            <Form.Item
              name="cpu"
              rules={[
                {
                  required: true,
                  message: "Please fill out the laptop's processor",
                },
              ]}
            >
              <Input type="text" placeholder="CPU" />
            </Form.Item>

            <Form.Item
              name="graphics"
              rules={[
                {
                  required: true,
                  message: "Please fill out the laptop's graphics",
                },
              ]}
            >
              <Input type="text" placeholder="Graphics" />
            </Form.Item>

            <Form.Item
              name="screen"
              rules={[
                {
                  required: true,
                  message: "Please fill out the laptop's screen",
                },
              ]}
            >
              <Input type="text" placeholder="Screen" />
            </Form.Item>

            {/* Upload */}
            <Form.Item
              name="images"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={this.handleFile}
              extra="Pick an image to upload"
            >
              {/* beforeUpload returns false to prevent default behaviour */}
              <Upload
                type="file"
                name="images"
                listType="picture"
                beforeUpload={() => false}
                showUploadList={true}
              >
                {this.renderUploadButton()}
              </Upload>
            </Form.Item>
            {/*  */}

            <Form.Item className="pt-2">
              <Space size="small">
                {/* Conditional rendering */}
                {this.renderSubmitButton()}
                <Button type="secondary" onClick={this.props.resetForm}>
                  <Link to="/profile">Back</Link>
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return { isLoggedIn: store.isLoggedIn };
};

export default connect(mapStateToProps, { createLaptop, updateLaptop })(
  LaptopForm
);
