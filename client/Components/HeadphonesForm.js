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
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

const { Content } = Layout;
const { TextArea } = Input;

import { connect } from "react-redux";
import { createProduct, updateProduct } from "../Redux/Actions/ProductActions";

import { getTags } from "../Utility/Forms";
import { isNumeric } from '../Utility/Misc';

class PhoneForm extends Component {
  constructor(props) {
    super(props);

    let self = null;

    // If in update mode, and an existing product is passed, prefill the form with passed product's information.
    if (this.props.location) {
      self = this.props.location.self;
    }
    // Else show a creation form with empty fields.
    else {
      self = {
        title: "",
        description: "",
        price: "",
        drivers: "",
        frequency: "",
        sensitivity: "",
        color: ""
      };
    }

    this.state = {
      title: self.title,
      description: self.description,
      price: self.price,
      drivers: self.drivers,
      frequency: self.frequency,
      sensitivity: self.sensitivity,
      color: self.color,
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
            <PhoneOutlined />
            Headphones
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
      this.state.drivers.length === 0 ||
      this.state.frequency.length === 0 ||
      this.state.sensitivity.length === 0 ||
      this.state.color.length === 0
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
    } else if (+this.state.price <= 0 || isNumeric(this.state.price) === false) {
      message.error("The price should be a positive integer", 4);
      return false;
    } else if (
      this.state.drivers.length < 3
    ) {
      message.error(
        "The drivers field should include the brand and model name of the card",
        6
      );
      return false;
    } else if (
      this.state.frequency.length < 5
    ) {
      message.error(
        "The frequency field should include the supported headphone's khz frequency. (i.e XXkhz-YYkhz)",
        8
      );
      return false;
    }
    else if (
        this.state.sensitivity.length < 5
      ) {
        message.error(
          "The sensitivity field should contain the driver sensitivity. (i.e XXkhz/1mw)",
          8
        );
        return false;
      }
      else if (
        this.state.color.length < 3
      ) {
        message.error(
          "The color field should be atleast 3 characters long.",
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

  submitHeadphones = () => {
    if (this.isValidated()) {
      const form = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        drivers: this.state.drivers,
        frequency: this.state.frequency,
        sensitivity: this.state.sensitivity,
        color: this.state.color
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
      if (this.props.location) {
        // Redux action creator
        const itemId = this.props.location.self._id;
        this.props.updateProduct(itemId, formData, 'headphones');

        this.setState({ hasSubmitted: true });
      }

      // Else create a new product
      else {
        // Redux action creator
        this.props.createProduct(formData, 'headphones');
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
        <Card title={this.renderBreadcrumb()} className="my-5 slide-in">
          <Form
            size="middle"
            name="create_form"
            key="headphones_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitHeadphones}
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
                name: ["drivers"],
                value: this.state.drivers,
              },
              {
                name: ["frequency"],
                value: this.state.frequency,
              },
              {
                name: ["sensitivity"],
                value: this.state.sensitivity,
              },
              {
                name: ["color"],
                value: this.state.color,
              }
            ]}
            onFinish={this.submitHeadphones}
          >
            <h1 className="create-form__title">Headphones Form</h1>

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
                  message: "Please fill out the phone's description",
                },
              ]}
            >
              {/* <Input type="text" placeholder="Description" /> */}

              <TextArea
                type="text"
                name="description"
                placeholder="How would you describe it?"
                autoSize={{ minRows: 3, maxRows: 7 }}
              />

            </Form.Item>

            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please fill out the phone's price",
                },
              ]}
            >
              <Input type="text" placeholder="Price" />
            </Form.Item>

            <Form.Item
              name="drivers"
              rules={[
                {
                  required: true,
                  message: "Please fill out the headphone's drivers",
                },
              ]}
            >
              <Input type="text" placeholder="Drivers" />
            </Form.Item>

            <Form.Item
              name="frequency"
              rules={[
                {
                  required: true,
                  message: "Please fill out the headphone's frequency",
                },
              ]}
            >
              <Input type="text" placeholder="Frequency" />
            </Form.Item>

            <Form.Item
              name="sensitivity"
              rules={[
                {
                  required: true,
                  message: "Please fill out the headphone's sensitivity",
                },
              ]}
            >
              <Input type="text" placeholder="Sensitivity" />
            </Form.Item>

            <Form.Item
              name="color"
              rules={[
                {
                  required: true,
                  message: "Please fill out the hphone's color",
                },
              ]}
            >
              <Input type="text" placeholder="Color" />
            </Form.Item>

            {/* Upload */}
            <Form.Item
              name="images"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={this.handleFile}
              extra="Pick images to upload"
              help="Note: Any uploaded images will replaces the existing ones of this listing, limited to 3 images."
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
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return { isLoggedIn: store.isLoggedIn };
};

export default connect(mapStateToProps, { createProduct, updateProduct })(
  PhoneForm
);
