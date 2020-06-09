import React, { Component } from "react";

import { Button, Empty } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { deleteProduct } from "../Redux/Actions/ProductActions";

import { Link } from "react-router-dom";

import "../scss/Components/HistoryItem.scss";

class HistoryItem extends Component {
  renderButtons = () => {
    if (this.props.variant === "display") {
      return null;
    }

    return (
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
    );
  };

  handleEdit = () => {
    const itemId = this.props.self._id;

    switch (this.props.self.itemtype) {
      case "Laptop":
        return {
          pathname: `/products/laptops/${itemId}/update`,
          self: this.props.self,
        };
      case "Television":
        return {
          pathname: `/products/televisions/${itemId}/update`,
          self: this.props.self,
        };
      case "Phone":
        return {
          pathname: `/products/phones/${itemId}/update`,
          self: this.props.self,
        };
        case "Headphones":
        return {
          pathname: `/products/headphones/${itemId}/update`,
          self: this.props.self,
        };
        case "Other":
        return {
          pathname: `/products/others/${itemId}/update`,
          self: this.props.self,
        };

      default:
        console.log(
          "HistoryItem: HandleEdit: Default case shouldn't be reachable"
        );
        break;
    }
  };

  handleDelete = () => {
    const itemId = this.props.self._id;

    switch (this.props.self.itemtype) {
      case "Laptop":
        this.props.deleteProduct(itemId, "laptops");
        break;
      case "Television":
        this.props.deleteProduct(itemId, "televisions");
        break;
      case "Phone":
        this.props.deleteProduct(itemId, "phones");
        break;
      case "Headphones":
        this.props.deleteProduct(itemId, "headphones");
        break;
      case "Other":
        this.props.deleteProduct(itemId, "others");
        break;

      default:
        console.log(
          "HistoryItem: HandleDelete: Default case shouldn't be reachable"
        );
        break;
    }
  };

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
          <p>{this.props.description.slice(0, 100).trim()}...</p>
        </span>

        {/* Buttons */}
        {this.renderButtons()}
      </div>
    );
  }
}

export default connect(null, { deleteProduct })(HistoryItem);
