import React, { Component } from "react";

import { Form, Input, Button, Card, Space, Layout, message } from "antd";

const { Content } = Layout;

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

import { connect } from "react-redux";
import { CreateComment } from "../Redux/Actions/CommentActions";

import axios from "axios";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    let comment = null;

    // If updating
    if (this.props.location.self && this.props.location.comment) {
      comment = {
        content: this.props.location.comment.content,
      };
    }
    // Else create a new comment
    else {
      comment = {
        content: "",
      };
    }

    this.state = {
      content: comment.content,
      hasSubmitted: false,
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
    const itemId = this.props.location.self._id;

    console.log("Comment submitted");

    const content = {
      content: this.state.content,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.isLoggedIn.token}`,
      },
    };

    // If updating
    if (this.props.location.self && this.props.location.comment) {
      const productId = this.props.location.self._id;
      const commentId = this.props.location.comment._id;

      const res = await axios.put(
        `${process.env.SERVER_URL}/products/comments/${productId}/${commentId}/update`,
        content,
        options
      );

      if (res.data.status === "success") {
        message.success("The comment was updated", 4);
        this.setState({ hasSubmitted: true });
      } else if (res.data.status === "failure") {
        message.warning("There was an error trying to update the comment", 4);
      }
    }

    // Else if a new comment
    else {
      // Redux action creator
      this.setState({ hasSubmitted: true });
      this.props.CreateComment(content, itemId);
    }
  };

  render() {
    return this.state.hasSubmitted === true ? (
      <Redirect to="/products" />
    ) : (
      <Content className="container">
        <Card title="Create Comment" className="my-5 slide-in">
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
            <h1 className="create-form__title">New Comment</h1>

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
                  Create
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
  return { isLoggedIn: store.isLoggedIn };
};

export default connect(mapStateToProps, { CreateComment })(CommentForm);
