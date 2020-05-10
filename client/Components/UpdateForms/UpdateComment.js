import React, { Component } from "react";

import { Form, Input, Button, Card, Space, Layout, message } from "antd";

const { Content } = Layout;

import { Redirect, Link } from "react-router-dom";

import "../../scss/Pages/CreateProduct.scss";

import { connect } from "react-redux";
import { getProducts } from '../../Redux/Actions/ProductActions';

import axios from "axios";

class UpdateComment extends Component {
  constructor(props) {
    super(props);
    const comment = this.props.location.comment;
    this.state = {
      content: comment.content,
      didSubmit: false,
    };
  }

  handleChange = (e) => {
    if (typeof e[0] === "undefined") return;

    const key = e[0].name[0];
    const value = e[0].value;

    this.setState({
      [key]: value,
    });
  };

  submitComment = async () => {

    const content = {
      content: this.state.content,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.isLoggedIn.token}`,
      },
    };

    console.log("Comment update submitted");

    const productId = this.props.location.self._id;
    const commentId = this.props.location.comment._id;

    const res = await axios.put(
      `${process.env.SERVER_URL}/products/comments/${productId}/${commentId}/update`,
      content,
      options
    );

    if (res.data.status === "success") {
      message.success("The comment was updated", 4);
      this.props.getProducts();
      this.setState({ didSubmit: true });
    } else if (res.data.status === "failure") {
      message.warning("There was an error trying to update the comment");
    }

  };

  render() {
    return this.state.didSubmit === true ? (
      <Redirect to="/products" />
    ) : (
      <Content className="container">
        <Card title="Create Comment" className="my-5">
          <Form
            size="middle"
            name="create_form"
            key="laptop_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitComment}
            fields={[
              {
                name: ["content"],
                value: this.state.content,
              },
            ]}
          >
            <h1 className="create-form__title">Update Comment</h1>

            <Form.Item
              name="content"
              rules={[
                { required: true, message: "Please fill out the content" },
              ]}
            >
              <Input placeholder="Content" name="content" />
            </Form.Item>

            <Form.Item className="pt-2">
              <Space size="small">
                {/* Conditional rendering */}
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
                <Button type="secondary">
                  <Link to="/products">Back</Link>
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
  return {
    isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStateToProps, { getProducts })(UpdateComment);
