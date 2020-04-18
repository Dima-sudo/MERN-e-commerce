import React, { Component } from "react";

import { Layout, Card, Table, Spin, Carousel, Divider, Comment, Typography } from "antd";
import { Row, Col } from "antd";

import "../scss/Pages/ProductPage.scss";

import { v4 as uuidv } from "uuid";

const { Content } = Layout;
const { Text } = Typography;

let tableData = [];

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyValuePairs: [],
    };
  }

  componentDidMount() {
    // Extracts all product data in a generalized way so that this page is reusable with any product type
    if (this.props.history.location.self) {
      // Obj.entries extracts all key value pairs which is then filtered
      const self = this.props.history.location.self;

      tableData = Object.entries(self).filter((e) => {
        return (
          e[0] !== "tags" &&
          e[0] !== "comments" &&
          e[0] !== "__v" &&
          e[0] !== "createdBy" &&
          e[0] !== "title"
        );
      });
    }

    this.setState({
      keyValuePairs: tableData,
    });
  }

  renderTable() {
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
  }

  renderComments() {
    const comments = this.props.history.location.self.comments;

    if (comments) {
      const actions = [<span>Delete</span>, <span>Edit</span>];

      return comments.map((comment) => {
        // Extract username from email and add formatting for comment display
        const createdBy =
          comment.createdBy.email.split("@")[0].charAt(0).toUpperCase() +
          comment.createdBy.email.split("@")[0].slice(1);

        return (
          <Card key={uuidv()}>
            <Comment
              key={uuidv()}
              actions={actions}
              author={createdBy}
              content={comment.content}
            />
          </Card>
        );
      });
    }

    return null;
  }

  render() {
    return (
      <Layout>
        <Content className="container mt-5">
          <Card
            className="card-content__positioning"
            title={this.props.history.location.self.title}
            loading={false}
          >
            <Row>
              <Col xs={24} md={12}>
                <Carousel autoplay>
                  <div>
                    <h3>1</h3>
                  </div>
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                </Carousel>
              </Col>
              <Col xs={24} md={12}>
                {this.renderTable()}
              </Col>
            </Row>
          </Card>

          <Divider type="horizontal" />

          <Card>
            <h2><Text strong>Comment Section</Text></h2>
            {this.renderComments()}
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default ProductPage;
