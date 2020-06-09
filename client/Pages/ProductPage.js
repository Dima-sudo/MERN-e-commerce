import React, { Component } from "react";

import {
  Layout,
  Card,
  Table,
  Spin,
  Carousel,
  Divider,
  Comment,
  Empty,
  Button,
  message
} from "antd";

const { Content } = Layout;

import { Row, Col, notification } from "antd";

import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { CheckCircleOutlined, SmileOutlined } from "@ant-design/icons";

import axios from 'axios';

import { getProducts } from '../Redux/Actions/ProductActions';

import "../scss/Pages/ProductPage.scss";

import { v4 as uuidv } from "uuid";

import alertConfig from '../Redux/Actions/AlertActions';

import { AddHistoryItem } from '../Redux/Actions/HistoryActions';

// Stripe
import StripeCheckout from 'react-stripe-checkout';

const KEY = process.env.STRIPE_PUBLISHABLE_KEY;

let tableData = [];

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyValuePairs: [],
      hasPurchased: false,
      hasUpdated: false,
    };
  }

  shouldComponentUpdate(nextState, nextProps){
    if(this.props.Products !== nextProps.Products) return true;
  }

  deleteComment = (commentId) => {
    return async () => {
      const productId = this.props.history.location.self._id;
    
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.isLoggedIn.token}`
        }
      }

      const res = await axios.delete(`${process.env.SERVER_URL}/products/comments/${productId}/${commentId}/delete`, options);

      if(res.data.status === 'success'){
        message.success("The comment was removed", 4);
        this.props.getProducts();
        this.setState({
          hasUpdated: true
        })
      }
      else if(res.data.status === 'failure'){
        message.warning("Couldn't remove comment, try again in a bit", 4);
      }
    }
  }

  handleToken = async (token) => {
    console.log(token);
    const self = this.props.history.location.self

    const authToken = `Bearer ${this.props.isLoggedIn.token}`;

    const options = {
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }

    // Notification that dissapears after a few seconds
    notification.open({
      message: 'Working on it',
      description:
        'Thanks for making this purchase. We\'re working on your request and you should receive a confirmation notification in just a moment',
      icon: <SmileOutlined style={{ color: '#0070ba' }} />,
    });
    
    
    const res = await axios.post(`${process.env.SERVER_URL}/products/${self._id}/checkout`, token, options);

    if(res.data.status === 'success'){
      const alert = {
        message: "Your purchase was completed successfully",
        type: "success"
    }

    this.props.alertConfig(alert);
    this.setState({hasPurchased: true})
    }
    
    else if(res.data.status === 'failure'){
      message.warning('Whoops! there was a problem with that purchase. Try again in a bit.', 4);
    }

  }

  renderPurchaseButton = () => {
    const self = this.props.history.location.self

    if (this.props.isLoggedIn === null) {
      return;
    }

    return (
      
      <StripeCheckout stripeKey={KEY} currency="ILS" amount={self.price * 100} token={this.handleToken}>
        <Button
        style={{ backgroundColor: "#52c41a", borderColor: "transparent" }}
        type="primary"
        shape="round"
        size="middle"
      >
        <CheckCircleOutlined />
        Purchase Now
      </Button>
      </StripeCheckout>
    );
  };

  componentDidMount() {
    // Extracts all product data in a generalized way so that this page is reusable with any product type
    if (this.props.history.location.self) {
      // Obj.entries extracts all key value pairs which are then filtered
      const self = this.props.history.location.self;

      // Remove fields that the user isn't supposed to see
      tableData = Object.entries(self).filter((e) => {
        return (
          e[0] !== "tags" &&
          e[0] !== "comments" &&
          e[0] !== "__v" &&
          e[0] !== "createdBy" &&
          e[0] !== "title" &&
          e[0] !== "images"
        );
      });

      // Add to Viewed items
      this.props.AddHistoryItem(self);
    }

    this.setState({
      keyValuePairs: tableData,
    });

  }

  renderCarousel = () => {
    if (this.props.history.location.self.images) {
      const images = this.props.history.location.self.images;
      return images.map((image) => {
        return <img className="carousel-image" src={`${image.url}`} />;
      });
    }

    return <div>No images provided</div>;
  };

  renderTable = () => {
    // Will go into table props
    let data = [];

    // Assemble rows object
    this.state.keyValuePairs.map((pair) => {
      data = [
        ...data,
        {
          key: uuidv(),
          name: pair[0].charAt(0).toUpperCase() + pair[0].slice(1),
          value: pair[1],
        },
      ];
    });

    const columns = [
      {
        title: "Attributes",
        dataIndex: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "",
        dataIndex: "value",
        render: (text) => <a>{text}</a>,
      },
    ];

    if (this.state.keyValuePairs.length > 0) {
      return (
        <Table
          rowClassName="table-cell__typography"
          className="table-positioning"
          columns={columns}
          dataSource={data}
          size="middle"
          bordered
          pagination={false}
        />
      );
    }
    return (
      <Spin size="large" className="my-5 py-5 table-spinner__positioning" />
    );
  };

  renderComments = () => {
    const comments = this.props.history.location.self.comments;

    if (comments.length > 0) {

      return comments.map((comment) => {
        // Extract username from email and add formatting for comment display

        const createdBy =
          comment.createdBy.email.split("@")[0].charAt(0).toUpperCase() +
          comment.createdBy.email.split("@")[0].slice(1);

        if (this.props.isLoggedIn !== null) {
          if (this.props.isLoggedIn.email === comment.createdBy.email) {

            const productId = this.props.history.location.self._id;
            const commentId = comment._id;

            return (
              <Comment
                key={uuidv()}
                actions={[
                  <React.Fragment>
                    <Button className="mr-2" size="small" type="secondary" shape="round">
                      <Link to={{
                        pathname: `/products/${productId}/comments/${commentId}/update`,
                        self: this.props.history.location.self,
                        comment
                      }}>
                      Edit
                      </ Link>
                    </Button>
                    <Button onClick={this.deleteComment(comment._id)} size="small" danger shape="round">
                      Delete
                    </Button>
                  </React.Fragment>,
                ]}
                author={createdBy}
                content={comment.content}
              />
            );
          }
        }

        return (
          <Comment key={uuidv()} author={createdBy} content={comment.content} />
        );
      });
    }

    return <Empty description="Whoops! There's no comments yet" />;
  };

  render() {
    let self = null;
    if(this.props.history.location.self){
      self = this.props.history.location.self;
    }

    return (
      this.state.hasPurchased === true || this.state.hasUpdated === true || !self ? <Redirect to="/profile" />
      :
      <Content className="container">
        <Card
          className="my-5 py-2"
          title={this.props.history.location.self.title}
          loading={false}
          extra={this.renderPurchaseButton()}
        >
          <Row>
            <Col xs={24} md={12}>
              <Carousel autoplay>{this.renderCarousel()}</Carousel>
            </Col>
            <Col xs={24} md={12}>
              {this.renderTable()}
            </Col>
          </Row>
        </Card>

        <Divider type="horizontal" />

        <Card
          title="Comment Section"
          extra={
            this.props.isLoggedIn ?
            <Button size="medium" type="primary" shape="round">
              <Link
                to={{ pathname: `/products/${self._id}/comments/create`, self }}
              >
                New
              </Link>
            </Button>
            :
            null
          }
        >
          {this.renderComments()}
        </Card>
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn, Products: store.Products
  };
};

export default connect(mapStateToProps, { alertConfig, getProducts, AddHistoryItem })(ProductPage);
