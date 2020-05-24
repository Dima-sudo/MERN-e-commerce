import React from "react";
import { Drawer, Empty } from "antd";

import { connect } from "react-redux";

import { toggleHistory } from "../Redux/Actions/HistoryActions";

import HistoryItem from "./HistoryItem";
import { v4 as uuid } from "uuid";

import '../scss/Components/Viewed.scss';

const Viewed = (props) => {
  const renderItems = () => {
    const items = props.HistoryItems.history;

    if (items.length === 0 || items.length === "undefined") {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }


    return props.HistoryItems.history.map((item) => {

        let image = null;
        if(item.images){
            if(item.images.length > 0){
                image = item.images[0].url;
            }
        }
        console.log(image);

        // Formatting
        let unformattedDate = item.created.split("T")[0].split('-');
        let date = `${unformattedDate[2]}/${unformattedDate[1]}/${unformattedDate[0]}`;
        //

      return (
        <HistoryItem
          title={item.title}
          date={date}
          price={item.price}
          description={item.description}
          image={image}
          self={item}
          key={uuid()}
          variant='display'
        />
      );
    });
  };

  const handleClose = () => {
    props.toggleHistory();
  };

  return (
    <Drawer
      title="Previously Viewed"
      placement="right"
      closable={true}
      onClose={handleClose}
      visible={props.visible}
      className="viewed-drawer__wrapper"
    >

    {renderItems()}

    </Drawer>
  );
};

const mapStateToProps = (store) => {
  return {
    visible: store.HistoryItems.visible, HistoryItems: store.HistoryItems
  };
};

export default connect(mapStateToProps, { toggleHistory })(Viewed);
