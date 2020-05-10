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

import { connect } from "react-redux";
import { createLaptop } from "../Redux/Actions/ProductActions";

class LaptopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      cpu: "",
      graphics: "",
      screen: "",
      files: [],
    };
  }

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
    } else if (+this.state.price <= 0) {
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

    if(this.isValidated()){

      let tags = [];

      const form = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        cpu: this.state.cpu,
        graphics: this.state.graphics,
        screen: this.state.screen,
      };

      // After the form passes validation, tags are extracted from the form fields to be used in user searches.
      Object.entries(form).forEach(e => {
        tags = [...tags, ...e[1].split(' ')];
      })

      form.tags = tags;

      console.log("form is");
      console.log(form);

      const formData = new FormData();

      // Build formData
      for (let key in form) {
        formData.append(key, form[key]);
      }

      // Files can't be received on the server as an array, have to append manually
      this.state.files.forEach((file, i) => {
        formData.append(`image-${i}`, file.originFileObj);
      });

        // Redux action creator
        this.props.createLaptop(formData);

        // Passed from form CreateProduct component that manages all forms
        this.props.setFormSubmitted();
    }
    
  };

  render() {
    return (
      <div>
        <Card title="Create Product" className="my-5">
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
                  Back
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect(null, { createLaptop })(LaptopForm);
