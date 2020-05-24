import React, { Component } from "react";

import { Card, Avatar, Breadcrumb, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import {v4 as uuid} from 'uuid';

import '../scss/Components/ProductCard.scss'

import noImage from '../Images/no-image.png'

const { Meta } = Card;

class ProductCard extends Component {

  renderThumbnail = () => {
    if(this.props.self.images.length > 0){
      return this.props.self.images[0].url;
    }
    
    // If no images on product
    return noImage;
  }

  render() {
    return (
      <div className="mt-5">
        <Link to={{pathname: `/products/${this.props.self._id}`,
                       self: this.props.self 
                     }}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="thumbnail_image"
              src={
              this.renderThumbnail()
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
            </Link>
          ]}
          hoverable={true}
        >
          <Meta
            style={{ minHeight: 75 }}
            title={this.props.title}
            description={this.props.description}
          />
        </Card>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
