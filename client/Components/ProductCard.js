import React, { Component } from "react";

import { Card, Avatar, Breadcrumb, Space } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const { Meta } = Card;

class ProductCard extends Component {
  render() {
    return (
      <div>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src={
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
            />
          }
          actions={[
            <Link to={{pathname: `/products/${this.props.self._id}`,
                       self: this.props.self 
                     }}>
              <Space size="small">
                <PlusOutlined key="plus" />
                <span>More</span>
              </Space>
            </Link>,
            <EditOutlined key="edit" />,
          ]}
          hoverable={true}
        >
          <Meta
            style={{ minHeight: 75 }}
            title={this.props.title}
            description={this.props.description}
          />
        </Card>
      </div>
    );
  }
}

export default ProductCard;
