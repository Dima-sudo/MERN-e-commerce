import React, { Component } from "react";

import { Card, Avatar, Breadcrumb, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import {v4 as uuid} from 'uuid';

import '../scss/Components/ProductCard.scss';

import noImage from '../Images/no-image.png';
import { getRandIndex } from '../Utility/Misc';

const { Meta } = Card;

class ProductCard extends Component {

  renderThumbnail = () => {
    if(this.props.self.images.length > 0){
      return this.props.self.images[0].url;
    }
    
    // If no images on product
    return noImage;
  }

  renderTags = () => {
    const tags = this.props.self.tags;
    const tagsArray = [];
    // This is rendered
    let i = 0;
    let tagIndex = null;

    while(i < 3){

      tagIndex = getRandIndex(tags.length-1);

      if(typeof tags[tagIndex] !== 'undefined'){
        tagsArray.push(<Tag color="blue" className="mb-2">{tags[tagIndex].toUpperCase()}</Tag>)
      }

      i++;
    }

    return tagsArray;
  }

  render() {

    return (
      <div className="mt-5 slide-in-side">
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
              className="card-image"
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
          key={uuid()}
        >
          <Meta
            style={{ minHeight: 75 }}
            title={this.props.title}
            description={[this.props.description, <div className="card-tag__section mt-3 mb-n1">{this.renderTags()}</div>]} // Wrapped in span to for flex-box
          />
        </Card>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
