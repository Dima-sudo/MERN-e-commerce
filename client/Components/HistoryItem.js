import React, { Component } from "react";

import { Button, Empty } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { connect } from 'react-redux';
import { deleteLaptop } from '../Redux/Actions/ProductActions';

import { Link, Redirect } from 'react-router-dom';

import "../scss/Components/HistoryItem.scss";

class HistoryItem extends Component {

  handleEdit = () => {
    const itemId = this.props.self._id;

    switch(this.props.self.itemtype){
      case 'Laptop':
        return {
          pathname: `/products/laptops/${itemId}/update`,
          self: this.props.self 
        }

      default:
        console.log("HistoryItem: HandleEdit: Default case shouldn't be reachable");
        break;
    }
    
    
    // if(this.props.self.itemtype === 'Laptop'){
    //   console.log("this.props.self is")
    //   console.log(this.props.self)
    //   // This object is fed into the Link on render
    //   return {
    //     pathname: `/products/laptops/${itemId}/update`,
    //     self: this.props.self 
    //   }
    // }

    // // Shouldn't be reachable
    // console.log("HistoryItem: HandleEdit: No cases matched");
  }

  handleDelete = () => {
    const itemId = this.props.self._id;

    switch(this.props.self.itemtype){
      case 'Laptop':
        this.props.deleteLaptop(itemId);
        break;

      default:
        console.log("HistoryItem: HandleDelete: Default case shouldn't be reachable");
        break;
    }

  }

  renderImage = () => {
    if (this.props.image) {
      return <img id="photo" src={this.props.image} />;
    }
    return (
      <Empty description="No Image" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  };

  render() {
    return (
      <div className="history-item__wrapper">

        {/* Image */}
        <span className="history-item__image">{this.renderImage()}</span>

        {/* Data */}
        <span className="history-item__data p-2">
          <span className="history-item__meta">
            <h3 id="title">{this.props.title}</h3>
            <h3 id="date">
              <span className="history-text__light">Listed </span>
              {this.props.date}
            </h3>
            <h3 id="price">
              <span className="history-text__light">Priced at </span>
              {this.props.price} ILS
            </h3>
          </span>
          <p>{this.props.description.slice(0, 50).trim()}...</p>
        </span>

        {/* Buttons */}
        <span className="history-item__buttons px-3">
          
          <Button type="secondary">
          {/* handleEdit returns a plain object with the required path and item data */}
          <Link to={this.handleEdit}>
            <EditOutlined />
            Edit
          </Link>
          </Button>
          
          <Button danger onClick={this.handleDelete}>
            <DeleteOutlined />
            Delete
          </Button>
        </span>
      </div>
    );
  }
}

export default connect(null, { deleteLaptop })(HistoryItem);
